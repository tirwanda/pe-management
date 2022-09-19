// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Material Dashboard 2 PRO React components
import MDInput from "components/MDInput";

function MDDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MDInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of MDDatePicker
MDDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the MDDatePicker
MDDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default MDDatePicker;
