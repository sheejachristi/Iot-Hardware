import axios from "./axios";

const CancelToken = axios.CancelToken;
export const source = new CancelToken.source();

export default function getFullRecords(id){
    
   
    return new Promise((resolve, reject) => {
        
        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + id + '/ehr/resources',
        { 
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then((response) => {
               //alert("response recieved");
                resolve(response.data.resources);
            })
        .catch((error) => {
            reject(error)
        })
        return () => {
            source.cancel()
        }
    })
}
 // return new Promise((resolve, reject) => {
    //     axios.get('../../test-data/sample-patient-record-full.json')
    //         .then((response) => {
    //             resolve(response.data.entry);
    //         })
    //     .catch((error) => {
    //         reject(error)
    //     })
    //     .finally(() => {
    //     });
    // })

