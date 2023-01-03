import { UPLOAD_SKRIPSI, UPDATE_SKRIPSI, DOWNLOAD_SKRIPSI, GET_LIST_SKRIPSI, GET_ONE_SKRIPSI, SAVE_KEYWORD_SKRIPSI, DELETE_PARAMETER_SKRIPSI } from '../../c_actions/A_Skripsi'

const initialState = {
    uploadSkripsiLoading : false,
    uploadSkripsiResult : false,
    uploadSkripsiError : false,  
    
    downloadSkripsiLoading : false,
    downloadSkripsiResult : false,
    downloadSkripsiError : false,   
    
    progress : false,

    getSkripsiLoading : false,
    getSkripsiResult : false,
    getSkripsiError : false,  
    
    keyword: false,

    getOneSkripsiLoading : false,
    getOneSkripsiResult : false,
    getOneSkripsiError : false,  

    updateSkripsiLoading : false,
    updateSkripsiResult : false,
    updateSkripsiError : false, 
}

export default function (state = initialState, action) {
    switch(action.type) {
        case UPLOAD_SKRIPSI : 
            return {
                ...state, 
                uploadSkripsiLoading : action.payload.loading,
                uploadSkripsiResult : action.payload.data,
                uploadSkripsiError : action.payload.errorMessage,

                progress : action.payload.progress, 
            }  

        case DOWNLOAD_SKRIPSI : 
            return {
                ...state, 
                downloadSkripsiLoading : action.payload.loading,
                downloadSkripsiResult : action.payload.data,
                downloadSkripsiError : action.payload.errorMessage,
            }  

        case UPDATE_SKRIPSI : 
            return {
                ...state, 
                updateSkripsiLoading : action.payload.loading,
                updateSkripsiResult : action.payload.data,
                updateSkripsiError : action.payload.errorMessage,

                progress : action.payload.progress, 
            }  

        case GET_LIST_SKRIPSI : 
            return {
                ...state, 
                getSkripsiLoading : action.payload.loading,
                getSkripsiResult : action.payload.data,
                getSkripsiError : action.payload.errorMessage,  
            }  

        case GET_ONE_SKRIPSI : 
            return {
                ...state, 
                getOneSkripsiLoading : action.payload.loading,
                getOneSkripsiResult : action.payload.data,
                getOneSkripsiError : action.payload.errorMessage,  
            }  

        case SAVE_KEYWORD_SKRIPSI:
            return {
                ...state,
                keyword : action.payload.data
            }

        case DELETE_PARAMETER_SKRIPSI:
            return {
                ...state,  
                keyword : false,
            }   

        default:
            return state
    }
}