import FIREBASE from '../config/FIREBASE';
import { storeData, dispatchLoading, dispatchError, dispatchSuccess } from '../utils';
import { Alert, PermissionsAndroid } from 'react-native'; 
import { format } from 'date-fns'
import RNFetchBlob from 'rn-fetch-blob'

export const UPLOAD_SKRIPSI = "UPLOAD_SKRIPSI" 
export const DOWNLOAD_SKRIPSI = "DOWNLOAD_SKRIPSI"
export const UPDATE_SKRIPSI = "UPDATE_SKRIPSI"  
export const GET_LIST_SKRIPSI = "GET_LIST_SKRIPSI" 
export const GET_ONE_SKRIPSI = "GET_ONE_SKRIPSI" 
export const SAVE_KEYWORD_SKRIPSI = "SAVE_KEYWORD_SKRIPSI" 
export const DELETE_PARAMETER_SKRIPSI = "DELETE_PARAMETER_SKRIPSI" 

// const getDate1 = () => { 
//     var date = new Date().getDate();
//     var month = new Date().getMonth()+1;
//     var year = new Date().getFullYear(); 
//     var hours = new Date().getHours(); 
//     var min = new Date().getMinutes();
//     var sec = new Date().getSeconds();

//     var date1 = date+'-'+month+'-'+year+ ' ' +hours+':'+min+':'+sec
 
//     return date1
// }

export const uploadSkripsi = (data) => {
    return (dispatch) => {
        // 1st condition, LOADING
        dispatchLoading(dispatch,UPLOAD_SKRIPSI)
  
        // upload document to storage
            var fileName = data.tahun+"_"+data.nim+".pdf"
            var storageRef = FIREBASE.storage().ref("skripsi/")
            var uploadTask = storageRef.child(fileName).put(data.file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // console.log(snapshot)
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Upload is ' + progress + '% done');

                    dispatch({
                        type: UPLOAD_SKRIPSI,
                        payload: {
                            loading: true,
                            progress : progress
                        }
                    })

                    // switch (snapshot.state) {
                    //     case FIREBASE.storage.TaskState.PAUSED: // or 'paused'
                    //     console.log('Upload is paused');
                    //     break;
                    //     case FIREBASE.storage.TaskState.RUNNING: // or 'running'
                    //     console.log('Upload is running');
                    //     break;
                    // }
                }, 
                (error) => {
                    // Handle unsuccessful uploads 
                    dispatchError(dispatch, UPLOAD_SKRIPSI, error.message) 
                    Alert.alert(error);
                }, 
                () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        var today = new Date();
                        var date1 = format(today,"yyyy-MM-dd hh:mm:ss")

                        const dataBaru = {
                            uid: data.uid,
                            nama: data.nama, 
                            nim: data.nim, 
                            judul: data.judul, 
                            pembimbing1: data.pembimbing1,
                            pembimbing2: data.pembimbing2,
                            keyword: data.keyword, 
                            tahun: data.tahun,
                            file: downloadURL,
                            dateUpload: date1
                        }

                        // add data to database
                        FIREBASE.database()
                            .ref('skripsi/'+dataBaru.uid) 
                            .set(dataBaru)
                            .then((response) => {
                                // SUKSES condition .. 3  
                                dispatchSuccess(dispatch, UPLOAD_SKRIPSI, response ? response : [])
                            })
                            .catch((error) => {
                                // ERROR condition ...5  
                                dispatchError(dispatch, UPLOAD_SKRIPSI, error.message)
                                Alert.alert(error.message);
                            })
                    });
                }
            );
    }
}

export const downloadSkripsi =  (file,tahun,nim) => {
    return async (dispatch) => {
        dispatchLoading(dispatch,DOWNLOAD_SKRIPSI)
         
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to downoload'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED){
                    // console.log("granted")
                    // this.downloadFile()
                    let file_URL = file 
    
                    const { config, fs} = RNFetchBlob 
             
                    const fileName = tahun+"_"+nim+'.pdf'; 
                    const destPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName;
            
             
                    let options = {
                        fileCache: true,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            title: fileName, 
                            notification: true,
                            path: destPath,
                            description:  `Download ${destPath}`,
                        }
                    }
            
                    config(options)
                        .fetch('GET', file_URL)
                        .then(res => {
                            dispatchSuccess(dispatch, DOWNLOAD_SKRIPSI, "donwload suces")
                            // console.log('res :', JSON.stringify(res))
                            // alert("file downloaded success") 
                        })
                }else{
                    Alert.alert("storage permission not granted"); 
                }
            }catch (error) {
                // console.log(error)
                dispatchError(dispatch, DOWNLOAD_SKRIPSI, error)
                Alert.alert(error);
            } 
     
    }
}

export const getListSkripsi = (keyword) => {
    // if(keyword){ 
    //     return (dispatch) => {
    //         // loading
    //         dispatchLoading(dispatch, GET_LIST_SKRIPSI)
    
    //         FIREBASE.database()
    //             .ref('skripsi') //nama folder 
    //             .orderByChild("judul") 
    //             // .equalTo(keyword)
    //             // .orderByKey()
    //             // .limitToLast(7)
    //             .once('value', (querySnapshot) => {
    //                 // hasil 
    //                 let data = querySnapshot.val() //? querySnapshot.val() : []
    //                 // let dataItem = {...data} 

                  
    //                 dispatchSuccess(dispatch, GET_LIST_SKRIPSI, arr)
                    
    //             })
    //             .catch((error) => { 
    //                 dispatchError(dispatch, GET_LIST_SKRIPSI, error)
    //                 alert(error)
    //             })
    //     }

    // }else if(getMore){
        // console.log(getMore)
        // return (dispatch) => {
        //     // loading
        //     dispatchLoading(dispatch, GET_LIST_SKRIPSI)
    
        //     // startAfter : Return items greater than or equal to the specified key or value, depending on the order-by method chosen.

        //     FIREBASE.database()
        //         .ref('skripsi') //nama folder 
        //         .startAfter(getMore)
        //         .orderByChild("id")  
        //         .limitToLast(7)
        //         .once('value', (querySnapshot) => {
        //             // hasil
        //             // console.log("data : ",querySnapshot.val())
        //             let data = querySnapshot.val() //? querySnapshot.val() : []
        //             // let dataItem = {...data}
    
        //             dispatchSuccess(dispatch, GET_LIST_SKRIPSI, data)
        //         })
        //         .catch((error) => { 
        //             dispatchError(dispatch, GET_LIST_SKRIPSI, error)
        //             alert(error)
        //         })
        // }
    // }else{
        return (dispatch) => {
            
            // loading
            dispatchLoading(dispatch, GET_LIST_SKRIPSI)
    
            FIREBASE.database()
                .ref('skripsi') //nama folder 
                // .orderByChild("id") 
                // .orderByKey()
                // .limitToLast(7)
                .once('value', (querySnapshot) => {
                    // hasil 
                    let data = querySnapshot.val() //? querySnapshot.val() : []
                    // let dataItem = {...data} 
    
                    var arr = []  
                    Object.keys(data).map((key) => { 
                        arr.push(data[key])
                    })  

                    if(keyword){ 
                        arr = arr.filter(function(item){
                            var string1 = item.judul ?  item.judul.toString().toLowerCase() : ''
                            var string2 = keyword.toString().toLowerCase()

                            var matches = string1.indexOf(string2) >= 0 ? true : false;
                            if (matches) {
                                return item.judul
                            } 
                        })  
                    } 
 
                    dispatchSuccess(dispatch, GET_LIST_SKRIPSI, arr)
                })
                .catch((error) => { 
                    dispatchError(dispatch, GET_LIST_SKRIPSI, error)
                    alert(error)
                })
        }
    // }
   
}

export const getOneSkripsi = (uid) => { 
        return (dispatch) => {
            
            // loading
            dispatchLoading(dispatch, GET_ONE_SKRIPSI)
    
            FIREBASE.database()
                .ref('skripsi') //nama folder 
                .orderByChild("uid")
                .equalTo(uid) 
                // .limitToLast(7)
                .once('value', (querySnapshot) => {
                    // hasil 
                    let data = querySnapshot.val() //? querySnapshot.val() : []
                    // let dataItem = {...data} 
    
                    if(data){
                        var arr = []  
                        Object.keys(data).map((key) => { 
                            arr.push(data[key])
                        })  
      
                        dispatchSuccess(dispatch, GET_ONE_SKRIPSI, arr)
                    }else{
                        dispatchSuccess(dispatch, GET_ONE_SKRIPSI, false)
                    } 
                })
                .catch((error) => { 
                    dispatchError(dispatch, GET_ONE_SKRIPSI, error)
                    alert(error)
                })
        }
    // }
   
}

export const updateSkripsi = (data) => {
    return (dispatch) => {
        // 1st condition, LOADING
        dispatchLoading(dispatch,UPDATE_SKRIPSI)
 
 
        if(data.updateFile){ 
             
            // upload document to storage
            var fileName = data.tahun+"_"+data.nim+".pdf"
            var storageRef = FIREBASE.storage().ref("skripsi/")
            var uploadTask = storageRef.child(fileName).put(data.file);

            console.log(data.fileUrl)
            
            // delete old file
                let dataRef = FIREBASE.storage().refFromURL(data.fileUrl);
                dataRef.delete()
                    .then(() => {  
                        console.log("Data is deleted successfully!");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
 
             uploadTask.on('state_changed', 
                 (snapshot) => { 
                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
 
                     dispatch({
                         type: UPDATE_SKRIPSI,
                         payload: {
                             loading: true,
                             progress : progress
                         }
                     }) 
                 }, 
                 (error) => {
                     // Handle unsuccessful uploads 
                     dispatchError(dispatch, UPLOAD_SKRIPSI, error.message) 
                     Alert.alert(error);
                 }, 
                 () => {
                     // Handle successful uploads on complete
                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => { 
                        var today = new Date();
                        var date1 = format(today,"yyyy-MM-dd hh:mm:ss")
 
                        const dataBaru = {
                            judul: data.judul,
                            pembimbing1: data.pembimbing1, 
                            pembimbing2: data.pembimbing2, 
                            keyword: data.keyword,
                            tahun: data.tahun, 

                            file: downloadURL,
                            dateUpdate: date1
                        };  

                        dispatch(updateData(dataBaru,data.uid))
                     });
                 }
             );
        } else{
            const dataBaru = {
                judul: data.judul,
                pembimbing1: data.pembimbing1, 
                pembimbing2: data.pembimbing2, 
                keyword: data.keyword,
                tahun: data.tahun, 
            }

            dispatch(updateData(dataBaru, data.uid))
        }
  
       
    }
}

export const saveKeywordSkripsi= (search) => ({
    type: SAVE_KEYWORD_SKRIPSI,
    payload: {
        data: search
    }
})

export const deleteParameterSkripsi = () => ({
    type: DELETE_PARAMETER_SKRIPSI
})


export const updateData = (data,uid) => {
    return (dispatch) => {
        FIREBASE.database()
        .ref('skripsi/'+uid)
        .update(data)
        .then((response) => {
            // SUKSES condition .. 3  
            dispatchSuccess(dispatch, UPDATE_SKRIPSI, "Sukses")
        })
        .catch((error) => {
            // ERROR condition ...5  
            dispatchError(dispatch, UPDATE_SKRIPSI, error.message)
    
            Alert.alert(error.message);
        })
    } 
}
