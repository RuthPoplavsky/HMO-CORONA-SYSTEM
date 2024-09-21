import React from 'react';
import { Button } from 'react-bootstrap';

const GenericButton = ({ label, onClick, variant, style={margin:"1vw"}, disabled = false }) => {
    return (
        <Button style={style} variant={variant} onClick={onClick} disabled={disabled}>
            {label}
        </Button>
    );
};

export default GenericButton;
