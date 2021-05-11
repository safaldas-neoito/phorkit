import React from 'react';
import { AnyPosition } from '../../types';
import { renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import { TooltipContent } from './TooltipContent';
import { getTooltipOffset } from './utils';

export interface InlineTooltipProps extends Omit<InlinePopoverProps, 'position'> {
  position?: AnyPosition;
  tooltipClassName?: string;
  triangleBorderColor?: string;
  triangleColor: string;
}

/** A tooltip is just a popover with an arrow pointing towards the toggler */
export function InlineTooltip({
  children,
  layout,
  position,
  renderChildren,
  tooltipClassName,
  triangleBorderColor,
  triangleColor,
  withChildrenProps,
  ...props
}: InlineTooltipProps): React.ReactElement {
  const offset = getTooltipOffset({ position, layout });

  return (
    <InlinePopover
      centered
      offset={offset}
      position={position}
      renderChildren={({ focusable, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position === 'stacked' || position === 'stacked-right') {
          throw new Error('Invalid tooltip position');
        }

        return (
          <TooltipContent
            className={tooltipClassName}
            layout={layout}
            offset={offset}
            position={position}
            triangleBorderColor={triangleBorderColor}
            triangleColor={triangleColor}
          >
            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusRef: focusable ? focusRef : undefined,
                  isTogglerFocused,
                  offset,
                  position,
                  visible,
                })
              : children}
          </TooltipContent>
        );
      }}
      withChildrenProps
      {...props}
    />
  );
}

InlineTooltip.displayName = 'InlineTooltip';
