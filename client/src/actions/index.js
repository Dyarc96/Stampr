import axios from 'axios';
import { FIND_ORGANIZATION,
	CREATE_ORGANIZATION,GET_USER_ORGANIZATION,
	FETCH_ORGANIZATION, UPDATE_PROFILE,
	GET_ORGANIZATIONS, GET_ORGANIZATION,
	CLEAR_ORGANIZATIONS,
	ADD_CANDIDATE_PROVIDER,
	ACCEPT_CANDIDATE_PROVIDER,
	LINK_USER, 
	REJECT_CANDIDATE_PROVIDER } from './types';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: UPDATE_PROFILE, payload: response.data });
};

export const stampUser = (userId, orgId) => async dispatch => {
	const response = await axios.post(`/api/organizations/stamp/${userId}/${orgId}`);
	dispatch({ type: UPDATE_PROFILE, payload: response.data });
};

export const awardUser = (userId, orgId) => async dispatch => {
	const response = await axios.post(`/api/users/honour/${userId}/${orgId}`);
	dispatch({ type: UPDATE_PROFILE, payload: response.data });
}

export const updateUser = (userData) => async (dispatch) => {
	const response = await axios.put(`/api/users/update-profile/${userData.id}`, {
		name: userData.name,
		surname: userData.surname
	});
	dispatch({ type: UPDATE_PROFILE, payload: response.data});
};

export const getUserOrganizations = userId => async dispatch => {
	const response = await axios.get(`/api/organizations/user/${userId}`);
	dispatch({ type: GET_USER_ORGANIZATION, payload: response.data });
};

export const getProviderOrganizations = userId => async dispatch => {
	const response = await axios.get(`/api/organizations/provider/${userId}`);
	dispatch({ type: GET_ORGANIZATIONS, payload: response.data})
};

export const becomePartner = (userData) => async (dispatch) => {
	const response = await axios.post(`/api/users/become-partner/${userData.id}`, {
		npi: userData.npi
	});
	dispatch({ type: UPDATE_PROFILE, payload: response.data });
};

export const linkUser = (organizationId, userData) => async (dispatch) => {
	const response = await axios.post(`/api/organizations/link-user/${organizationId}`, {
		userData
	});
	dispatch({ type: LINK_USER, payload: response.data });
};

export const addCandidateProvider = (organizationId, userData) => async dispatch => {
	const response = await axios.post(`/api/organizations/request-employee/${organizationId}`, {
		userData
	});
	dispatch({ type: ADD_CANDIDATE_PROVIDER, payload: response.data });
};

export const rejectCandidateProvider = (organizationId, userData) => async dispatch => {
	const response = await axios.delete(`/api/organizations/reject-employee/${organizationId}/${userData}`);
	dispatch({ type: REJECT_CANDIDATE_PROVIDER, payload: response.data });
}

export const acceptCandidateProvider = (organizationId, userData) => async dispatch => {
	const response = await axios.post(`/api/organizations/accept-employee/${organizationId}/${userData._id}`, {
		userData
	});
	console.log(organizationId, userData);
	dispatch({ type: ACCEPT_CANDIDATE_PROVIDER, payload: response.data });
}

// User ends

export const getOrganization = (orgId) => async dispatch => {
	const response = await axios.get(`/api/organizations/${orgId}`);
	dispatch({ type: GET_ORGANIZATION, payload: response.data });
};

export const clearOrganizations = () => async dispatch => {
	dispatch({ type: CLEAR_ORGANIZATIONS });
};

export const findOrganization = query => async dispatch => {
	const response = await axios.get(`/api/organizations/find/${query}`);
	dispatch({ type: FIND_ORGANIZATION, payload: response.data })
};

export const fetchOrganizationData = orgId => async dispatch => {
	const response = await axios.get(`/api/organizations/${orgId}`);
	dispatch({ type: FETCH_ORGANIZATION, payload: response.data });
};

export const createOrganization = (organization, user) => async dispatch => {
	console.log(organization, user);
	const response = await axios.post('/api/organizations/create-organization/', {
		name: organization.name,
		address: organization.address,
		type: organization.type,
		numOfStamps: organization.numOfStamps,
		// id: organization.userId,
		linkedProviders: [
			{
				id: organization.userId,
				isHead: true,
				firstName: user.name,
				lastName: user.surname
			}
		]
	});
	dispatch({ type: CREATE_ORGANIZATION, payload: response.data });
};

export const updateOrganization = data => async dispatch => {
	const response = await axios.put('/api/organizations/update-organization', {
		name: data.name,
		address: data.address,
		type: data.type,
		numOfStamps: data.numOfStamps,
		id: data.id
	});
	dispatch({ type: GET_ORGANIZATION, payload: response.data });
};

// User update routes


