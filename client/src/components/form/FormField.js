import React from 'react';
import { FormField, FormLabel, FormInput, FormSelect, FormOption, FormError } from './FormComponents';

export default ({input, type, label, meta: { error, touched }}) => {
    return (
        <FormField>
            <FormLabel>{label}</FormLabel>
            {type === 'text' 
                ? <FormInput {...input} danger={touched && error}/>
                : type === 'number'
                    ? <FormInput {...input} danger={touched && error} type="number"/>
                    :
                    <FormSelect {...input}>
                    <FormOption>Fryzjer</FormOption>
                    <FormOption>Makijazystka</FormOption>
                    <FormOption>Restauracja</FormOption>
                </FormSelect>
            }
            <FormError>
                {touched && error}
            </FormError>
        </FormField>
    )
};