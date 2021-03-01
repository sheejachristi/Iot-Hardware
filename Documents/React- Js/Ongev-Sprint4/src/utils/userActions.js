
import axios from './axios';

export const updateUser = (user, dispatch) => {

    let account = {...user}
    let account1 = {...user}

    delete account.age
    delete account.careProvider
    delete account.authenticated
    delete account.network
    delete account.networks
    delete account.tokenExpired
    delete account.interests
    delete account.logoURL
    delete account.procedures
    delete account.conditions
    delete account.onboarded
    delete account.allergies
    delete account.bloodType
    delete account.ethnicity
    delete account.familyHistory
    delete account.height
    delete account.weight
    delete account.medications
    delete account.diagnosis

    //account.zipCode = account.zipcode
    account.ethnicity = user.ethnicity


   // alert(account.ethnicity)

    return new Promise((resolve, reject) => {



        axios.put(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/user/' + account.uid, account, {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
        })
        .then((resp) => {
    //medications: values.medications? values.medications : values.medications=[],
    //diagnosis: values.diagnosis? values.diagnosis : values.diagnosis=[],
    //conditions: values.conditions? values.conditions : values.conditions=[],
    //allergies: values.allergies? values.allergies : values.allergies=[]
//alert(account1.medications[0])

    if(account1.medications===null){
        account1.medications = []
    }
    else account1.medications=account1.medications.map(({tableData,...rest})=>rest)

   if(account1.procedures === null) account1.procedures= [] ;
   else account1.procedures=account1.procedures.map(({tableData,...rest})=>rest)
   if(account1.conditions === null) account1.conditions= [];
   else account1.conditions=account1.conditions.map(({tableData,...rest})=>rest)
   if(account1.allergies === null) account1.allergies= [];
   else account1.allergies=account1.allergies.map(({tableData,...rest})=>rest)


    addVitals(account1)
        .then(resp => {
        dispatch({type: 'update', payload: user})
        resolve(resp)
    })
.catch((err) => {
        console.log(err);
    reject(err)
})
})
.catch((err) => {
        console.log(err);
    reject(err)
})
})
}

export const setOnboarded = (user) => {
    const date = new Date()
    const iso = date.toISOString()

    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + user.patientID, { onboarded: iso }, {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
        })
        .then((resp) => {
        resp.onboarded = iso
    resolve(resp)
})
.catch((err) => {
        console.log(err);
    reject(err)
})
})
}

export const addInterests = (user) => {

    const interests = user.interests.map(inter => {
        const result = {}
        result.interest = inter
    return result
})

    return new Promise((resolve, reject) => {

            axios.post(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + user.patientID + '/interest', { interests }, {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
            })
            .then((resp) => {
            resolve(resp)
        })
.catch((err) => {
        console.log(err);
    reject(err)
})
})
}

export const addVitals = (user) => {

    let account = {...user}

    delete account.age
    delete account.careProvider
    delete account.authenticated
    delete account.network
    delete account.networks
    delete account.tokenExpired

    if(!account.birthday) account.birthday = ""
    if(!account.gender) account.gender = ""
    if(!account.ethnicity) account.ethnicity = ""
    if(!account.height) account.height = ""
    if(!account.weight) account.weight = ""
    if(!account.familyHistory) account.familyHistory = ""
    if(!account.bloodType) account.bloodType = ""
    if(!account.medications) account.medications = ''
    if(!account.diagnosis) account.diagnosis = ""
    if(!account.conditions) account.conditions = ""
    if(!account.allergies) account.allergies = ""
    if(!account.procedures) account.procedures = ""
    if(!user.date) user.date = ""
    if(!user.careProvider.name) user.careProvider.name = ""
    if(!user.careProvider.email) user.careProvider.email = ""
    if(!user.careProvider.contact) user.careProvider.contact = ""
    if(!account.stage) account.stage = ""










    const data = {
        manual_entry_data: [
            {
                key: 'birthday',
                details: [{
                    value: account.birthday,
                    uom: ""
                }
                ]
            },
            {
                key: 'gender',
                details: [{
                    value: account.gender,
                    uom: ""
                }
                ]
            },
            {
                key: 'ethnicity',
                details: [{
                    value: account.ethnicity,
                    uom: ""
                }
                ]
            },
            {
                key: 'height',
                details: [{
                    value: account.height,
                    uom: 'inches'
                }
                ]
            },
            {
                key: 'weight',
                details: [{
                    value: account.weight,
                    uom: 'lbs'
                }
                ]
            },
            {
                key: 'family-history',
                details: [{
                    value: account.familyHistory,
                    uom: ""
                }
                ]
            },
            {
                key: 'blood-type',
                details: [{
                    value: account.bloodType,
                    uom: ""
                }
                ]
            },
            {
                key: 'medications',
                details: account.medications
            },
            {
                key: 'conditions',
                details: account.conditions
            },
           /* {
                key: 'diagnosis',
                details: account.diagnosis
            },*/

            {
                key: 'allergies',
                details:account.allergies

            },
            {
                key: 'procedures',
                details: account.procedures
            },
            {
                key: 'date',
                details: [{
                    value: user.date,
                    uom: ""
                }
                ]
            },
            {
                key: 'physName',
                details: [{
                    value: user.careProvider.name,
                    uom: ""
                }
                ]
            },
            {
                key: 'physEmail',
                details: [{
                    value: user.careProvider.email,
                    uom: ""
                }
                ]
            },
            {
                key: 'physContact',
                details: [{
                    value: user.careProvider.contact,
                    uom: ""
                }
                ]
            },
            {
                key: 'stage',
                details: [{
                    value: account.stage,
                    uom: ""
                }
                ]
            },
        ]
    }
    console.log("User details"+user.careProvider.name);
    console.log(data);

    const cleanVitalsKey = (key) => {
        const keys = key.split('-')
        if (keys.length === 1) {
            return key
        }
        const first = keys.shift()
        return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
    }



    return new Promise((resolve, reject) => {

            axios.put(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + account.patientID + '/manual-entry', data, {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
            })
            .then((resp) => {




            resolve(resp)



            // localStorage.setItem('diagone', resp..chronicname)
        })
.catch((err) => {
        console.log(err);
    reject(err)
})


})
}

export const onboardManual = (user, dispatch) => {
    return new Promise((resolve, reject) => {
            console.log("dkdk--"+JSON.stringify(user));
    addVitals(user, dispatch)
        .then(resp => {
        addInterests(user, dispatch)
        .then(resp => {
        if (user.onboarded) {
        resolve(resp)
    } else {
        setOnboarded(user)
            .then(resp => {
            console.log('Onboarded')
        resolve(resp)
    })
    .catch(err => {
            err.alert = 'onboarding'
        console.log(err);
        reject(err)
    })
    }
})
.catch(err => {
        err.alert = 'interests'
    console.log(err);
    reject(err)
})
})
.catch(err => {
        err.alert = 'vitals'
    console.log(err);
    reject(err)
})
})
}