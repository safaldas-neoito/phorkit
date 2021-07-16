import produce from 'immer';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useBoundsObservable, UseBoundsObservableResponse } from '../../hooks/useBoundsObservable';
import { SizeContextValue } from './SizeContext';

export type UseObserveSizeOptions = {
  decimalPlaces?: number;
  /** Determines if the observer should be actively observing */
  observe?: boolean;
  /** The propsToMeasure array should be memoized */
  propsToMeasure?: Readonly<(keyof SizeContextValue)[]>;
};

export type UseObserveSizeResponse<E extends HTMLElement = HTMLDivElement> = {
  /** The ref to put on the element that should be measured */
  ref: React.MutableRefObject<E>;
  /** A function to manually measure the size and update the state */
  update: UseBoundsObservableResponse['update'];
  value: SizeContextValue;
};

const stripUnmeasuredProps = (
  size: SizeContextValue,
  propsToMeasure: NonNullable<UseObserveSizeOptions['propsToMeasure']>,
): SizeContextValue => {
  return Object.keys(size).reduce((acc, key) => {
    if (propsToMeasure.includes(key as keyof SizeContextValue)) {
      acc[key as keyof SizeContextValue] = size[key as keyof SizeContextValue];
    }
    return acc;
  }, {} as SizeContextValue);
};

const defaultPropsToMeasure = ['width', 'height'] as (keyof SizeContextValue)[];

export function useObserveSize<E extends HTMLElement = HTMLDivElement>({
  decimalPlaces = 2,
  observe,
  propsToMeasure = defaultPropsToMeasure,
}: UseObserveSizeOptions): UseObserveSizeResponse<E> {
  const previousValue = useRef<SizeContextValue>({} as SizeContextValue);
  const [size, setSize] = useState<SizeContextValue>({});
  const ref = useRef<E>(null!);

  // if this function changes it will start a new observer
  const processBounds = useCallback(
    (bounds: ClientRect): void => {
      setSize(size => {
        const measurablePropsHaveChanged = propsToMeasure.some(prop => size[prop] !== bounds[prop]);
        return measurablePropsHaveChanged
          ? stripUnmeasuredProps(
              {
                bottom: Number(bounds.bottom.toFixed(decimalPlaces)),
                height: Number(bounds.height.toFixed(decimalPlaces)),
                left: Number(bounds.left.toFixed(decimalPlaces)),
                right: Number(bounds.right.toFixed(decimalPlaces)),
                top: Number(bounds.top.toFixed(decimalPlaces)),
                width: Number(bounds.width.toFixed(decimalPlaces)),
              },
              propsToMeasure,
            )
          : size;
      });
    },
    [decimalPlaces, propsToMeasure],
  );

  const { update } = useBoundsObservable({
    observe,
    processBounds,
    ref,
  });

  const value = produce(previousValue.current, draftState => {
    draftState.bottom = size.bottom;
    draftState.height = size.height;
    draftState.left = size.left;
    draftState.right = size.right;
    draftState.top = size.top;
    draftState.width = size.width;

    Object.keys(draftState).map(prop => {
      if (!propsToMeasure.includes(prop as keyof SizeContextValue)) {
        delete draftState[prop as keyof SizeContextValue];
      }
    });
  });
  previousValue.current = value;

  return useMemo(
    () => ({
      ref,
      update,
      value,
    }),
    [update, value],
  );
}
