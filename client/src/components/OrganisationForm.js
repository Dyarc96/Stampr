import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

import { Button } from 'components/ui-components/Button';
import FormField from 'components/form/FormField';
import { ControlsContainer } from 'components/ui-components/Misc';

const zipMask = createTextMask({
    pattern: '99-999',
});

// Validators
const number = value => value && isNaN(Number(value)) ? 'Proszę podaj liczbę!' : undefined;
const required = value => value ? undefined : 'To pole jest wymagane!';
const maxLength = max => value =>
    value && value.length > max ? `Zbyt dua ilość znaków!` : undefined;
const minLength = min => value =>
    value && value.length < min ? `Zbyt mała ilość znaków!` : undefined;
const minValue = min => value =>
    value && value < min ? `Zbyt niska wartość!` : undefined
const maxValue = max => value =>
    value && value > max ? `Zbyt wysoka wartość!` : undefined
const minValue4 = minValue(4);
const maxValue10 = maxValue(10)
const minLength4 = minLength(4);
const maxLength16 = maxLength(16);

const FIELDS = [
    {
        name: 'facilityName',
        label: 'Nazwa Lokalu',
        type: 'text',
        validate: [required]
    },
    {
        name: 'address',
        label: 'Ulica',
        type: 'text',
        validate: [ minLength4, required, maxLength16 ]
    },
    {
        name: 'city',
        label: 'Miasto',
        type: 'text',
        validate: [required]
    },
    {
        name: 'zip',
        label: 'Kod Pocztowy',
        type: 'text',
        validate: [required]
    },
    {
        name: 'stamps',
        label: 'Wymagane pieczątki',
        type: 'number',
        validate: [required, number, maxValue10, minValue4]
    },
    {
        name: 'type',
        label: 'Typ',
        type: 'select',
        validate: [required]
    }
]

let OrganisationForm = (props) => {

    const { handleSubmit, initialize, organization } = props;
    const history = useHistory();
    
    useEffect(() => {
        if(organization) {
            initialize({
                facilityName: organization.name,
                address: organization.address[0].address1,
                city: organization.address[0].city,
                zip: organization.address[0].zip,
                stamps: organization.numOfStamps,
                typ: organization.type
            });
        }
    }, [initialize, organization]);

    const renderFields = () => {
        return FIELDS.map((element, index) => 
        element.name === 'zip' ?
            <Field name={element.name}
                label={element.label}
                component={FormField}
                key={index}
                validate={element.validate}
                type={element.type}
                {...zipMask}
                /> :
            <Field name={element.name}
                label={element.label}
                component={FormField}
                key={index}
                validate={element.validate}
                type={element.type}
            />
            )
    }

    const cancel = () => {
        history.push('/');
    }
    
    return (
        <>
            <form> 
            {renderFields()}
                <ControlsContainer>
                    <Button danger onClick={cancel}>
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmit(props.onFormSubmit)}
                        width="120px">
                        Dodaj Lokal
                    </Button>
                </ControlsContainer>
            </form>
        </>
    )
}

OrganisationForm = reduxForm({
    form: 'organisationForm'
})(OrganisationForm);

export default OrganisationForm;