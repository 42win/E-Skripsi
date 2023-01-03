import { REGISTER_USER, LOGIN_USER } from '../../c_actions/A_Auth'

const initialState = {
    registerLoading : false,
    registerResult : false,
    registerError : false, 
    
    loginLoading : false,
    loginResult : false,
    loginError : false, 
}

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_USER:
            // console.log("reducer : ", action)
            return {
                ...state, //handling state jika ada state lain selain dataUser
                registerLoading : action.payload.loading,
                registerResult : action.payload.data,
                registerError : action.payload.errorMessage
            } 

        case LOGIN_USER:
            // console.log("reducer : ", action)
            return {
                ...state, //handling state jika ada state lain selain dataUser
                loginLoading : action.payload.loading,
                loginResult : action.payload.data,
                loginError : action.payload.errorMessage
            } 
 
        default:
            return state
    }
}