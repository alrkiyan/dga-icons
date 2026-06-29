import { createElement, forwardRef } from 'react';
import { Svg, Path, Circle, Rect, Line, Polyline, Polygon, Ellipse, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import type { IconNode } from '@dga-icons/core';

export interface IconProps extends SvgProps {
  size?: number | string;
  color?: string;
  absoluteStrokeWidth?: boolean;
}

const tagMap: Record<string, any> = {
  svg: Svg,
  path: Path,
  circle: Circle,
  rect: Rect,
  line: Line,
  polyline: Polyline,
  polygon: Polygon,
  ellipse: Ellipse,
  g: G,
};

export const createReactNativeIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<any, IconProps>(
    (
      {
        size = 24,
        color = 'currentColor',
        strokeWidth = 2,
        absoluteStrokeWidth = false,
        ...restProps
      },
      ref
    ) => {
      const computedStrokeWidth = absoluteStrokeWidth
        ? (Number(strokeWidth) * 24) / Number(size)
        : strokeWidth;

      return createElement(
        Svg,
        {
          ref,
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: color,
          strokeWidth: computedStrokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          ...restProps,
        },
        ...iconNode.map(([tag, attrs], i) => {
          const TagComponent = tagMap[tag] || Path;
          
          // Map kebab-case to camelCase for react-native-svg
          const mappedAttrs: Record<string, any> = { key: `dga-${i}` };
          Object.entries(attrs).forEach(([k, v]) => {
            const camelKey = k.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            mappedAttrs[camelKey] = v;
          });

          // Override local stroke/fill if specified in SVG definition to respect the color prop
          if (mappedAttrs.stroke && mappedAttrs.stroke !== 'none') {
            mappedAttrs.stroke = color;
          }
          if (mappedAttrs.fill && mappedAttrs.fill === 'currentColor') {
            mappedAttrs.fill = color;
          }
          if (mappedAttrs.strokeWidth) {
            mappedAttrs.strokeWidth = computedStrokeWidth;
          }

          return createElement(TagComponent, mappedAttrs);
        })
      );
    }
  );

  Component.displayName = iconName;

  return Component;
};
