import FIREBASE from '../config/FIREBASE';
import { storeData, dispatchLoading, dispatchError, dispatchSuccess } from '../utils';
import { Alert } from 'react-native';

export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"

export const updateProfile = (data) => {
    return (dispatch) => {
        // 1st condition, LOADING
        dispatchLoading(dispatch,UPDATE_PROFILE)

        const dataBaru = {
            uid: data.uid,
            nama: data.nama, 
            nim: data.nim, 
            email: data.email,
            status: 'user',
            avatar: data.updateAvatar ? data.avatarForDB : data.avatarOld ? data.avatarOld : '',
        }
  
        FIREBASE.database()
            .ref('users/'+dataBaru.uid)
            .update(dataBaru)
            .then((response) => {
                // SUKSES condition .. 3  
                // dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : [])

                // simpan ke Local Storage Async ..4
                storeData('user', dataBaru)

                // update data skripsi
                dispatch(updateSkripsi(data))
            })
            .catch((error) => {
                // ERROR condition ...5  
                dispatchError(dispatch, UPDATE_PROFILE, error.message)

                alert(error.message);
            })
    }
}

export const changePassword = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, CHANGE_PASSWORD)
 
        // cek apakah nemar email dan password lama
        FIREBASE.auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((respone) => {
                // if success then upd password
                var user = FIREBASE.auth().currentUser  
                user
                    .updatePassword(data.newPassword)
                    .then(function(){ 
                        // update success
                        dispatchSuccess(dispatch, CHANGE_PASSWORD, "Sukses ganti password") 
                    })
                    .catch(function(error){
                        // gagal update
                        dispatchError(dispatch, CHANGE_PASSWORD, error.message)
                        Alert.alert('Error',error)
                    })
            })
            .catch((error) => {
                dispatchError(dispatch, CHANGE_PASSWORD, error.message)
                Alert.alert('Error',error.message)
            })
    }
}

export const updateSkripsi = (data) => {

    return (dispatch) => {
        const dataBaru = { 
            nama: data.nama, 
            nim: data.nim,   
        }

        FIREBASE.database()
                .ref('skripsi') //nama folder 
                .orderByChild("uid")
                .equalTo(data.uid) 
                // .limitToLast(7)
                .once('value', (querySnapshot) => {
                    // hasil 
                    let cek = querySnapshot.val() //? querySnapshot.val() : []
                    // let dataItem = {...data} 
    
                    if(cek){
                        // if data ada maka update
                        FIREBASE.database()
                            .ref('skripsi/'+data.uid)
                            .update(dataBaru)
                            .then((response) => {
                                // SUKSES condition .. 3  
                                dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : [])
                            })
                            .catch((error) => {
                                // ERROR condition ...5  
                                dispatchError(dispatch, UPDATE_PROFILE, error.message)
                                alert(error.message);
                            }) 
                    }

                    dispatchSuccess(dispatch, UPDATE_PROFILE, "data berhasil diupdate")
                })
                .catch((error) => { 
                    dispatchError(dispatch, UPDATE_PROFILE, error)
                    alert(error)
                })

        
    }
}

 