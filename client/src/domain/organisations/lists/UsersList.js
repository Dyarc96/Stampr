import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from 'actions';
import Modal from 'components/modal';
import { Table } from './Table';
import CssBaseline from '@material-ui/core/CssBaseline'
import { IconContainer, SearchContainer, FormInput, OptionsContainer,
	Styles } from './style';

const UsersList = (props) => {
	const [ filteredUsers, setFilteredUsers ] = useState([]);
	const [ query, setQuery ] = useState('');
	const [ modalVisibility, showModal ] = useState(false);
	const [ selectedUser, setUser ] = useState();
	const { organization } = props;
	const history = useHistory();

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
				Header: 'Liczba wizyt',
				accessor: 'visits'
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
		if(organization.linkedUsers) {
			setFilteredUsers(organization.linkedUsers.filter(user => {
				const fullName = user.firstName + ' ' + user.lastName;
				return fullName.toLowerCase().includes(query.toLowerCase());
			}));
		}
	}, [query, organization.linkedUsers]);

	const hideModal = () => {
		showModal(!modalVisibility);
	};

	const showPersonsCard = (id) => {
		setUser(id);
		showModal(!modalVisibility);
	};

	const stampUser = (userId) => {
		props.stampUser(userId, organization._id);
		history.push('/organizations/');
	};

	const awardUser = (userId) => {
		props.awardUser(userId, organization._id);
		history.push('/organizations');
	}

	return (
		<>
			<SearchContainer>
				<IconContainer>
					<FontAwesomeIcon icon={faSearch}/>
				</IconContainer>
					<FormInput placeholder="Znajdź Klienta" onInput={searchUser}/>
				<OptionsContainer>
				</OptionsContainer>
				{organization.address && 
                <Modal 
                	userId={selectedUser}
                	organization={organization}
                	modalVisibility={modalVisibility}
                	hideModal={hideModal}
                	onStamp={stampUser}
                />
				}
			</SearchContainer>
			{filteredUsers.length > 0
			? 
			<Styles>
				<CssBaseline/>
					<Table columns={columns} showModal={showPersonsCard}
						type='client'	awardUser={awardUser}
						numOfStamps={organization.numOfStamps}
						data={filteredUsers}/>
			</Styles>
			: <p>Nie znaleziono klientów</p>}
		</>
	);
};

export default connect(null, actions)(UsersList);
