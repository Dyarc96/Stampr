import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import OrganisationForm from 'components/OrganisationForm';
import * as actions from 'actions';

const EditOrganisation = (props) => {
    const history = useHistory();

    const submit = async (values) => {
        const organization = {
            name: values.facilityName,
            address: {
                address1: values.address,
                city: values.city,
                zip: values.zip
            },
            type: values.typ,
            numOfStamps: values.stamps,
            id: props.organization._id
        }
        props.updateOrganization(organization);
        setTimeout(() => {
            history.push('/organizations');
        }, 100);
    }

    return (
        <>
            <OrganisationForm 
                organization={props.organization}
                onFormSubmit={submit}/>
        </>
    )
}

export default connect(null, actions)(EditOrganisation);