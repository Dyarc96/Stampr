import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as actions from 'actions';
import { connect } from 'react-redux';

import { HeaderRow } from 'components/ui-components/Details';
import { Table } from './Table';
import CssBaseline from '@material-ui/core/CssBaseline'
import { IconContainer, SearchContainer, FormInput, OptionsContainer, Styles} from './style';

const CandidateEmployeeList = (props) => {
	const [ filteredUsers, setFilteredUsers ] = useState([]);
	const [ query, setQuery ] = useState('');
	const { organization } = props;

	const columns = React.useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'firstName'
			},
			{
				Header: 'Last Name',
				accessor: 'lastName'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Pieczątki',
				accessor: 'stamps'
			},
			{
				Header: 'Akcje',
				accessor: 'actions'
			},
		],
		[]
	  )
	
	const searchUser = (e) => {
		setQuery(e.target.value);
	};
    
	useEffect(() => {
		if(organization.candidateProviders) {
			setFilteredUsers(organization.candidateProviders.filter(user => {
				const fullName = user.firstName + ' ' + user.lastName;
				return fullName.toLowerCase().includes(query.toLowerCase());
			}));
		}
	}, [query, organization.candidateProviders]);

	const rejectCandidate = (userId) => {
		props.rejectCandidateProvider(organization._id, userId);
	};

	const acceptCandidate = (userCredentials) => {
		const userData = {
			_id: userCredentials._id,
			firstName: userCredentials.firstName,
			lastName: userCredentials.lastName
		};
		props.acceptCandidateProvider(organization._id, userData);
	}

	return (
			<>
				<HeaderRow>
					<p>Użytkownicy którzy dodali się do twojej listy pracowników</p>
				</HeaderRow>
				<SearchContainer>
					<IconContainer>
						<FontAwesomeIcon icon={faSearch}/>
					</IconContainer>
					<FormInput placeholder="Znajdź Kandydata" onInput={searchUser}/>
					<OptionsContainer>
					</OptionsContainer>
				</SearchContainer>
				{filteredUsers.length > 0 ?
					<Styles>
						<CssBaseline/>
						<Table columns={columns} type='candidate'
							rejectCandidate={rejectCandidate}
							acceptCandidate={acceptCandidate}
							data={filteredUsers}/>
					</Styles>
				: <p>Nie znaleziono kandydatów</p>}
		</>
	);
};

const mapStateToProps = ({organization}) => {
	return organization
}

export default connect(mapStateToProps, actions)(CandidateEmployeeList);
