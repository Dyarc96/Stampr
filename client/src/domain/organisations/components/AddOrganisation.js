import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import OrganisationForm from 'components/OrganisationForm';
import * as actions from 'actions';

const AddOrganisation = (props) => {
	const { user } = props;
	const history = useHistory();

	const submit = async (values) => {
		console.log(user);
		const organization = {
			name: values.facilityName,
			address: {
				address1: values.address,
				city: values.city,
				zip: values.zip
			},
			type: values.type,
			numOfStamps: values.stamps,
			userId: user._id
		};
		const userData = {
			name: user.name,
			surname: user.surname
		}
		props.createOrganization(organization, userData);
		setTimeout(() => {
			history.push('/organizations');
		}, 100);
	};

	return (
		<>
			<h2>Dodaj lokal</h2>
			<OrganisationForm onFormSubmit={submit}/>
		</>
	);
};

export default connect(null, actions)(AddOrganisation);