import React from 'react';
import { Form, Button, Image } from 'react-bootstrap';

const GenericForm = ({ fields, formData, setFormData, onSubmit, onFileChange }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        // eslint-disable-next-line
        const path = name.split(/[\[\].]+/).filter(Boolean);
        if (path.length > 1) {
            setFormData(prev => {
                const newState = { ...prev };
                let current = newState;
                path.forEach((key, index) => {
                    if (index === path.length - 1) {
                        current[key] = value;
                    }
                    else {
                        if (key === "vaccinationDates") {
                            current = current[key];
                        }
                        else {
                            current[key] = { ...(current[key] || {}) };
                            current = current[key];

                        }
                    }
                });
                return newState;
            });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ width: "50%", margin: "auto" }}>
            {fields.map(field => (
                <Form.Group controlId={`form${field.name}`} key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    {field.type === 'file' ? (
                        <Form.Control
                            type={field.type}
                            name={field.name}
                            onChange={onFileChange}
                        />
                    ) : (
                        <Form.Control
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            // eslint-disable-next-line
                            value={field.path ? field.path.split(/[\[\].]+/).reduce((acc, key) => acc[key], formData) : formData[field.name]}
                            onChange={handleChange}
                        />
                    )}

                    {field.options && field.type === "select" && (
                        <Form.Control as="select" name={field.name} onChange={handleChange}>
                            {field.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Control>
                    )}
                </Form.Group>
            ))}
            {formData.photo && (
                <div style={{ marginTop: '20px' }}>
                    {formData.photo && formData.photo.type && formData.photo.type.startsWith('image/') ? (
                        <Image src={URL.createObjectURL(formData.photo)} thumbnail />
                    ) : (
                        <p>{formData.photo.name}</p>
                    )}
                </div>
            )}

            <Button variant="primary" style={{ marginTop: "1vw" }} type="submit">Submit</Button>
        </Form>
    );
};

export default GenericForm;
