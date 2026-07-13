/**
 * Packs every workspace package exactly as `pnpm publish` would, then asserts the
 * resulting tarballs are installable:
 *
 *   1. no `workspace:` / `link:` / `file:` specifier survived into the manifest
 *      (npm cannot resolve those — it fails with EUNSUPPORTEDPROTOCOL)
 *   2. every path referenced by main/module/types/exports exists in the tarball
 *
 * Both classes of breakage shipped in 0.1.0, so publishing is gated on this.
 */
import { execFileSync } from 'child_process';
import { mkdtempSync, readdirSync } from 'fs';
import { tmpdir } from 'os';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const BAD_PROTOCOLS = ['workspace:', 'link:', 'file:'];

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', ...opts });

function collectTargets(exports, out = []) {
  if (typeof exports === 'string') {
    out.push(exports);
  } else if (exports && typeof exports === 'object') {
    for (const value of Object.values(exports)) collectTargets(value, out);
  }
  return out;
}

const outDir = mkdtempSync(join(tmpdir(), 'dga-icons-packs-'));
console.log('📦  Packing every package as pnpm publish would...\n');
sh('pnpm', ['-r', 'pack', '--pack-destination', outDir], { cwd: ROOT, stdio: 'inherit' });

const errors = [];

for (const tarball of readdirSync(outDir).filter((f) => f.endsWith('.tgz'))) {
  const path = join(outDir, tarball);
  const pkg = JSON.parse(sh('tar', ['-xzOf', path, 'package/package.json']));
  const files = new Set(
    sh('tar', ['-tzf', path])
      .split('\n')
      .filter(Boolean)
      .map((f) => f.replace(/^package\//, './').replace(/\/$/, ''))
  );

  const problems = [];

  for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const [dep, range] of Object.entries(pkg[field] ?? {})) {
      if (BAD_PROTOCOLS.some((p) => String(range).startsWith(p))) {
        problems.push(`${field}.${dep} is "${range}" — npm cannot install this`);
      }
    }
  }

  const targets = [pkg.main, pkg.module, pkg.types, ...collectTargets(pkg.exports)];
  for (const target of targets.filter(Boolean)) {
    // Wildcard subpaths (./icons/*) can only be checked down to their directory.
    const probe = target.includes('*')
      ? target.slice(0, target.indexOf('*')).replace(/\/$/, '')
      : target;
    const hit = files.has(probe) || [...files].some((f) => f.startsWith(probe + '/'));
    if (!hit) problems.push(`"${target}" is declared but missing from the tarball`);
  }

  if (problems.length) {
    errors.push({ pkg: `${pkg.name}@${pkg.version}`, problems });
    console.log(`❌ ${pkg.name}@${pkg.version}`);
    for (const p of problems) console.log(`     ${p}`);
  } else {
    console.log(`✅ ${pkg.name}@${pkg.version}`);
  }
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} package(s) are not safe to publish.`);
  process.exit(1);
}

console.log('\n✅ All packages are installable — safe to publish.');
