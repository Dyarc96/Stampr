import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CssBaseline from '@material-ui/core/CssBaseline'

import { Table } from './Table';
import { IconContainer, SearchContainer, FormInput, OptionsContainer, 
	Styles} from './style';

const WorkersList = (props) => {
	const [ filteredUsers, setFilteredUsers ] = useState([]);
	const [ query, setQuery ] = useState('');
	const { organization } = props;

	useEffect(() => {
		if(organization.linkedProviders) {
			setFilteredUsers(organization.linkedProviders.filter(user => {
				const fullName = user.firstName + ' ' + user.lastName;
				if(user.isHead === "false") {
					return fullName.toLowerCase().includes(query.toLowerCase());
				} else {
					return '';
				}
			}));
		}
	}, [query, organization.linkedProviders]);
	
	useEffect(() => {
		setFilteredUsers(organization.linkedProviders);
	}, [organization.linkedProviders]);

	const searchUser = (e) => {
		setQuery(e.target.value);
	};

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
				Header: 'Akcje',
				accessor: 'actions'
			},
		],
		[]
	  )

	return (
		<>
			<SearchContainer>
				<IconContainer>
					<FontAwesomeIcon icon={faSearch}/>
				</IconContainer>
				<FormInput placeholder="Znajdź Klienta" onInput={searchUser}/>
				<OptionsContainer>
				</OptionsContainer>
			</SearchContainer>
			{filteredUsers.length > 0 
			?
				<Styles>
					<CssBaseline/>
						<Table columns={columns}
							data={filteredUsers}/>
				</Styles>
			: <p>Nie znaleziono pracowników.</p>}	
		</>
	);
};

export default WorkersList;