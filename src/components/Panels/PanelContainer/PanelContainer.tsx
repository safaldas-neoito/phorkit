import { cx } from '@emotion/css';
import React from 'react';
import { Orientation } from '../../../types';
import styles from './styles/PanelContainer.module.css';

export interface PanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use absolute positioning and top,right,bottom,left of 0 to fill the parent */
  absolute?: boolean;
  children: React.ReactNode;
  className?: string;
  /** Set the width and height to 100% */
  full?: boolean;
  /** The orientation of the panels (vertical for columns, horizontal for rows) */
  orientation: Orientation;
  /** Change the flex-direction to reverse the children */
  reverse?: boolean;
  style?: React.CSSProperties;
  /** Set the max size to 100% of the viewport width and height */
  viewport?: boolean;
}

export function PanelContainer({
  absolute = false,
  children,
  className,
  full = false,
  orientation,
  reverse = false,
  viewport = false,
  ...props
}: PanelContainerProps): React.ReactElement<PanelContainerProps, 'div'> {
  const classes = cx(
    styles.panelContainer,
    absolute && styles['panelContainer--absolute'],
    full && styles['panelContainer--full'],
    reverse && styles['panelContainer--reverse'],
    viewport && styles['panelContainer--viewport'],
    styles[`panelContainer--${orientation}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

PanelContainer.displayName = 'PanelContainer';
