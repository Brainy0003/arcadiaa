import React from "react";
import PropTypes from "prop-types";

import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

const TextFieldGroup = ({ label, error, handleChange, ...props }) => {
  return (
    <FormGroup validationState={error && "error"}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} onChange={handleChange} />
      {error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export default TextFieldGroup;
