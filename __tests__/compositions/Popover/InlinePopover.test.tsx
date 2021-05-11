import { render } from '@testing-library/react';
import React from 'react';
import { InlinePopover, TimesIcon } from 'lib';

describe('<InlinePopover />', () => {
  it('should render a basic popover', () => {
    const { getByText } = render(
      <InlinePopover focusable height={80} permanent toggler={<TimesIcon scale="xxxlarge" />} width={300}>
        <div>Hello world</div>
      </InlinePopover>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a basic popover and forward the position', () => {
    const { getByText } = render(
      <InlinePopover
        focusable
        height={80}
        permanent
        position="bottom-right"
        renderChildren={({ position }) => (
          <React.Fragment>
            <div>Hello world</div>
            <div>{position}</div>
          </React.Fragment>
        )}
        toggler={<TimesIcon scale="xxxlarge" />}
        width={300}
        withChildrenProps
      />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('bottom-right')).toBeTruthy();
  });
});
