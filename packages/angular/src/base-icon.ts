import { Directive, Input, OnChanges, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive()
export abstract class DgaBaseIcon implements OnChanges {
  @Input() size: number | string = 24;
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number | string = 2;
  @Input() absoluteStrokeWidth: boolean = false;
  @Input() class: string = '';

  protected abstract iconName: string;
  protected abstract iconData: any[];

  private isBrowser: boolean;

  constructor(protected el: ElementRef, protected renderer: Renderer2, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Initial render
    if (this.isBrowser) {
        // use setTimeout or defer to ensure inputs are initialized if not using ngOnChanges directly yet
        // actually ngOnChanges fires initially.
    }
  }

  ngOnChanges() {
    if (!this.isBrowser) return;
    
    const sw = this.absoluteStrokeWidth ? (Number(this.strokeWidth) * 24) / Number(this.size) : this.strokeWidth;
    
    const children = this.iconData.map(([tag, attrs]: [string, Record<string, string>]) => {
      const attrStr = Object.entries(attrs).map(([k, v]) => {
        const kebab = k.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return \`\${kebab}="\${v}"\`;
      }).join(' ');
      return \`<\${tag} \${attrStr}/>\`;
    }).join('');

    const cls = ['dga-icon', \`dga-icon-\${this.iconName}\`, this.class].filter(Boolean).join(' ');

    const svgString = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${this.size}" height="\${this.size}" viewBox="0 0 24 24" fill="none" stroke="\${this.color}" stroke-width="\${sw}" stroke-linecap="round" stroke-linejoin="round" class="\${cls}">\${children}</svg>\`;

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', svgString);
  }
}
