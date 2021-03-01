
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles'

import { forwardRef, useRef } from 'react';
import MaterialTable from "material-table";

import { TablePagination } from '@material-ui/core';

import InputAdornment from "@material-ui/core/InputAdornment";

import CakeIcon from '@material-ui/icons/Cake';

import { format, isValid } from 'date-fns'

import Moment from 'moment';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CircularProgress from "@material-ui/core/CircularProgress";

import{
    Grid,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    TableRow,
    TableHead,
    TableCell,
    Table,
    TableBody,
    Button
} from '@material-ui/core/'
import moment from 'moment'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardDatePicker } from "@material-ui/pickers";

import { addVitals } from '../../utils/userActions'
import axios from '../../utils/axios'
const useStyles = makeStyles((theme) => ({
        healthInfoTopHalf: {
        },
        healthInfo: {
            marginBottom: theme.spacing(8),
            marginTop: theme.spacing(6),
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            paddingTop: theme.spacing(4),
        },
        // createIcon: {
        //     float: 'right',
        //     padding: '20px',
        //     paddingBottom: '0px',
        //     '&:hover': {
        //         color: theme.palette.primary.light,
        //         cursor: 'pointer',
        //     }
        // },
        healthInfoLabel: {
            color: theme.palette.primary.light,
            fontWeight: '14px',
        },
        healthInfoTop: {
            paddingBottom: theme.spacing(6),
            [theme.breakpoints.up('md')]: {
                maxHeight: '200px',
            },
        },
        healthInfoTopItem: {
            paddingLeft: theme.spacing(6),
            '@media (max-width: 960px)': {
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
            },
        },
        healthInfoTopMain: {
            paddingBottom: theme.spacing(3),
            '@media (max-width: 1100px)': {
                fontSize: '24px',
            }
        },
        healthInfoTopBottomHalf: {
            minHeight: '4rem',
        },
        healthInfoTopItemMiddle: {
            borderColor: theme.palette.primary.light,
            borderLeftWidth: "2px",
            borderLeftStyle: 'solid',
            borderRightWidth: "2px",
            paddingLeft: theme.spacing(6),
            '@media (max-width: 960px)': {
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
            },
            '@media (max-width: 500px)': {
                paddingLeft: theme.spacing(0),
                marginLeft: theme.spacing(6),
                borderStyle: 'none',
                borderTopWidth: "2px",
                borderTopStyle: 'solid',
                borderBottomWidth: "2px",
                borderBottomStyle: 'solid',
                marginBottom: theme.spacing(2),
                marginTop: theme.spacing(2),
            },
            [theme.breakpoints.down('xs')]: {
                borderStyle: 'none'
            }
        },
        healthInfoBottom: {
            borderTopWidth: "1px",
            borderTopColor: theme.palette.primary.contrastText,
            borderTopStyle: 'solid',
            color: theme.palette.primary.contrastText,
        },
        healthInfoBottomItem: {
            paddingLeft: theme.spacing(6),
            paddingTop: theme.spacing(4),
            backgroundColor: theme.palette.primary.main,
            height: '150px',
        },
        inputField: {
            width: '90%',
            height: '40px',
            marginTop: 0,
            marginBottom: 0,

        },
        inputFieldTop: {
            width: '90%',
            height: '40px',
            marginTop: 0,
            marginBottom: theme.spacing(4),
            textAlign:'right',
            color:'red',
            //direction:'rtl',

        },
        inputFieldTopDate: {
            width: '90%',
            height: '40px',
            marginTop: 0,
            marginBottom: theme.spacing(4),
            textAlign:'right',
            color:'red',


        },
        input: {
            height: '40px',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            fontSize: '1rem',


        },
        uom: {
            fontSize: '1rem',
            fontWeight: 100,
            marginLeft: theme.spacing(1)
        },
        weightInputContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            alignItems: 'baseline'
        },
        heightInputContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%'
        },
        heightInput: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '45%',
            alignItems: 'baseline',

        },
        selector: {
            height: '40px',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            fontSize: '1rem',
            marginBottom: theme.spacing(4),
            width: '90%',
            borderRadius: '4px'
        },
        helperText: {
            color: theme.palette.primary.contrastText + '!important',
            position: 'absolute',
            top: '2.4rem!important',
            left:'0.0rem!important',
            fontSize: '0.75rem',
            marginLeft: 0,
            width: '200px',
            textAlign:'center'
        },
        heightHelperText: {
            color: theme.palette.primary.contrastText + '!important',
            position: 'absolute',
            top: '2.4rem!important',
            left:'0.0rem!important',
            fontSize: '0.75rem',
            marginLeft: 0,
            width: '200px',
            textAlign:'center'
        },
    }))

const HealthInfo = ({profile, dispatch}) => {
    const classes = useStyles();

    //alert(profile.birthday);
    const [edit, setEdit] = useState({
        birthday: !profile.birthday,
        medications: !profile.medications,
        height: !profile.height,
        weight: !profile.weight,
        allergies: !profile.allergies,
        procedures: !profile.procedures,
        bloodType: !profile.bloodType,
        diagnosis: !profile.diagnosis,
        conditions: !profile.conditions
    })

    const [error, setError] = useState({
        height: false,
        weight: false,
        measure:false,
        procedurename:false,
        birthday: false
    })
    const [profileFeet, setFeet] = useState(profile.height ?  Math.floor(parseInt(profile.height)/ 12) : undefined)
    const [profileInches, setInches] = useState(profile.height ? Math.floor(parseInt(profile.height) % 12) : undefined)
    const parts = profile.birthday ? profile.birthday.split('-') : null
    const birthdayFormat = parts ? parts[1] + "/" +parts[2] + "/" + parts[0] : null
    const [birthday, setBirthday] = useState(parts ? new Date(parts[0], parts[1]-1, parts[2]) : null)
    const [visitdate,setvisitdate] = useState('')
    const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-','Unknown']

    const [illdate, setIllDate] = useState(parts ? new Date(parts[0], parts[1]-1, parts[2]) : '')

    const cleanVitalsKey = (key) => {
        const keys = key.split('-')
        if (keys.length === 1) {
            return key
        }
        const first = keys.shift()
        return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
    }

    const [medicationdata, setMedicationData] = useState([])
    const [diagnosisdata, setDiagnosisData] = useState([])
    const [conditiondata, setConditionData] = useState([])
    const [loading, setLoading] = useState(false);
    const [proceduredata, setProcedureData] = useState([])
    const [allergiesdata, setAllergiesData] = useState([])
    const [show,setShow]=useState(2)
    const [status,setStatus]=useState("")
    const [expanded, setExpanded] = useState(false)
    const [showchronic,setShowChronic]=useState(2)
    const [expandedchronic, setExpandedChronic] = useState(false)
    const [showprocedure,setShowProcedure]=useState(2)
    const [expandedprocedure, setExpandedProcedure] = useState(false)
    const [showallergies,setShowAllergies]=useState(2)
    const [expandedallergies, setExpandedAllergies] = useState(false)

    const [showsave,setShowSave]=useState(false)

    const patientUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'

    const handleChangeIllDate = (date) => {
        if (isValid(date)) {
            setIllDate(format(date, 'yyyy-MM-dd'))
            console.log('Valid date')
        } else {
            console.log('Invalid date')
            setIllDate(null)
        }
        handleChangeIllDate(date)
    }






    useEffect(() => {



        const source = axios.CancelToken.source()

        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + profile.patientID + '/ehr/resources',
        {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then(resp => {

        const resources = resp.data.resources
// var length = (resources.office_visits.length -1)
        var d = resources.office_visits[0].period
        var l = d.split('T')
        var s = new Date(l[0])
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[s.getMonth()]
    var year = s.getFullYear()
    var day = s.getDate()
    var vdate = day +" "+ month+" " + year
    setvisitdate(vdate)

})
.catch(err => {
        console.log(err)
})

    axios.get(patientUrl + profile.patientID + '/manual-entry',
        {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then((resp) => {

        if(resp.data.fhir_manual_entry.status==="Pending") {
        //setStatus("Processing")
        localStorage.setItem("status","Pending");

        //setLoading(true)

    }

    else if(resp.data.fhir_manual_entry.status==="Processed") {
        //setStatus("Processed")
        localStorage.setItem("status","Processed");
        //setLoading(false)

    }

        resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {
        const newVital = cleanVitalsKey(vital.key)
        console.log("key"+newVital);

    // profile[newVital] = vital.details[0].value
    //profile[newVital] = vital

    if(vital.key === "medications") {

        console.log("vital"+JSON.stringify(vital))

        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const medication = [...new Set(vital.details)]
        profile['medications'] = medication


        setMedicationData(profile.medications)
        //alert("sugi"+JSON.stringify(medicationdata))

    }

    if(vital.key === "diagnosis") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const diagnosis = [...new Set(vital.details)]
        profile['diagnosis'] = diagnosis



       // setDiagnosisData(profile.diagnosis)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }

    if(vital.key === "procedures") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const procedures = [...new Set(vital.details)]
        profile['procedures']= procedures



        setProcedureData(profile.procedures)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }

    else  profile['procedures'] = []

    if(vital.key === "allergies") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const allergies = [...new Set(vital.details)]
        profile['allergies']= allergies



        setAllergiesData(profile.allergies)


        //alert("sugi"+JSON.stringify(profile.allergies))


    }


    if(vital.key === "conditions") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const conditions = [...new Set(vital.details)]
        profile['conditions']= conditions
        setConditionData(profile.conditions)

        //alert("sugi"+JSON.stringify(profile.allergies))


    }





    //console.log("prf val"+profile.physName);
})

})
.catch(err => console.log(err))


    while(localStorage.getItem('status')==="Pending") {
        axios.get(patientUrl + profile.patientID + '/manual-entry',
            {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
                cancelToken: source.token,
            })
            .then((resp) => {

            if(resp.data.fhir_manual_entry.status==="Pending") {
            //setStatus("Processing")
            //setLoading(true)
            localStorage.setItem("status","Pending");
        }

    else if(resp.data.fhir_manual_entry.status==="Processed") {
            //setStatus("Processed")
            //setLoading(false)
            localStorage.setItem("status","Processed");
        }

        resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {
            const newVital = cleanVitalsKey(vital.key)
            console.log("key"+newVital);

        // profile[newVital] = vital.details[0].value
        //profile[newVital] = vital

        if(vital.key === "medications") {

            console.log("vital"+JSON.stringify(vital))

            //profile.medications = vital.details
            //console.log("daaaa" + JSON.stringify(profile.medications))
            const medication = [...new Set(vital.details)]
            profile['medications'] = medication


            setMedicationData(profile.medications)
            //alert("sugi"+JSON.stringify(medicationdata))

        }

        if(vital.key === "diagnosis") {


            //profile.medications = vital.details
            //console.log("daaaa" + JSON.stringify(profile.medications))
            const diagnosis = [...new Set(vital.details)]
            profile['diagnosis'] = diagnosis



            // setDiagnosisData(profile.diagnosis)


            //alert("sugi"+JSON.stringify(profile.diagnosis))


        }

        if(vital.key === "procedures") {


            //profile.medications = vital.details
            //console.log("daaaa" + JSON.stringify(profile.medications))
            const procedures = [...new Set(vital.details)]
            profile['procedures']= procedures



            setProcedureData(profile.procedures)


            //alert("sugi"+JSON.stringify(profile.diagnosis))


        }
        if(vital.key === "allergies") {


            //profile.medications = vital.details
            //console.log("daaaa" + JSON.stringify(profile.medications))
            const allergies = [...new Set(vital.details)]
            profile['allergies']= allergies



            setAllergiesData(profile.allergies)


            //alert("sugi"+JSON.stringify(profile.allergies))


        }


        if(vital.key === "conditions") {


            //profile.medications = vital.details
            //console.log("daaaa" + JSON.stringify(profile.medications))
            const conditions = [...new Set(vital.details)]
            profile['conditions']= conditions
            setConditionData(profile.conditions)

            //alert("sugi"+JSON.stringify(profile.allergies))


        }





        //console.log("prf val"+profile.physName);
    })

    })
    .catch(err => console.log(err))
    }



    return () => {
        source.cancel()
    }
},[status])


    const parseHeight = (height) => {
        if (height.split("'").length > 1 ) {
            return height
        } else {
            const feet = Math.floor(parseInt(height)/ 12)
            const inches = Math.floor(parseInt(height) % 12)
            return `${feet}' ${inches}"`
        }
    }


    const toggleEdit = (name) => {
        console.log(profile);
        const newEdit = {...edit}
        newEdit[name] = !edit[name]
        setEdit(newEdit)
    }

    const toggleError = (name) => {
        const newError = {...error}
        newError[name] = !error[name]
        setError(newError)
    }

    const convertHeight = (string) => {

        debugger
        if (typeof string === 'string' && string.split("'").length > 1) {
            let newHeight = string.split('"').join('')
            newHeight = newHeight.split("'")
            if (newHeight[0] === '') {newHeight[0] = '0'}
            if (newHeight[1] === '' || newHeight[1] === ' ') {newHeight[1] = '0'}
            newHeight = (parseInt(newHeight[0]) * 12) + parseInt(newHeight[1])
            return newHeight ? newHeight.toString() : newHeight
        } else {
            return  parseInt(string) ? parseInt(string).toString() : null
        }
    }

    const keyPressHeight = (e) => {

        if(e.keyCode === 13 || e.keyCode === 9 ){
            try {
                var s = profileInches

                if(s<=12){

                    let value = `${profileFeet}' ${profileInches}"`
                    value = convertHeight(value)
                    if (!!parseInt(value) && parseInt(value) > 0 && parseInt(value) <= 120) {
                        if (error.height) {
                            toggleError('height')
                        }
                    } else {
                        if (!error.height) {
                            toggleError('height')
                        }
                        return null
                    }
                    if (value !== profile.height) {
                        const newUser = {...profile}
                        newUser.height = value
                        const dt=medicationdata.map(({tableData,...rest})=>rest)

                        newUser['medications'] = dt;

                        const dt1=conditiondata.map(({tableData,...rest})=>rest)

                        newUser['conditions'] = dt1;
                        const dt2=proceduredata.map(({tableData,...rest})=>rest)

                        newUser['procedures'] = dt2;
                        const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                        newUser['allergies'] = dt3;


                        addVitals(newUser)
                            .then(resp => {
                            dispatch({type: 'onboard manual', payload: newUser})
                        })
                    .catch(err => {
                            console.log(err)
                    })
                    }
                    toggleEdit('height')
                }
                else{
                    toggleError('height')
                }
            } catch {
                toggleEdit('height')
            }
        } else if (e.keyCode === 27) {
            toggleEdit('height')
        }
    }

    const keyPress = (e) => {
        if(e.keyCode === 13 || e.keyCode === 9 ){
            try {
                let value = e.target.value
                var pattern = new RegExp(/^[0-9 ]$/);
                if (e.target.name === 'weight') {
                    if (!pattern.test(value)) {
                        value = parseInt(value)
                        if (!!value && value > 0 && value < 1200) {
                            value = value.toString()
                            if (error.weight) {
                                toggleError('weight')
                            }
                        } else {
                            toggleError('weight')
                            return null
                        }
                    }
                    else {
                        toggleError('weight')
                        return null
                    }
                }
                if (e.target.name === 'birthday') {

                        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                    if (!(date_regex.test(e.target.value))) {
                        if(!error.birthday)
                        toggleError('birthday')
                        return false;
                    }

                    var datearray=[]
                    datearray=value.split("/");
                    var newdate=datearray[0]+"/"+datearray[1]+"/"+datearray[2].replace('__',"");
                    value=newdate;
                    value = format(new Date(value), 'yyyy-MM-dd')

                }
                if (value !== profile[e.target.name]) {
                    const newUser = {...profile}
                    newUser[e.target.name] = value
                    if (e.target.name === 'birthday') {
                        const diff_ms = Date.now() - new Date (value).getTime()
                        const age_dt = new Date(diff_ms);
                        newUser.age = Math.abs(age_dt.getUTCFullYear() - 1970)
                    }
                    const dt=medicationdata.map(({tableData,...rest})=>rest)

                    newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;
                    const dt2=proceduredata.map(({tableData,...rest})=>rest)

                    newUser['procedures'] = dt2;
                    const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                    newUser['allergies'] = dt3;

                    addVitals(newUser)
                        .then(resp => {
                        dispatch({type: 'onboard manual', payload: newUser})
                    })
                .catch(err => {
                        console.log(err)
                })
                }
                toggleEdit(e.target.name)
            } catch {
                toggleEdit(e.target.name)
            }
        } else if (e.keyCode === 27) {
            toggleEdit(e.target.name)
        }
    }

    const handleSelectorChange = (e, v) => {
        debugger
        try {
            let value = e.target.value
            if (value !== profile[e.target.name]) {
                const newUser = {...profile}
                newUser[e.target.name] = value
                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                const dt1=conditiondata.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;

                addVitals(newUser)
                    .then(resp => {
                    dispatch({type: 'onboard manual', payload: newUser})
                })
            .catch(err => {
                    console.log(err)
            })
            }
            toggleEdit(e.target.name)
        } catch {
            toggleEdit(e.target.name)
        }
    }

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove style={{fill: "#A3DEF6"}} {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn style={{fill: "#A3DEF6"}} {...props} ref={ref} />)
};



    function Medication() {
        const { useState } = React;

        const medicationstatus = ["yes","no"]



        const [columns, setColumns] = useState([

            { title: 'Id', field: 'id', hidden: true },

            { title: 'source', field: 'source', hidden: true },

            { title: 'status', field: 'status', hidden: true },



            { title: 'Medicine', field: 'medicine_name',

                editComponent: props => (

            <>
            <Typography component="h1" variant="body1" >
                Required
                </Typography>
                <TextField
            variant="outlined"
            className={classes.inputField}
        value={props.value}
        InputProps={{
            className: classes.input,
        }}
        onChange={e => props.onChange(e.target.value)}
        variant="outlined"
        placeholder={'(e.g. Tamoxofen)'}
            /> </>
    )

    },
        { title: 'Dosage', field: 'dosage',

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <TextField
            variant="outlined"
            className={classes.inputField}
            value={props.value}
            InputProps={{
            className: classes.input,
        }}
            onChange={e => props.onChange(e.target.value)}
            variant="outlined"
                /> </>
        ) },

        { title: 'Start Date', field: 'start_date',type: 'date', render: rowData =>  rowData.start_date?moment(rowData.start_date).isValid()?moment(rowData.start_date).format('YYYY-MM-DD'):"Not Available":"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdate"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value?props.value:null}
            onChange={props.onChange}
            maxDate={new Date()}
            invalidDateMessage={"Not available"}
            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )},
        { title: 'Stop Date', field: 'end_date',type: 'date', render: rowData => rowData.end_date?moment(rowData.end_date).isValid()?moment(rowData.end_date).format('YYYY-MM-DD'):"Not Available":"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdatestop"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value?props.value:null}
            onChange={props.onChange}
            maxDate={new Date()}

            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )},
        { title: 'As Needed', field: 'as_needed',

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <Select
            id="status"
            className={classes.input}
            defaultValue={props.value}

            onChange={e=> props.onChange(e.target.value)}
            name='status'
                >
                {medicationstatus.map(type => <MenuItem value={type}>{type}</MenuItem>)}
        </Select></>
        )}


    ]);




        const showMore = () => {


            if(show===2 && expanded === false)
            {
                setShow(medicationdata.length);
                setExpanded(true);
                setMedicationData([...medicationdata]);



            }
            else
            {

                setShow(2);
                setExpanded(false);
                //setNewData([...newdata]);
                setMedicationData([...medicationdata]);



            }



        }


        const useStyles = makeStyles({
            caption: {
                color: "green",
                padding: 8,
                border: "1px dashed grey",
                fontSize: "0.875rem"
            },
            toolbar: {
                "& > p:nth-of-type(2)": {
                    fontSize: "1.25rem",
                    color: "red",
                    fontWeight: 600
                }
            }
        });


        return (<>
            <MaterialTable style={{width:'100%', background:'#226EA4', color:'#A3DEF6', boxShadow:'none', position:'relative'}}
        title={<div style={{width:'100%', height:'50px'}}><h2 style={{paddingLeft:'500px'}}>Medications</h2></div>}
        columns={columns}
        data={show===2? medicationdata.slice(0, 2):medicationdata}
        icons={tableIcons}


        options={{
            paging:false,
                pageSize:2,       // make initial page size
                emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                pageSizeOptions:[2,5,12,20,50],
                draggable: false,
                emptyRowsWhenPaging: false,
                actionsColumnIndex: -1,// rows selection options,
                headerStyle:{backgroundColor:'#33A2FF', color:'#fff', fontSize:'18px', fontWeight:'bold'},
            search: false,
                sorting:false,
                rowStyle: {
                fontSize: '24px',
                    color:'#fff',
                    fontWeight:'bold'
            }

        }}


        editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                if(newData.medicine_name){
                    medicationdata.push(newData);
                setMedicationData([...medicationdata]);
                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;

                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;


                addVitals(newUser);
                resolve(); }

                else {
                    reject();
                }

            }, 1000)
        }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                if(newData.medicine_name){

                const dataUpdate = [...medicationdata];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setMedicationData([...dataUpdate]);
                const newUser = {...profile}

                const dt=dataUpdate.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;


                addVitals(newUser);
                resolve(); }

                else reject()

            }, 1000)
        }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                const dataDelete = [...medicationdata];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setMedicationData([...dataDelete]);
                const newUser = {...profile}

                const dt=dataDelete.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;


                const dt1=conditiondata.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;


                addVitals(newUser);
                resolve()
            }, 1000)
        }),
        }}
    />
    <div style={{background:'#226EA4', width:'100%', height:'50px'}}><Button style={{marginLeft:'1050px'}}  onClick={() => showMore()}>
        {expanded ? (
        <span style={{ color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show less</span>
        ) : (
        <span style={{color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show more</span>
        )}
    </Button></div> </>
    )
    }

    function ProcedureTable() {
        const { useState } = React;

        const status = ["completed","failed"]



        const [columns, setColumns] = useState([
            { title: 'Name', field: 'procedurename',

                editComponent: props => (

            <>
            <Typography component="h1" variant="body1" >
                Required
                </Typography>
                <TextField
            variant="outlined"
            className={classes.inputField}
        value={props.value}
        InputProps={{
            className: classes.input,
        }}

        variant="outlined"
        placeholder={'(e.g. surgery, counselling)'}

        onChange={(e) =>

        props.onChange(e.target.value)
    }
    /></>
    )

    },
        { title: 'Date', field: 'startdate',type: 'date', render: rowData =>rowData.startdate?moment(rowData.startdate).format('MM/DD/YYYY'):"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdate"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value?props.value:null}
            onChange={props.onChange}
            maxDate={new Date()}
            invalidDateMessage={null}
            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )},

        {title: 'Status', field: 'status',

            editComponent: props => (

        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <Select
            id="status"
            className={classes.input}
            defaultValue={props.value}

            onChange={e=> props.onChange(e.target.value)}
            name='status'
                >
                {status.map(type => <MenuItem value={type}>{type}</MenuItem>)}
        </Select>
        </>
        )

        },

        { title: 'Description', field: 'description',

            editComponent: props => (
        <>

        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <TextField
            variant="outlined"
            className={classes.inputField}
            value={props.value}
            InputProps={{
            className: classes.input,
        }}
            onChange={e => props.onChange(e.target.value)}
            variant="outlined"
                /></>
        )}



    ]);







        const showMore_procedure = () => {

            if(showprocedure===2 && expandedprocedure === false)
            {
                setShowProcedure(proceduredata.length);
                setExpandedProcedure(true);
                setProcedureData([...proceduredata]);



            }
            else
            {


                setShowProcedure(2);
                setExpandedProcedure(false);
                setProcedureData([...proceduredata]);



            }



        }


        const useStyles = makeStyles({
            caption: {
                color: "green",
                padding: 8,
                border: "1px dashed grey",
                fontSize: "0.875rem"
            },
            toolbar: {
                "& > p:nth-of-type(2)": {
                    fontSize: "1.25rem",
                    color: "red",
                    fontWeight: 600
                }
            }
        });


        return (<>
            <MaterialTable style={{width:'100%', background:'#226EA4', color:'#A3DEF6', boxShadow:'none', position:'relative'}}
        title={<div style={{width:'100%', height:'50px'}}><h2 style={{paddingLeft:'500px'}}>Procedures</h2></div>}
        columns={columns}
        data={showprocedure===2? proceduredata.slice(0, 2):proceduredata}
        icons={tableIcons}


        options={{
            paging:false,
                pageSize:2,       // make initial page size
                emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                pageSizeOptions:[2,5,12,20,50],
                emptyRowsWhenPaging: false,
                draggable: false,
                actionsColumnIndex: -1,// rows selection options,
                headerStyle:{backgroundColor:'#33A2FF', color:'#fff', fontSize:'18px', fontWeight:'bold'},
            search: false,
                sorting:false,
                rowStyle: {
                fontSize: '24px',
                    color:'#fff',
                    fontWeight:'bold'
            }

        }}


        editable={{
            onRowAdd: newData =>

            new Promise((resolve, reject) => {

                setTimeout(() => {
                if(newData.procedurename){

                proceduredata.push(newData);
                setProcedureData([...proceduredata]);

                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;

                addVitals(newUser);

                resolve();}
                else reject();

            }, 1000)

        }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {

                if(newData.procedurename){
                const dataUpdate = [...proceduredata];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setProcedureData([...dataUpdate]);

                const newUser = {...profile}



                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;
                const dt2=dataUpdate.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;



                addVitals(newUser);
                resolve();}
                else reject();
            }, 1000)
        }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                const dataDelete = [...proceduredata];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setProcedureData([...dataDelete]);
                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                const dt1=conditiondata.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;
                const dt2=dataDelete.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;


                addVitals(newUser);
                resolve()
            }, 1000)
        }),
        }}
    />
    <div style={{background:'#226EA4', width:'100%', height:'50px'}}><Button style={{marginLeft:'1050px'}}  onClick={() => showMore_procedure()}>
        {expandedprocedure ? (
        <span style={{ color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show less</span>
        ) : (
        <span style={{color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show more</span>
        )}
    </Button></div> </>
    )
    }




    function ChronicTable() {
        const { useState } = React;

        const severity = ["minor","moderate","major","extreme"]

        const [columns, setColumns] = useState([
            { title: 'Id', field: 'id', hidden:true},

            { title: 'Name', field: 'condition_name',
                editComponent: props => (

            <>
            <Typography component="h1" variant="body1" >
                Required
                </Typography>
                <TextField
            variant="outlined"
            name="chronicname"
            className={classes.inputField}
        value={props.value}
        placeholder={'(e.g. Heart Disease)'}
        InputProps={{
            className: classes.input,
        }}
        onChange={e => props.onChange(e.target.value)}
        variant="outlined"
        required="true"
        type={Number}
            /> </>
    )

    },
        {title: 'Severity', field: 'severity',

            editComponent: props => (

        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <Select
            id="severity"
            className={classes.input}
            onChange={e=> props.onChange(e.target.value)}
            defaultValue={props.value}

            inputVariant="outlined"
            name='severity'
                >
                {severity.map(type => <MenuItem value={type}>{type}</MenuItem>)}
        </Select>
        </>
        )

        },


        { title: 'Start Date', field: 'onset_date_time', type: 'date', render: rowData => rowData.onset_date_time?moment(rowData.onset_date_time).isValid()?moment(rowData.onset_date_time).format('YYYY-MM-DD'):"Not Available":"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdate"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value?props.value:null}
            onChange={props.onChange}
            maxDate={new Date()}
            invalidDateMessage={null}
            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )},

        { title: 'Recorded Date', field: 'recorded_date', type: 'date', render: rowData => rowData.recorded_date?moment(rowData.recorded_date).isValid()?moment(rowData.recorded_date).format('YYYY-MM-DD'):"Not Available":"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdate"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value?props.value:null}
            onChange={props.onChange}
            maxDate={new Date()}
            invalidDateMessage={null}
            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )},


    ]);







        const showMore = () => {

            if(showchronic===2 && expandedchronic === false)
            {
                setShowChronic(conditiondata.length);
                setExpandedChronic(true);
                setConditionData([...conditiondata]);



            }
            else
            {
                setShowChronic(2);
                setExpandedChronic(false);
                //setNewData([...newdata]);
                setConditionData([...conditiondata]);

            }



        }


        const useStyles = makeStyles({
            caption: {
                color: "green",
                padding: 8,
                border: "1px dashed grey",
                fontSize: "0.875rem"
            },
            toolbar: {
                "& > p:nth-of-type(2)": {
                    fontSize: "1.25rem",
                    color: "red",
                    fontWeight: 600
                }
            }
        });


        return (<>
            <MaterialTable style={{width:'100%', background:'#1679BE', color:'#A3DEF6', boxShadow:'none', position:'relative'}}
        title={<div style={{width:'100%', height:'50px'}}><h2 style={{paddingLeft:'500px'}}>Medical Conditions</h2></div>}
        columns={columns}
        data={showchronic===2? conditiondata.slice(0, 2):conditiondata}
        icons={tableIcons}


        options={{
            paging:false,
                pageSize:2,       // make initial page size
                emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                pageSizeOptions:[2,5,12,20,50],
                emptyRowsWhenPaging: false,
                draggable: false,
                actionsColumnIndex: -1,// rows selection options,
                headerStyle:{backgroundColor:'#33A2FF', color:'#fff', fontSize:'18px', fontWeight:'bold'},
            search: false,
                sorting:false,
                rowStyle: {
                fontSize: '24px',
                    color:'#fff',
                    fontWeight:'bold'
            }

        }}


        editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                if(newData.condition_name){
                conditiondata.push(newData);
                setConditionData([...conditiondata]);
                    //profile.diagnosis.trialsearch = newData.chronicname


                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;

                addVitals(newUser);
                resolve();}

                else reject();
            }, 1000)
        }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {

                if(newData.condition_name){
                const dataUpdate = [...conditiondata];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setConditionData([...dataUpdate]);

                    //profile.diagnosis.trialsearch = newData.chronicname

                const newUser = {...profile}



                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                const dt1=dataUpdate.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;



                addVitals(newUser);
                resolve();}
                else reject();
            }, 1000)
        }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                const dataDelete = [...conditiondata];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setConditionData([...dataDelete]);

                /*if(profile.diagnosis.trialsearch === oldData.chronicname) {

                    profile.diagnosis.trialsearch = ""
                }*/

                const newUser = {...profile}




                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                const dt1=dataDelete.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;
                const dt2=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt2;
                const dt3=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt3;


                addVitals(newUser);
                resolve()
            }, 1000)
        }),
        }}
    />
    <div style={{background:'#1679BE', width:'100%', height:'50px'}}><Button style={{marginLeft:'1050px'}} onClick={() => showMore()}>
        {expandedchronic? (
        <span style={{ color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show less</span>
        ) : (
        <span style={{color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show more</span>
        )}
    </Button></div> </>
    )
    }

//Allergies Table Display

    function AllergiesTable() {
        const { useState } = React;


        const types = ["Food Allergy","Dust Allergy","Skin Allergy","Pet Allergy","Hay Fever","Seasonal Allergy","Others"]
        const [columns, setColumns] = useState([
            { title: 'Allergy Name', field: 'name',

                editComponent: props => (

            <>
            <Typography component="h1" variant="body1" >
                Required
                </Typography>
                <TextField
            variant="outlined"
            className={classes.inputField}
        value={props.value}
        InputProps={{
            className: classes.input,
        }}
        onChange={e => props.onChange(e.target.value)}
        variant="outlined"
            /> </>
    )

    },
        {
            title: "Substance Type ", field: 'substance_type',

            editComponent: props => (

        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <TextField
            variant="outlined"
            className={classes.inputField}
            value={props.value}
            InputProps={{
            className: classes.input,
        }}
            onChange={e => props.onChange(e.target.value)}
            variant="outlined"
                />
        </>
        )

        },



        { title: 'Recorded Date', field: 'recorded_date', type: 'date', render: rowData => rowData.recorded_date?moment(rowData.recorded_date).isValid()?moment(rowData.recorded_date).format('YYYY-MM-DD'):"Not Available":"",

            editComponent: props => (
        <>
        <Typography component="h1" variant="body1" >
            &nbsp;
        </Typography>
        <KeyboardDatePicker style = {{marginTop:'65px'}}
            id="illdate"
            disableFuture
            format="MM/dd/yyyy"
            inputVariant="outlined"
            className={classes.datePicker}
            fullWidth
            value={props.value || null}
            onChange={props.onChange}
            maxDate={new Date()}
            invalidDateMessage={null}
            InputProps={{className: classes.input}}
            KeyboardButtonProps={{className: classes.dateIcon}}
        /> </>
        )}


    ]);







        const showMore = () => {

            if(showallergies===2 && expandedallergies === false)
            {
                setShowAllergies(allergiesdata.length);
                setExpandedAllergies(true);
                setAllergiesData([...allergiesdata]);



            }
            else
            {
                setShowAllergies(2);
                setExpandedAllergies(false);
                //setNewData([...newdata]);
                setAllergiesData([...allergiesdata]);

            }



        }


        const useStyles = makeStyles({
            caption: {
                color: "green",
                padding: 8,
                border: "1px dashed grey",
                fontSize: "0.875rem"
            },
            toolbar: {
                "& > p:nth-of-type(2)": {
                    fontSize: "1.25rem",
                    color: "red",
                    fontWeight: 600
                }
            }
        });


        return (<>
            <MaterialTable style={{width:'100%', background:'#1679BE', color:'#A3DEF6', boxShadow:'none', position:'relative'}}
        title={<div style={{width:'100%', height:'50px'}}><h2 style={{paddingLeft:'500px'}}>Allergies</h2></div>}
        columns={columns}
        data={showallergies===2? allergiesdata.slice(0, 2):allergiesdata}
        icons={tableIcons}


        options={{
            paging:false,
                pageSize:2,       // make initial page size
                emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                pageSizeOptions:[2,5,12,20,50],
                emptyRowsWhenPaging: false,
                draggable: false,
                actionsColumnIndex: -1,// rows selection options,
                headerStyle:{backgroundColor:'#33A2FF', color:'#fff', fontSize:'18px', fontWeight:'bold'},
            search: false,
                sorting: false,
                rowStyle: {
                fontSize: '24px',
                    color:'#fff',
                    fontWeight:'bold'
            }

        }}


        editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                if(newData.name){
                allergiesdata.push(newData);
                setAllergiesData([...allergiesdata]);

                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;

                const dt2=allergiesdata.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt2;

                const dt3=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt3;

                addVitals(newUser);
                resolve();}
                else reject()
            }, 1000)
        }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                if(newData.name){
                const dataUpdate = [...allergiesdata];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setAllergiesData([...dataUpdate]);

                const newUser = {...profile}



                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                    const dt1=conditiondata.map(({tableData,...rest})=>rest)

                    newUser['conditions'] = dt1;

                const dt2=dataUpdate.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt2;

                const dt3=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt3;


                addVitals(newUser);
                resolve();}
                else reject()
            }, 1000)
        }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                const dataDelete = [...allergiesdata];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setAllergiesData([...dataDelete]);
                const newUser = {...profile}


                const dt=medicationdata.map(({tableData,...rest})=>rest)

                newUser['medications'] = dt;

                const dt1=conditiondata.map(({tableData,...rest})=>rest)

                newUser['conditions'] = dt1;


                const dt2=dataDelete.map(({tableData,...rest})=>rest)

                newUser['allergies'] = dt2;

                const dt3=proceduredata.map(({tableData,...rest})=>rest)

                newUser['procedures'] = dt3;

                addVitals(newUser);
                resolve()
            }, 1000)
        }),
        }}
    />
    <div style={{background:'#1679BE', width:'100%', height:'50px'}}><Button style={{marginLeft:'1050px'}}  onClick={() => showMore()}>
        {expandedallergies ? (
        <span style={{ color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show less</span>
        ) : (
        <span style={{color:'#fff', cursor:'pointer', textDecoration:'underline'}}>Show more</span>
        )}
    </Button></div> </>
    )
    }



    return (

        <Grid container direction={"column"} className={classes.healthInfo} >
<Grid item xs >
    <Grid container direction={'row'} className={classes.healthInfoTop} >

<Grid item xs={12} sm={6} md={3} className={classes.healthInfoTopItem}>






<div className={classes.healthInfoTopHalf} >
<Typography variant={'h6'} className={classes.healthInfoLabel} >
    Date of Birth
    <EditIcon
    onClick={() => toggleEdit('birthday') }
    style={{float:'right',marginRight:'20px'}}
/>
</Typography>
    {edit.birthday ?
<KeyboardDatePicker
    id="birthday"
    disableFuture
    //inputRef={input => input && input.focus()}
    inputVariant="outlined"
    value={birthday ? birthday : profile.birthday}
    onChange={setBirthday}
    format="MM/dd/yyyy"
    max={moment().format("MM/dd/yyyy")}
    className={classes.inputFieldTopDate}
    fullWidth
    name='birthday'
    onKeyDown={keyPress}
    //allowKeyboardControl={false}
    helperText= {error.birthday?"Please enter valid date":"Hit Enter key to save your text"}
    initialFocusedDate={profile.birthday}
    placeholder="MM/DD/YYYY"
    InputLabelProps={{
        shrink: true,
    }}
    InputProps={{
        className: classes.input,
    }}
    FormHelperTextProps={{
        className: classes.helperText,
            styles: {
            color: 'white'
        }
    }}
/>
:
<Typography component={"h3"} variant={"h3"} className={classes.healthInfoTopMain} >
    {profile.birthday ? birthdayFormat  : 'Not provided'}

</Typography>
}
</div>

    {/* <div className={classes.healthInfoTopBottomHalf}>
     <Typography variant={'h6'} className={classes.healthInfoLabel} >
     Medications
     <EditIcon
     onClick={() => toggleEdit('medications')}
     style={{float:'right',marginRight:'20px'}}
     />
     </Typography>

     {edit.medications ?
     <TextField
     variant="outlined"
     name='medications'
     defaultValue={profile.medications}
     className={classes.inputField}
     onKeyDown={keyPress}
     placeholder={'(e.g. Tamoxofen)'}
     InputProps={{
     className: classes.input,
     }}
     helperText='Hit the Enter key to save your text'
     FormHelperTextProps={{
     className: classes.helperText
     }}
     />
     :
     <Typography component={"h5"} variant={"h5"} >
     {profile.medications ? profile.medications : 'Not Provided'}

     </Typography>
     }
     </div>*/}
    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoTopItemMiddle}>
<div className={classes.healthInfoTopHalf} >
<Typography variant={'h6'} className={classes.healthInfoLabel} >
    Your Height
    <EditIcon
    onClick={() => toggleEdit('height')}
    style={{float:'right',marginRight:'20px'}}
/>
</Typography>
    {edit.height ?
<div className={classes.heightInputContainer}>

<div className={classes.heightInput}>
<TextField
    variant="outlined"
    name='feet'
    onKeyDown={keyPressHeight}
    error={error.height}
    className={classes.inputFieldTop}
    placeholder={0}
    value={profileFeet}
    onChange={(e) => setFeet(e.target.value)}
    inputProps={{style: { textAlign: 'right' }}}
    InputProps={{
        className: classes.input,
    }}
    helperText={error.height ? `Please enter your height in the format 5' 8"` : 'Hit the Enter key to save your text'}
    FormHelperTextProps={{
        className: classes.helperText
    }}
/>
<Typography className={classes.uom} variant={'body1'}>ft</Typography>
        </div>

        <div className={classes.heightInput}>
<TextField
    variant="outlined"
    name='inches'
    onKeyDown={keyPressHeight}
    error={error.height}
    className={classes.inputFieldTop}
    placeholder={0}
    value={profileInches}
    onChange={(e) => setInches(e.target.value)}
    inputProps={{style: { textAlign: 'right' }}}
    InputProps={{
        className: classes.input,
    }}
/>
<Typography className={classes.uom} variant={'body1'}>in
        </Typography>
        </div>

        </div>
:
<Typography component={"h3"} variant={"h3"} className={classes.healthInfoTopMain} >
    {profile.height ? parseHeight(profile.height) : 'Not Provided'}
</Typography>
}
</div>

    {/* <div className={classes.healthInfoTopBottomHalf}>
     <Typography variant={'h6'} className={classes.healthInfoLabel} >
     Allergies
     <EditIcon
     onClick={() => toggleEdit('allergies')}
     style={{float:'right',marginRight:'20px'}}
     />
     </Typography>
     {edit.allergies ?
     <TextField
     variant="outlined"
     name='allergies'
     onKeyDown={keyPress}
     defaultValue={profile.allergies}
     className={classes.inputField}
     InputProps={{
     className: classes.input,
     }}
     helperText='Hit the Enter key to save your text'
     FormHelperTextProps={{
     className: classes.helperText
     }}
     placeholder={'(e.g. pet dander, nuts)'}
     />
     :
     <Typography component={"h5"} variant={"h5"} >
     {profile.allergies ? profile.allergies : 'None Provided' }
     </Typography>
     }
     </div>*/}
    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoTopItemMiddle}>
<div className={classes.healthInfoTopHalf} >
<Typography variant={'h6'} className={classes.healthInfoLabel} >
    Your Weight
    <EditIcon
    onClick={() => toggleEdit('weight')}
    style={{float:'right',marginRight:'20px'}}
/>
</Typography>
    {edit.weight ?
<div className={classes.weightInputContainer}>
<TextField
    variant="outlined"
    name='weight'
    error={error.weight}
    className={classes.inputFieldTop}
    onKeyDown={keyPress}
    defaultValue={profile.weight}
    placeholder={'(e.g. 185)'}
    inputProps={{style: { textAlign: 'right' }}}
    InputProps={{
        className: classes.input,

    }}
    helperText={error.weight ? 'Please enter whole numbers only' : 'Hit the Enter key to save your text'}
    FormHelperTextProps={{
        className: classes.helperText
    }}
/>
<Typography className={classes.uom} variant={'body1'}>lbs
        </Typography>
        </div>
:
<Typography component={"h3"} variant={"h3"} className={classes.healthInfoTopMain} >
    {profile.weight ? profile.weight + ' lbs' : 'Not Provided' }
</Typography>
}
</div>

    {/*<div className={classes.healthInfoTopBottomHalf}>
     <Typography variant={'h6'} className={classes.healthInfoLabel} >
     Illness/Ailments
     <EditIcon
     onClick={() => toggleEdit('conditions')}
     style={{float:'right',marginRight:'20px'}}
     />
     </Typography>
     {edit.conditions ?
     <TextField
     variant="outlined"
     name='conditions'
     onKeyDown={keyPress}
     defaultValue={profile.conditions}
     className={classes.inputField}
     InputProps={{
     className: classes.input,
     }}
     helperText='Hit the Enter key to save your text'
     FormHelperTextProps={{
     className: classes.helperText
     }}
     placeholder={'(e.g. arthritis, herniated disc)'}
     />
     :
     <Typography component={"h5"} variant={"h5"} >
     {profile.conditions ? profile.conditions : 'None Provided'}
     </Typography>
     }
     </div>*/}
    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoTopItemMiddle}>
<div className={classes.healthInfoTopHalf} >
<Typography variant={'h6'} className={classes.healthInfoLabel} >
    Blood Type
    <EditIcon
    onClick={() => toggleEdit('bloodType')}
    style={{float:'right',marginRight:'20px'}}
/>
</Typography>
    {edit.bloodType ?
<FormControl variant="outlined" id='bloodType' className={classes.selector}>
<Select
    id="bloodType"
    defaultValue={profile.bloodType}
    className={classes.input}
    // value={values.gender}
    onChange={handleSelectorChange}
    onBlur={() => toggleEdit('bloodType')}
    name='bloodType'
        >
        {bloodTypes.map(type => <MenuItem value={type}>{type}</MenuItem>)}
</Select>
    </FormControl>
:
<Typography component={"h3"} variant={"h3"} className={classes.healthInfoTopMain} >
    {profile.bloodType || 'Not Provided'}
</Typography>
}
</div>

    {/*<div className={classes.healthInfoTopBottomHalf}>
     <Typography variant={'h6'} className={classes.healthInfoLabel} >
     Chronic Disease
     <EditIcon
     onClick={() => toggleEdit('diagnosis')}
     style={{float:'right',marginRight:'20px'}}
     />
     </Typography>
     {edit.diagnosis ?
     <TextField
     variant="outlined"
     name='diagnosis'
     onKeyDown={keyPress}
     defaultValue={profile.diagnosis}
     className={classes.inputField}
     placeholder={'(e.g. Heart Disease)'}
     InputProps={{
     className: classes.input,
     }}
     helperText='Hit the Enter key to save your text'
     FormHelperTextProps={{
     className: classes.helperText
     }}
     />
     :
     <Typography component={"h5"} variant={"h5"} >
     {profile.diagnosis ? profile.diagnosis : 'Not Provided'}
     </Typography>
     }
     </div>*/}
    </Grid>

    </Grid>
    </Grid>



    <Grid item xs className={classes.healthInfoBottom}>
<Grid container direction={'row'} className={classes.healthInfoMultipleItem} >

<Medication/>

    </Grid>
    <Grid container direction={'row'} className={classes.healthInfoMultipleItem} >

<AllergiesTable/>

    </Grid>


    <Grid container direction={'row'} className={classes.healthInfoMultipleItem} >


<ChronicTable/>

    </Grid>

    <Grid container direction={'row'} className={classes.healthInfoMultipleItem} >

<ProcedureTable/>

    </Grid>



    </Grid>

    <Grid item xs className={classes.healthInfoBottom}>
<Grid container direction={'row'}  >

        <Grid item xs={12} sm={6} md={3} className={classes.healthInfoBottomItem}>
<Typography variant={'h6'} className={classes.healthInfoLabel}>
    Primary Physician
    </Typography>
    <Typography component={"h5"} variant={"h5"} >
    {profile.careProvider ? profile.careProvider.name : 'Not Provided' }
</Typography><br/>
    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoBottomItem}>
<Typography variant={'h6'} className={classes.healthInfoLabel}>
    Physician Office Contact
    </Typography>
    <Typography component={"h5"} variant={"h5"} >
    {profile.careProvider && profile.careProvider.contact ? profile.careProvider.contact : 'Not Provided' }
</Typography><br/>
    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoBottomItem}>
<Typography variant={'h6'} className={classes.healthInfoLabel}>
    Health Network/ Insurer
    </Typography>

    <Typography component={"h5"} variant={"h5"}>
    {profile.networks.length > 0 ? profile.networks[0].name :  'Not Provided'}
</Typography>


    </Grid>

    <Grid item xs={12} sm={6} md={3} className={classes.healthInfoBottomItem}>
<Typography variant={'h6'} className={classes.healthInfoLabel}>
    Last Office Visit
    </Typography>
    <Typography component={"h5"} variant={"h5"} >
        {visitdate? visitdate : 'No Visit Details' }
        </Typography><br/>
        </Grid>

        </Grid>

        </Grid>
        </Grid>
)
}

export default HealthInfo