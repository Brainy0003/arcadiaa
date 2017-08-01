import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, help, validate, ...props }) => {
    return (
        <FormGroup controlId={id} validationState={validate}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} /> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

FieldGroup.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func
};

export default FieldGroup;
