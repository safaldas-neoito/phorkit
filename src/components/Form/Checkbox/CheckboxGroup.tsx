import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { Fieldset } from '../Fieldset/Fieldset';
import styles from './styles/CheckboxGroup.module.css';
import { Checkbox, CheckboxProps, CheckboxSize, CheckboxValue } from './Checkbox';

export interface CheckboxGroupItem<V extends CheckboxValue = string>
  extends Omit<CheckboxProps<V>, 'children' | 'grouped' | 'id' | 'onChange' | 'value'> {
  id: string;
  label: CheckboxProps<V>['children'];
  value: V;
}

export interface LocalCheckboxGroupProps<V extends CheckboxValue = string> extends ThemeProps {
  className?: string;
  legend: React.ReactNode;
  layout: 'stacked' | 'inline';
  onChange: (event: React.ChangeEvent<HTMLInputElement>, values: Array<V>) => void;
  checkboxes: CheckboxGroupItem<V>[];
  size?: CheckboxSize;
  values?: Array<V>;
  variant?: CheckboxProps<V>['variant'];
}

export type CheckboxGroupProps<V extends CheckboxValue = string> = MergeElementPropsWithoutRef<
  'div',
  LocalCheckboxGroupProps<V>
>;
export type CheckboxGroupRef = React.ForwardedRef<HTMLFieldSetElement>;

function CheckboxGroupBase<V extends CheckboxValue = string>(
  {
    checkboxes,
    className,
    contrast = false,
    layout = 'inline',
    legend,
    onChange,
    size,
    themeId: initThemeId,
    values,
    variant,
    ...props
  }: CheckboxGroupProps<V>,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<CheckboxGroupProps<V>, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId();

  const handleChange = useCallback<CheckboxProps<V>['onChange']>(
    (event, checked, value) => {
      const addValue = (event: React.ChangeEvent<HTMLInputElement>, value: V) =>
        !values?.includes(value) && onChange(event, [...(values || []), value]);

      const removeValue = (event: React.ChangeEvent<HTMLInputElement>, value: V) =>
        values?.includes(value) &&
        onChange(
          event,
          values.filter(item => item !== value),
        );

      checked ? addValue(event, value) : removeValue(event, value);
    },
    [onChange, values],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} ref={forwardedRef} themeId={themeId}>
      <div className={cx(styles.checkboxGroup, layout && styles[`checkboxGroup--${layout}`])} {...props}>
        {checkboxes &&
          checkboxes.map(({ id, label, value: checkboxValue, ...checkboxProps }) => (
            <Checkbox<V>
              checked={values?.includes(checkboxValue)}
              contrast={contrast}
              grouped={layout}
              id={generateComponentId(id)}
              key={id}
              onChange={handleChange}
              size={size}
              themeId={themeId}
              value={checkboxValue}
              variant={variant}
              {...checkboxProps}
            >
              {label}
            </Checkbox>
          ))}
      </div>
    </Fieldset>
  );
}

export const CheckboxGroup = React.forwardRef(CheckboxGroupBase) as typeof CheckboxGroupBase;

CheckboxGroupBase.displayName = 'CheckboxGroupBase';
CheckboxGroup.displayName = 'CheckboxGroup';
