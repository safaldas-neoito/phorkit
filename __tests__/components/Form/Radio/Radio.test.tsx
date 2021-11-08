import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Radio } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Radio />', () => {
  it('should render a labeled radio button', () => {
    const { getByLabelText } = render(<Radio onChange={() => {}}>Super fantastic label</Radio>);
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });

  it('should render a checked radio button', () => {
    const { getByRole } = render(
      <Radio checked onChange={() => {}}>
        Super fantastic label
      </Radio>,
    );
    expect(getByRole('radio')).toHaveAttribute('checked');
  });

  it('should render a disabled radio button', () => {
    const { getByTestId } = render(
      <Radio disabled data-testid="radioButton" onChange={() => {}}>
        Super fantastic label
      </Radio>,
    );
    expect(getByTestId('radioButton')).toHaveAttribute('disabled');
  });

  it('should render a radio button with a name', () => {
    const { getByRole } = render(
      <Radio name="radioTest" onChange={() => {}}>
        Super fantastic label
      </Radio>,
    );
    expect(getByRole('radio')).toHaveAttribute('name', 'radioTest');
  });

  it('should render a radio button with a value', () => {
    const { getByRole } = render(
      <Radio onChange={() => {}} value="radioTest">
        Super fantastic label
      </Radio>,
    );
    expect(getByRole('radio')).toHaveAttribute('value', 'radioTest');
  });

  it('should be clickable to checked', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Radio onChange={onChange} value="yellow">
        Super fantastic label
      </Radio>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkbox = getByRole('radio');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][2]).toBe('yellow');
  });

  it('should convert numeric values to numbers', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Radio data-type="number" onChange={onChange} value={8}>
        Super fantastic label
      </Radio>,
    );

    const checkbox = getByRole('radio');
    fireEvent.click(checkbox);

    expect(onChange.mock.calls[onChange.mock.calls.length - 1][2]).toBe(8);
  });

  it('should focus the container and not the radio button', () => {
    const { container, getByLabelText, getByRole } = render(<Radio onChange={() => {}}>Super fantastic label</Radio>);

    const checkbox = getByRole('radio');
    const label = getByLabelText('Super fantastic label');

    container.focus();
    userEvent.tab();

    expect(label).toHaveFocus();
    expect(label).toHaveAttribute('tabIndex', '-1');

    userEvent.tab();

    expect(label).not.toHaveFocus();
    expect(checkbox).not.toHaveFocus();
  });

  it('should render the contrast colors', () => {
    const { getByLabelText } = render(
      <Radio contrast onChange={() => {}}>
        Super fantastic label
      </Radio>,
    );
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    const { getByLabelText } = render(
      <Radio
        checked
        full
        persistEvents
        reverse
        unthemed
        className="radioTest"
        id="checkbox"
        inputStyle={{ color: 'red' }}
        onChange={() => {}}
        size="large"
        style={{ color: 'red' }}
        validity="danger"
        variant="primary"
      >
        Super fantastic label
      </Radio>,
    );
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });
});
