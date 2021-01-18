import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from 'actions';
import { FormField, FormLabel, FormInput, FormContainer, FormRadiosContainer, FormRadioContainer } from 'components/form/FormComponents';
import OrganisationForm from 'components/OrganisationForm';
import SearchBar from 'components/SearchBar';

const BecomePartner = (props) => {
	const [ nip, setNip ] = useState('');
	const [ userType, setUserType ] = useState('not chosen');
	const history = useHistory();
	const { user } = props;

	const submit = async (values) => {
		props.becomePartner({
			nip,
			id: user._id
		});
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
		history.push('/');
	};

	return (
		<>
			<h2>Wypełnił krótki formular i zostań partnerem</h2>
			<FormContainer>
				<p>Jesteś pracownikiem czy właścicielem lokalu ?</p>
				<FormRadiosContainer>
					<FormRadioContainer>
						<FormInput type="radio" name="userType" value="employee"
							onChange={() => setUserType('employee')}/>
						<FormLabel for="employee">Pracownikiem</FormLabel>
					</FormRadioContainer>
					<FormRadioContainer>
						<FormInput type="radio" name="userType" value="owner"
							onChange={() => setUserType('owner')}/>
						<FormLabel for="owner">Właścicielem</FormLabel>
					</FormRadioContainer>
				</FormRadiosContainer>
				{userType === 'owner' &&
                    <>
                    	<p>Dodatkowe wymagane informacje</p>
                    	    <FormField>
                    		    <FormLabel htmlFor="nip">PESEL</FormLabel>
                    		    <FormInput name="nip" id="nip" onChange={(event) => 
                    			    setNip(event.target.value)} type="text">
                    		    </FormInput>
                    	    </FormField>
                    	<p>Twój lokal</p>
                    	<OrganisationForm onFormSubmit={submit}/>
                    </>}
				{userType === 'employee' && 
                <>
                	<SearchBar user={user}
                		addAsProvider
                		findOrg={true}
                		message='Znajdź Organizacje'
                	/>
                </>  }
			</FormContainer>
		</>
	);
};

BecomePartner.propTypes = {
	user: Object,
	becomePartner: Function,
	createOrganization: Function,
};

export default connect(null, actions)(BecomePartner);
