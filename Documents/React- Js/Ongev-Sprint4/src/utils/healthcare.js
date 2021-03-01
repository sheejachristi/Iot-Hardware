import axios from "./axios";



export default function getHealthcareNetworks(){

    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/services/clinical-providers',
        { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } } )
            .then((response) => {
                resolve(response.data.providers);
            })
        .catch((error) => {
            reject(error)
        })
        .finally(() => {
        });
    })

    // return new Promise((resolve, reject) => {
    //     axios.get('../../test-data/Clinical_Providers-Sample.json')
    //         .then((response) => {
    //             resolve(response.data.providers);
    //         })
    //     .catch((error) => {
    //         reject(error)
    //     })
    //     .finally(() => {
    //     });
    // })
}
