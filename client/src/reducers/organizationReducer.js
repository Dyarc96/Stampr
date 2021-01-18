import { GET_USER_ORGANIZATION, GET_PROVIDER_ORGANIZATION,
    GET_ORGANIZATIONS, FETCH_ORGANIZATION, FIND_ORGANIZATION,
    LINK_USER, CREATE_ORGANIZATION, CLEAR_ORGANIZATIONS, GET_ORGANIZATION, REJECT_CANDIDATE_PROVIDER, ADD_CANDIDATE_PROVIDER, ACCEPT_CANDIDATE_PROVIDER 
} from './../actions/types';

const initialState = {
    foundOrganizations: [],
    userOrgniazations: [],
    createdOrganizations: [],
    linkedUsers: [],
    organizations: [],
    organization: {
        candidateProviders: [],
        linkedProviders: []
    },
}

function insertItem(array, action) {
    let newArray = array.slice()
    newArray.splice(action.index, 0, action.item)
    return newArray
  }

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ORGANIZATION:
            return {
                ...state,
                organization: action.payload,
            }
        case GET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload
            }
        case GET_USER_ORGANIZATION:
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    ...action.payload
                }
            }
        case GET_PROVIDER_ORGANIZATION:
            return {
                ...state,
                organizations: {
                    ...state.organizations,
                    ...action.payload
                }
            }
        case FETCH_ORGANIZATION:
            let index = state.organizations.findIndex(element => {
                return element._id === action.payload._id
            })
            if(index === -1) 
                return {
                    ...state.organizations,
                    organizations: [
                        ...state.organizations,
                        action.payload
                    ]
                }
            return state;
        case ADD_CANDIDATE_PROVIDER:
            let newCandidates = insertItem(state.organization.candidateProviders, action.payload);
            return {
                ...state,
                organization: {
                    ...state.organization,
                    candidateProviders: newCandidates
                }
            };
        case REJECT_CANDIDATE_PROVIDER:
            let filtered = state.organization.candidateProviders.filter((candidate) => {
                return candidate._id === action.payload
            });
            return {
                ...state,
                organization: {
                    ...state.organization,
                    candidateProviders: filtered
                }
            };
        case ACCEPT_CANDIDATE_PROVIDER:
            let newLinkedProviders = [...state.organization.linkedProviders, action.payload.credentialObject];
            let newCandidateProviders  = state.organization.candidateProviders.filter((candidate) => {
                return candidate._id === action.payload
            });
            return {
                ...state,
                organization: {
                    ...state.organization,
                    linkedProviders: newLinkedProviders,
                    candidateProviders: newCandidateProviders
                }
            }
        case CLEAR_ORGANIZATIONS:
            return {
                ...state,
                foundOrganizations: []
            }
        case FIND_ORGANIZATION:
            return {
                ...state,
                foundOrganizations: [
                    ...action.payload
                ]
            }
        case CREATE_ORGANIZATION:
            return {
                ...state,
                organizations: [
                    ...state.organizations,
                    action.payload.organization
                ]
            }
        case LINK_USER:
            return {
                ...state,
                linkedUsers: {
                    ...state.linkedUsers,
                    ...action.payload
                }
            }
        default:
            return state
    }
}