import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import organizationReducer from './organizationReducer';

export default combineReducers({
    user: authReducer,
    form: formReducer,
    organization: organizationReducer
});