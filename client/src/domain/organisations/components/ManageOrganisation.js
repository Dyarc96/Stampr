import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { SettingsButtonContainer,
	SettingsButton } from 'components/ui-components/Details';
import { PaddingBox } from 'components/ui-components/Misc';
import gear from 'assets/gear.png';
import EditOrganization from './EditOrganisation';
import UsersList from './../lists/UsersList';
import CandidateEmployeeList from './../lists/CandidateEmployeeList';
import WorkersList from './../lists/WorkersList';
import * as actions from 'actions';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			{children}
		  </Box>
		)}
	  </div>
	);
  }

const ManageOrganization = (props) => {
	const [value, setValue] = React.useState(0);
	const [isHead, setHead] = React.useState(false);
	const [ editMode, setEditMode ] = useState(false);

	const { match, getOrganization, organization } = props;

	useEffect(() => {
		getOrganization(match.params.id);
	}, [ getOrganization, match.params.id ]);

	useEffect(() => {
		if(organization) {
			const record = organization.linkedProviders.find(
				record => record._id === props.user._id
			);
			if(record) {
				setHead(JSON.parse(record.isHead));
			} else {
				setHead(false);
			}
		}
	}, [organization, props.user])

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};

	return (
		<>
			<PaddingBox>
				{isHead &&
				<SettingsButtonContainer>
					<SettingsButton src={gear} onClick={setEditMode}/>
				</SettingsButtonContainer>
				}
				{editMode ?
					<EditOrganization organization={organization}/>
					:
					<>
						{isHead 
							?	<Paper square>
									<Tabs
										value={value}
										indicatorColor="primary"
										onChange={handleChange}
										aria-label="disabled tabs example">
											<Tab label="Klienci" />
											<Tab label="Pracownicy" />
											<Tab label="Oczekujący pracownicy"/>
									</Tabs>
								</Paper>
							:	<Paper square>
									<Tabs
										value={value}
										indicatorColor="primary"
										onChange={handleChange}
										aria-label="disabled tabs example">
										<Tab label="Klienci" />
									</Tabs>
								</Paper>}
							<TabPanel value={value} index={0}>
								<UsersList organization={organization}/>
							</TabPanel>
						{isHead && 
							<>
								<TabPanel value={value} index={1}>
									<WorkersList organization={organization}/>
								</TabPanel>
									<TabPanel value={value} index={2}>
									<CandidateEmployeeList organization={organization}></CandidateEmployeeList>
								</TabPanel> 
							</>}
					</>}
			</PaddingBox>
		</>
	);
};

const mapStateToProps = ({organization}) => {
	return organization;
};

export default connect(mapStateToProps, actions)(ManageOrganization);