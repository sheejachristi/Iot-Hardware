import axios from "./axios";



export default function getEHRPatient(id){

    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/ehr/patient/' + id,
        { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })
            .then((response) => {
                console.log(response)
                resolve(response.data.patient.entry[0]);
            })
        .catch((error) => {
            reject(error)
        })
        .finally(() => {
        });
    })

    // return new Promise((resolve, reject) => {
    //     axios.get('../../test-data/Get_EHR_Patient.json')
    //         .then((response) => {
    //             resolve(response.data.patient.entry[0]);
    //         })
    //     .catch((error) => {
    //         reject(error)
    //     })
    //     .finally(() => {
    //     });
    // })
}
