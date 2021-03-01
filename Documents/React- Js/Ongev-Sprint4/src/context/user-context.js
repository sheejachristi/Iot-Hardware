import React, {useReducer, createContext, useEffect} from "react";


export const UserContext = createContext();

const LOCAL_STORAGE_KEY = "ongev:patient:profile";
const UNAUTHENTICATED_PROFILE = {
    authenticated: false,
    uid: undefined,
    patientID: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    network: {
        name: undefined,
        id: undefined,
        fhirApiVersion: undefined,
        oneUpId: undefined,
    },

    networks: [],
    birthday: undefined,
    gender: undefined,
    tokenExpired: false,
    diagnosis: undefined,
    date: undefined,
    treatment: undefined,
    medications: undefined,
    stage: undefined,
    zipcode: undefined,
    age: undefined,
    careProvider: undefined,
    interests: undefined,
    onboarded: false,
    code: false,
    logoURL: false
}
const initialState =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || UNAUTHENTICATED_PROFILE;

if (!initialState.networks) {
    initialState.networks = []
}

if (Array.isArray(initialState.medications)) {
    initialState.medications = initialState.medications.join(', ')
}

if (!('interests' in initialState)) {
    initialState.interests = undefined
}

const reducer = (profile, action) => {
    let user

    switch (action.type) {
        case 'login':

            let newAge
            if (action.payload.birthday) {
                const diff_ms = Date.now() - new Date (action.payload.birthday).getTime()
                const age_dt = new Date(diff_ms); 
                newAge = Math.abs(age_dt.getUTCFullYear() - 1970)
            }
            return{
                ...profile,
                authenticated: true,
                tokenExpired: false,
                uid: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                zipcode: action.payload.zipCode,
                diagnosis: action.payload.diagnosis,
                stage: action.payload.stage,
                treatment: action.payload.treatment,
               medications: action.payload.medications,
            //medications: [...profile.medications, action.payload.medications],

          /* medications:
        {
            description: action.payload.description,
        dosage: action.payload.dosage,
            frequency: action.payload.frequency,
            medicine: action.payload.medicine,
            startdate: action.payload.startdate,
           status: action.payload.status,

        },*/

            careProvider:
        {
            name: action.payload.physName,
                email: action.payload.physEmail,
            contact: action.payload.physContact
        },


                date: action.payload.date,
                birthday: action.payload.birthday,
                gender: action.payload.gender,
                patientID: action.payload.patient_id,
                network: {
                    name: action.payload.oneUp.healthcareNetworkName,
                    id: action.payload.oneUp.healthcareNetworkId,
                    fhirApiVersion: action.payload.oneUp.fhirApiVersion,
                    oneUpId: action.payload.oneUp.oneUpId,
                },
                networks: action.payload.networks || [],
                age: newAge,
                onboarded: action.payload.onboarded,
                interests: action.payload.interests,
                bloodType: action.payload.bloodType,
                ethnicity: action.payload.ethnicity,
                height: action.payload.height,
                weight: action.payload.weight,
                familyHistory: action.payload.familyHistory,
                conditions: action.payload.conditions,
                allergies: action.payload.allergies,
                procedures: action.payload.procedures,
                code: action.payload.employer
            };
        case 'sign up':
            // May no longer need
            return{
                authenticated: true,
                tokenExpired: false,
                uid: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                zipcode: action.payload.zipcode,
                diagnosis: action.payload.diagnosis,
                stage: action.payload.stage,
                treatment: action.payload.treatment,
                medications: action.payload.medications,
                date: action.payload.date,
                networks: [],
                network: {
                    name: undefined,
                    id: undefined,
                    fhirApiVersion: undefined,
                    oneUpId: undefined,
                },
            };
        case 'set logo url':
            user = {
                ...profile,
                logoURL: action.payload.logoURL,
            }
            return user
        case 'update':
            user = {
                ...profile,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                birthday: action.payload.birthday,
                gender: action.payload.gender,
                age: action.payload.age,
                careProvider: action.payload.careProvider,
                zipcode: action.payload.zipcode,
            }
            if (action.payload.password) {
                user.password = action.payload.password
            }
            delete user.password
            return user;
        case 'onboard manual':

            user = {
                ...profile,
                interests: action.payload.interests,
                diagnosis: action.payload.diagnosis,
                birthday: action.payload.birthday,
                procedures: action.payload.procedures,
                medications: action.payload.medications,
                gender: action.payload.gender,
                bloodType: action.payload.bloodType,
                ethnicity: action.payload.ethnicity,
                height: action.payload.height,
                weight: action.payload.weight,
                familyHistory: action.payload.familyHistory,
                conditions: action.payload.conditions,
                allergies: action.payload.allergies,
                age: action.payload.age,
                onboarded: action.payload.onboarded ? action.payload.onboarded : profile.onboarded
            }
            return user;
        case 'update interests':
            user = {
                ...profile,
                interests: action.payload.interests,
                onboarded: action.payload.onboarded ? action.payload.onboarded : profile.onboarded
            }
            return user
        case 'update networks':
            user = {
                ...profile,
                networks: action.payload.networks
            }
            return user
        case 'add network':
            user = {
                ...profile,
                networks: [...profile.networks, action.payload.network]
            }
            return user
        case 'remove network':
            user = {
                ...profile,
                networks: profile.networks.filter(network => network !== action.payload.network)
            }
            return user
        case 'disconnect network':
            user = {
                ...profile,
                networks: [],
            }
            return user
        case 'update care provider':
            user = {
                ...profile,
                careProvider: action.payload.careProvider ? action.payload.careProvider : profile.careProvider,
            }
            return user
        case 'update diagnosis':

            user = {
                ...profile,
                diagnosis: action.payload.diagnosis,
                date: action.payload.date,
                treatment: action.payload.treatment,
                medications: action.payload.medications,
                stage: action.payload.stage,
                procedures: action.payload.procedures,
                gender: action.payload.gender ? action.payload.gender : profile.gender,
                zipcode: action.payload.zipcode ? action.payload.zipcode : profile.zipcode,
                birthday: action.payload.birthday ? action.payload.birthday : profile.birthday,
                careProvider: action.payload.careProvider,
                age: action.payload.age ? action.payload.age : profile.age,
            }
            return user
        case 'token expired': {
            return{
                ...profile,
                tokenExpired: true,
                authenticated: false
            }
        }
        case 'toggle expired': {
            return {
                ...profile,
                tokenExpired: false,
            }
        }
        case 'logout':
            localStorage.removeItem("AUTH_TOKEN")
            return {
                // ...profile,
                ...UNAUTHENTICATED_PROFILE,
            };
        default:
            return profile;
    }
}

export const UserContextProvider = props => {
    const [profile, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    }, [profile])


    return(
        <UserContext.Provider value={[profile,dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
