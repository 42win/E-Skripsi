import { UPDATE_PROFILE, CHANGE_PASSWORD } from '../../c_actions/A_Profile'

const initialState = {
    updateProfileLoading : false,
    updateProfileResult : false,
    updateProfileError : false,  

    changePasswordLoading : false,
    changePasswordResult : false,
    changePasswordError : false,  
}

export default function (state = initialState, action) {
    switch(action.type) {
        case UPDATE_PROFILE:
            // console.log("reducer : ", action)
            return {
                ...state, //handling state jika ada state lain selain dataUser
                updateProfileLoading : action.payload.loading,
                updateProfileResult : action.payload.data,
                updateProfileError : action.payload.errorMessage
            } 

        case CHANGE_PASSWORD: 
            return {
                ...state,  
                changePasswordLoading : action.payload.loading,
                changePasswordResult : action.payload.data,
                changePasswordError : action.payload.errorMessage
            } 
 
        default:
            return state
    }
}