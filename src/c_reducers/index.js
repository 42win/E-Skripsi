import { combineReducers } from 'redux'
import R_Auth from './r_auth'
import R_Profile from './r_profile'
import R_Skripsi from './r_skripsi'

const rootReducer = combineReducers({
    R_Auth,
    R_Profile,
    R_Skripsi,
})

export default rootReducer