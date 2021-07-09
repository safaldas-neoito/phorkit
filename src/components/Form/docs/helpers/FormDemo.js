import PropTypes from 'prop-types';
import React from 'react';
import 'context/Theme';
import { useForm } from './useForm';

const options = [
  { id: 'red', value: 'red', label: 'Red' },
  { id: 'orange', value: 'orange', label: 'Orange' },
  { id: 'yellow', value: 'yellow', label: 'Yellow' },
  { id: 'green', value: 'green', label: 'Green' },
  { id: 'blue', value: 'blue', label: 'Blue' },
  { id: 'indigo', value: 'indigo', label: 'Indigo' },
  { id: 'violet', value: 'violet', label: 'Violet' },
];

export function FormDemo({ children, contrast = false, style }) {
  const { values, setValues, handleChange, handleClear, handleSubmit } = useForm(
    () => {
      /* eslint-disable-next-line */
      console.log(values);
    },
    {
      checkbox: true,
      checkboxes: ['one'],
      danger: '',
      dropdown: '',
      dropdownContained: '',
      password: '123456',
      radio: 'one',
      radios: 'one',
      search: '',
      selectAnotherColor: 'Yellow',
      selectColor: '',
      slider: 40,
      stepper1: 13,
      stepper2: 42,
      success: '',
      textarea:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit nibh a ante accumsan, non euismod tellus maximus. Aliquam interdum faucibus metus id tincidunt. Donec nec justo vel purus feugiat mollis. Integer ut quam et eros egestas laoreet non nec nisi. Nunc at ligula tincidunt odio condimentum facilisis id in odio. Ut eget quam magna. Maecenas semper sagittis velit, non aliquet enim tempor sagittis. Cras eget quam sit amet nisl consectetur vulputate eu quis urna. Aliquam eu congue enim. Integer commodo lobortis dolor. Nunc tempor, eros nec imperdiet tempor, eros augue faucibus magna, eget vestibulum turpis sapien non elit.',
      toggle: false,
      username: 'phork',
      warning: '',
    },
  );

  return (
    <form onSubmit={handleSubmit} style={style}>
      {children(handleChange, handleClear, setValues, values, contrast, { options, persistEvents: true })}
    </form>
  );
}

FormDemo.defaultProps = {
  contrast: false,
  style: undefined,
};

FormDemo.propTypes = {
  children: PropTypes.func.isRequired,
  contrast: PropTypes.bool,
  style: PropTypes.object,
};
