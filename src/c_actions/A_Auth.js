import FIREBASE from '../config/FIREBASE'; 
import {storeData, dispatchLoading, dispatchError, dispatchSuccess} from '../utils'

export const REGISTER_USER = 'REGISTER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => {
    return dispatch => {
        // 1st condition, LOADING 
        dispatchLoading(dispatch,REGISTER_USER)

        // cek unik nim
        FIREBASE.database()
            .ref('users') //nama folder 
            .orderByChild("nim")
            .equalTo(data.nim) 
            // .limitToLast(7)
            .once('value', (querySnapshot) => {
                // hasil 
                let cek = querySnapshot.val() //? querySnapshot.val() : []
                // let dataItem = {...data} 
  
                if(cek){
                    dispatchError(dispatch, REGISTER_USER, "nim telah digunakan")
                    alert("nim telah digunakan")
                }else{
                    // if nim unik
                    FIREBASE.auth()
                        .createUserWithEmailAndPassword(data.email, password)
                        .then(success => {
                            //  ambil UID, buat dataBaru (data+uid) ..1
                            const dataBaru = {
                                ...data,
                                uid: success.user.uid,
                            };

                            // simpan ke Realtime database firebase ...2
                            FIREBASE
                                .database()
                                .ref('users/' + success.user.uid)
                                .set(dataBaru);

                            // SUKSES condition .. 3  
                            dispatchSuccess(dispatch, REGISTER_USER, dataBaru)

                            // simpan ke Local Storage Async ..4
                            storeData('user', dataBaru)
            
                        })
                        .catch(error => {
                            // ERROR condition ...5 
                            dispatchError(dispatch, REGISTER_USER, error.message)

                            alert(error.message);
                        });
                } 
            })
            .catch((error) => { 
                dispatchError(dispatch, REGISTER_USER, error)
                alert(error)
            }) 
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {

        // loading 
        dispatchLoading(dispatch,LOGIN_USER)

        FIREBASE.auth().signInWithEmailAndPassword(email, password)
        .then((success) => {
            console.log(success)
            // Signed in
            FIREBASE.database().ref('/users/' + success.user.uid)
            .once('value')
            .then((resDB) => {
                
                if(resDB.val()){
                    // SUKSES condition .. 3  
                    dispatchSuccess(dispatch, LOGIN_USER, resDB.val())

                    // simpan ke Local Storage Async ..4
                    storeData('user', resDB.val())
                }else{
                    // ERROR condition ...5 
                    dispatchError(dispatch, LOGIN_USER, "Data user tidak ada") 

                    alert("Data user tidak ada");
                }
                
            });
           
        })
        .catch((error) => {
            // ERROR condition ...5 
            dispatchError(dispatch, LOGIN_USER, error.message) 

            alert(error.message);
        });
    }
}