/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/index';
import searchIcon from 'assets/search.png';
import { SearchContainer, SearchBarContainer,
	Img, FormInput,
	OptionsContainer, OptionContainer } from 'components/ui-components/SearchbarComponents';

const SearchBar = (props) => {
	const [query, setQuery] = useState('');
	const organizations = props.foundOrganizations;
	const { user, findOrganization, clearOrganizations, addAsProvider } = props;

	useEffect(() => {
		if (query) {
			findOrganization(query);
		} else if (query === ''){
			clearOrganizations();
		}
	}, [query, findOrganization, clearOrganizations]);

	const selectOrganization = (organization) => {
		if(!addAsProvider) {
			addUserOrganization(organization);
		} else {
			addProviderOrganization(organization);
		}
		props.clearOrganizations();
	};

	const addUserOrganization = (organization) => {
		if(user.linkedOrganizations.includes(organization._id)) {
			alert('Używasz już tej karty!');
		} else if (user.linkedProviderOrganizations.includes(organization._id)) {
			alert('Nie możesz zbierać pieczątek do swojej organizacji!');
		} else {
			props.linkUser(organization._id, {
				id: props.user._id,
				firstName: props.user.name,
				lastName: props.user.surname,
			});
		}
	};

	const addProviderOrganization = (organization) => {
		const candidateRecord = organization.candidateProviders.find(
			record => record._id === props.user._id
		);
		const linkedProvidersRecord = organization.linkedProviders.find(
			record => record._id === props.user._id
		);
		if(linkedProvidersRecord) {
			alert('Jesteś juz pracownikiem w tej organizacji!');
		} else if (candidateRecord) {
			alert('Jesteś już na liście pracowników oczekujących na zaakceptowanie!');
		} else {
			props.addCandidateProvider(organization._id, {
				id: props.user._id,
				firstName: props.user.name,
				lastName: props.user.surname
			});
		}
	};

	const lowerCaseCondition = (name) => {
		return name.toLowerCase().includes(query.toLowerCase());
	};

	return (
		<>
			<SearchContainer>
				<SearchBarContainer>
					<Img src={searchIcon}/>
					<FormInput placeholder={props.message} onInput={
						(e) => setQuery(e.target.value)}/>
				</SearchBarContainer>
				{ organizations && organizations.length > 0 &&
                <OptionsContainer>
                    { organizations.map((organization, index) => {
                		if(lowerCaseCondition(organization.name)) {
                			return (
                				<OptionContainer key={index} onClick={() => 
                					selectOrganization(organization)}>
                					{organization.name}
                				</OptionContainer>
                			);
                		} else {
                			return null;
                		}
                	})}
                </OptionsContainer>
				}
			</SearchContainer>
		</>
	);
};

const mapStateToProps = ({ organization }) => {
	return organization
}

export default connect(mapStateToProps, actions)(SearchBar);