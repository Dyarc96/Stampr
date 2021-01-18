import { UPDATE_PROFILE } from 'actions/types';

export default function(initialState = {}, action) {
    switch(action.type) {
        case UPDATE_PROFILE:
            return {
                    ...initialState,
                    user: {
                        ...initialState.user,
                        ...action.payload
                    }
            }
        default:
            return initialState
    }
}