import React, {useState, useEffect, useContext} from 'react'
import {injectIntl} from 'react-intl'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {grey} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext} from "../context/user-context";
import {useHistory} from 'react-router-dom'
import getFullRecords, {source} from "../utils/fullRecords"
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorMessage from '../components/ErrorMessage';
import LinkIcon from '@material-ui/icons/Link';
import Filters from '../components/HealthJourney/Filters'
import JourneyItem from '../components/HealthJourney/JourneyItem'
import { isValid } from 'date-fns'

const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",

        },
        paper: {
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: "100%",
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            alignItems: "center",
            color: theme.palette.grey.dark,
        },
        subheader: {
            padding: theme.spacing(4, 0, 4),
            backgroundColor: theme.palette.grey.pale,
            marginBottom: theme.spacing(3),
        },
        container: {
            width: '90%',
            maxWidth: '75rem',
            margin: 'auto'
        },
        modalPaper: {
            width: '68%',
            backgroundColor: 'white',
            outline: 0,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            border: '0px'
        },
        title: {
            marginBottom: theme.spacing(1),
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '40px',
        },
        textInput: {
            backgroundColor: theme.palette.grey.contrastText,
        },
        bottomContainer: {
            paddingTop: theme.spacing(2),
            width: '90%',
            maxWidth: '75rem',
            margin: 'auto',
            paddingBottom: theme.spacing(6),
        },
        itemListContainer: {
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            minHeight: '50rem',
            [theme.breakpoints.down('xs')]: {
                borderLeftStyle: 'none',
            },
        },
        viewNotesButton: {
            marginRight: theme.spacing(3),
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
        },
        editNoteButton: {
            textTransform: 'none',
            marginRight: theme.spacing(2)
        },
        deleteNoteButton: {
            textTransform: 'none',
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            borderWidth: '2px',
            '&:hover': {
                color: theme.palette.error.dark,
                borderColor: theme.palette.error.dark,
                backgroundColor: theme.palette.error.light,
            }
        },
        addNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            marginRight: theme.spacing(2),
        },
        cancelAddNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            borderWidth: '2px',
            '&:hover': {
                borderWidth: '2px',
            }
        },
        listItem: {
            marginBottom: theme.spacing(4),
        },
        itemInfo: {
            height: '100%',
            borderBottomStyle: 'solid',
            paddingBottom: theme.spacing(4),
            borderBottomWidth: '1px',
            borderBottomColor: grey[500],
            paddingRight: theme.spacing(8),
            width: '85%'
        },
        itemName: {
            paddingBottom: theme.spacing(2)
        },
        itemDesc: {
            paddingBottom: theme.spacing(3)
        },
        itemList: {

        },
        loadingCircle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '600px',
            color: theme.palette.secondary.main,
        },
        itemsContainer: {
            marginLeft: theme.spacing(9),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(0),
            }
        },
        dateContainer: {
            [theme.breakpoints.down('xs')]: {
                borderBottomColor: theme.palette.grey.light,
                borderWidth: '1px',
                borderBottomStyle: 'solid',
            }
        },
        modalHeader: {
            width: '100%',
            height: theme.spacing(4),
            borderRadius: 0,
        },
        modalIcon: {
            float: 'right',
            color: theme.palette.secondary.main,
            margin: theme.spacing(1),
            fontSize: '36px',
        },
        modalBody: {
            padding: theme.spacing(6),
            color: theme.palette.grey.dark,
        },
        modalField: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            height: '100%'
        },
        noteViewBody: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(4),
        },
        date: {

        },
        selectedDate: {
            fontWeight: 'bold'
        },
        yearCollapseHeader: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            borderBottomStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '1px',
        },
        dateTitle: {
            color: grey[500],
        },
        yearItemList: {
            color: theme.palette.grey.dark,
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(1),
        },
        dateList: {
            // paddingLeft: theme.spacing(8),
        },
        datesLeft: {
            marginBottom: theme.spacing(6),
        },
        noNetworkContainer: {
            width: '100%',
            marginTop: '9.375rem',
            paddingBottom: '12.5rem'
        },
        noNetworkBox: {
            width: '100%',
            height: '31.25rem',
            background: 'linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        connectImage: {
            width: '30%',
            marginTop: '-6.25rem',
            [theme.breakpoints.down('xs')]: {
                width: '50%',
            }
        },
        connectText: {
            width: '60%',
            textAlign: 'center',
        },
        connectButton: {
            marginBottom: '3.125rem',
            width: '18.75rem',
            height: '3.75rem',
            fontSize: '1.125rem',
            [theme.breakpoints.down('sm')]: {
                width: '12rem',
                fontSize: '1rem',
            }
        },
        connectIcon: {
            marginRight: theme.spacing(1),
        },
        count: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(2)
        }
    }))

const HealthTimeline = ({intl}) => {
    const history = useHistory();
    const healthview = history.location.state ? history.location.state.healthstatview : "all"
    console.log("healthdata"+healthview);

    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [fullItems, setFullItems] = useState([])
    const [dates, setDates] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [selectedItem, setSelectedItem] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [noteId, setNoteId] = useState(0)
    const [search, setSearch] = useState('')
    const [openView, setOpenView] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedNote, setSelectedNote] = useState(false)
    const [profile, dispatch] = useContext(UserContext)
    const [loading, setLoading] = useState(profile.network ? true : false)
    const [errors, setErrors] = useState(!profile.networks.length > 0 ? {message: 'We do not currently have your EHR (Electronic Health Records).', color: 'primary', linkText: 'Click here to connect to your network.', connect: true} : false)
    const [status, setStatus] = useState(false)
    const [sort, setSort] = useState('newest')
    const [physNet, setPhysNet] = useState(profile.networks.map(network => {
        network.selected = true
    return network
}))
    const parts = profile.birthday ? profile.birthday.split('-') : null
    const [startDate, setStartDate] = useState(parts ? new Date(parts[0], parts[1]-1, parts[2]) : null)
    const [endDate, setEndDate] = useState(new Date())

    if(healthview === "Medication")
    {
        var item1 = "MedicationStatement" ;
        var item2 = "MedicationOrder"
    }
    const [sources, setSources] = useState({
        "Conditions": healthview ==="condition" || healthview === "all"?true:false,
        "Lab Results": healthview ==="DiagnosticReport" || healthview === "all"?true:false,
        "Prescriptions": healthview ==="prescription" || healthview === "all"?true:false,
        "Procedures": healthview ==="Procedure" || healthview === "all"?true:false,
        "Doctor Visits": healthview ==="Encounter" || healthview === "all"?true:false,
        "Medications": healthview ==="Medication" ||  healthview === "all"?true:false,
        "Observations": healthview ==="observation" || healthview === "all"?true:false,
    })
    const [offset, setOffset] = useState(1)
    const [visDates, setVisDates] = useState([])



    //const history = useHistory()

    const handleCloseError = () => {
        setErrors(false)
    }

    const handleLinkConnect = () => {
        history.push("/patient/healthcare/register")
    }

    const toggleSort = (value) => {
        setSort(value)
        filterList(search, value)
    }

    const handleChangePhys = (e) => {
        const newNetworks = [...physNet].map(item => {
           if (String(item.name) === e.target.name) {
            const newItem = {...item}
            newItem.selected = !item.selected
            return newItem
        } else {
            return item
        }
    })

        setPhysNet(newNetworks)
    }

    // Finds the date of the top visible item in the list of timeline items

    const addNote = () => {
        if (noteText) {
            const note = {
                text: noteText,
                id: noteId
            }
            setNoteId(noteId + 1)
            const newItems = items.map(item => {
                    if (item.resource.id === selectedItem.resource.id) {
                item.notes.push(note)
            }
            return item
        })
            setItems(newItems)
            setSelectedItem(false)
        }
        setNoteText('')
        setOpenAdd(false)
    }

    // Functions for opening and closing the note modals
    // const handleOpenAdd = (item) => {
    //     setSelectedItem(item)
    //     setOpenAdd(true);
    // };

    const handleCloseAdd = () => {
        setSelectedItem(false)
        setNoteText('')
        setOpenAdd(false);
    };

    // const handleOpenView = (item) => {
    //     setSelectedItem(item)
    //     setOpenView(true);
    // }

    const handleOpenEdit = (note) => {
        setOpenView(false)
        setSelectedNote(note)
        setNoteText(note.text)
        setOpenEdit(true)
    }

    const handleCloseEdit = () => {
        setSelectedNote(false)
        setSelectedItem(false)
        setNoteText('')
        setOpenEdit(false)
    }

    const handleCloseView = () => {
        setSelectedItem(false)
        setOpenView(false);
    };

    const handleEditNote = () => {
        const newNote = { id: selectedNote.id, text: noteText}
        const newItems = items.map(item => {
                if (item.resource.id === selectedItem.resource.id) {
            item.notes = item.notes.map(note => {
                    if (note.id === newNote.id) {
                note = newNote
            }
            return note
        })
        }
        return item
    })
        setNoteText('')
        setItems(newItems)
        setSelectedItem(items.find(item => item.resource.id === selectedItem.resource.id))
        setOpenEdit(false)
        setOpenView(true)
    }

    const deleteNote = (id) => {
        const newItems = items.map(item => {
                if (item.resource.id === selectedItem.resource.id) {
            item.notes = item.notes.filter(note => note.id !== id)
        }
        return item
    })
        setItems(newItems)
        setOpenView(false)
        setSelectedItem(false)
    }

    const handleCloseTimeOut = () => {
        source.cancel()
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    const handleChangeStartDate = (date) => {
        setStartDate(date)
        if (isValid(date)) {
            filterList(search, sort, date, endDate)
        }
    }

    const handleChangeEndDate = (date) => {
        setEndDate(date)
        if (isValid(date)) {
            filterList(search, sort, startDate, date)
        }
    }

    const handleChangeSources = (newSources) => {
        // alert("here"+newSources)
        setSources(newSources)
        // alert(JSON.stringify(newSources))
        filterList(search, sort, startDate, endDate, newSources)
    }

    const filterList = (string, sortNew = sort, start = startDate, end = endDate, source = sources) => {
        let itemList = fullItems.filter(item => {

                return (item.date.toLowerCase().includes(string.toLowerCase()) || item.desc.toLowerCase().includes(string.toLowerCase())) && source[item.iconType]
    })




        itemList = itemList.filter(item => {
                const date = new Date(item.date)
                return date >= start && (date <= end || !end)
            })
        if (sortNew === 'newest') {
            itemList.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else {
            itemList.sort((a, b) => new Date(a.date) - new Date(b.date))
        }

        const dateList = itemList.map(item => {
                return item.date
            })

        const uniqueDates = [...new Set(dateList)]
        setDates(uniqueDates)
        setOffset(1)
        setVisDates(uniqueDates.slice(0, 5))



        const itemObject = {}
        uniqueDates.forEach(date => {
            const localItems = itemList.filter(item => item.date === date)
        const store = localItems.map(item => item.dr).filter(dr => !!dr)
        const frequency = {}
        let max = 0
        //let doctor = 'Unrecorded Practitioner'
        let doctor = ''
        for(var v in store) {
            frequency[store[v]]=(frequency[store[v]] || 0)+1
            if(frequency[store[v]] > max) {
                max = frequency[store[v]]
                doctor = store[v]
            }
        }
        itemObject[date] = {
            items: localItems,
            doctor: doctor
        }
    })

        setItems(itemObject)


    }



    const handleSearch = (e) => {
        setSearch(e.target.value)
        filterList(e.target.value)
    }

    const loadMore = () => {
        setOffset(offset + 1)
        setVisDates(dates.slice(0, (offset + 1)*5))
    }


    useEffect(() => {

        if (!errors) {

        let statusTimer = setTimeout(() => setStatus({message: 'Gathering your health information is taking longer than expected, please be patient.', type:'timeOut', linkText: 'Click here to stop the process.'}), 5000)
        getFullRecords(profile.patientID)
            .then(resources => {
            const items = [...resources.procedures, ...resources.office_visits, ...resources.lab_tests, ...resources.conditions, ...resources.medications, ...resources.observations, ...resources.generics, ...resources.family_medical_history, ...resources.allergies]
        console.log("lab testr"+items[2]);
        /*var list;
         if(healthview==="medication")
         list = items[4];
         else if(healthview ==="observation")
         list = items[5];
         else if(healthview ==="condition")
         list = items[3];
         else if(healthview ==="labtest")
         list = items[2];
         else if(healthview ==="procedure")
         list = items[0];
         else if(healthview ==="visit")
         list = items[1];

         else list = items;*/




        const list = items || []


        let stack = []
        let itemList = list.map(item => {
                let date
                let desc = ''
                let iconType
                let dr = ''
                let reference = ''
                let valueQuantity = ''
                let value = ''
                let category = ''
                // filters out items entered in error, as well as family member relationships with no underlying condition
                if (( item.status && item.status === "entered-in-error")) {
            console.log('Unhandled resource type')
            console.log(item)
            return undefined
        }

        const observation = [...resources.observations];

        //alert("array"+observation[0].id)

        date = new Date(item.date)


        // unifies the data we are getting, and attempts to handle as many data types as possible
        // this code block really isn't pretty, but it's got a great personality
        try {
            switch (item.resource_type) {
                case 'Bundle':
                    item.entry.forEach(entry => stack.push(entry.resource))
                    return undefined
                case 'AllergyIntolerance':
                    iconType = 'Conditions'
                    desc = `Allergic/Intolerant to ${item.name.toLowerCase()}`
                    break
                case 'Procedure':
                    desc = 'Procedure for ' + item.name
                    iconType = 'Procedures'
                    break
                case 'Condition':
                    desc = item.name
                    dr = item.recorder ? item.recorder.display : item.asserter ? item.asserter.display : ''
                    iconType = 'Conditions'
                    break
                case 'DiagnosticReport':
                    desc = 'Diagnostic Report for ' + item.code
                    console.log("sugi"+desc)
                    iconType = 'Lab Results'
                    var name = "Observation"

                    if(item.result === null)  {
                        reference = "unknown"
                        valueQuantity = "unknown"
                        value = "unknown"
                        category = "unknown"

                    }


                    else if(item.result.length>0) {

                        for (var i = 0; i < item.result.length; i++) {

                            //alert(JSON.stringify(item.result.length))

                            var ref = item.result[i].reference
                            //var ref = data
                            //ref = ref.substring(12);

                            //alert("id" + ref)

                            for (var j = 0; j < observation.length; j++) {

                                if (ref.includes(observation[j].id)) {

                                    //console.log("susu" + JSON.stringify(observation[j].valueQuantity.value))
                                    reference = observation[j].reference_range
                                    valueQuantity = observation[j].valueQuantity
                                    value = observation[j].value
                                    category = observation[j].category

                                }
                                //else {
                                // }

                                //alert("sugi"+item.resource_type)
                                //}
                                //for(var i=0;i<item.result.length;i++) {
                                //alert("refet"+JSON.stringify(item.result[i].reference))
                                //item.val = val
                                item.result[i].category = category
                                item.result[i].reference = reference
                                item.result[i].valueQuantity = valueQuantity
                                item.result[i].value = value


                            }

                        }
                    }





                    //{item.result.map((refer) =>
                    break
                case 'FamilyMemberHistory':
                    desc = 'Family history reported: ' + item.condition[0].code.text
                    iconType = 'Conditions'
                    break
                case 'Encounter':
                    desc = item.name
                    iconType = 'Doctor Visits'
                    break
                case 'AdverseEvent':
                    desc = item.event.text
                    iconType = 'Conditions'
                    break
                case 'DetectedIssue':
                    desc = item.mitigation[0].action.text
                    iconType = 'Conditions'
                    break
                case 'Immunization':
                    if (item.data) {
                        desc = item.data + ' vaccine given'
                        iconType = 'Medications'
                    } else {
                        return undefined
                    }
                    break
                case 'MedicationStatement':
                    desc = 'Medication reported for ' + item.name
                    iconType = 'Medications'
                    break

                case 'MedicationOrder':
                    desc = 'Medication reported for ' + item.name
                    iconType = 'Medications'
                    break

                case 'MedicationAdministration':
                    desc = 'Medication administerd'
                    iconType = 'Medications'
                    break
                case 'MedicationRequest':
                    desc = 'Prescribed Medicine'
                    iconType = 'Prescriptions'
                    dr = item.requester.display
                    break
                case "ClinicalImpression":
                    desc = item.summary
                    iconType = 'Conditions'
                    break
                case "Observation":
                    desc = 'Observation' + String(item.code ? `: ${item.code}` : item.category  ?  `: ${item.category}` : '')
                    dr = item.performer
                    iconType = 'Observations'
                    break
                default:
                    console.log('Resource type unsupported')
                    console.log(item)
                    return undefined
            }
            // console.log(`About to break: ${date}`)



            const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' })
            const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
            item.date = `${month} ${day}, ${year}`
            item.year = year
            item.month = month
            item.dr = dr
            item.desc = desc
            item.iconType = iconType


            /*for(var i=0;i<item.result.length;i++) {
             //alert("refet"+JSON.stringify(item.result[i].reference))
             //item.val = val
             item.result[i].reference = val
             }*/
            item.notes = []
        } catch {
            console.log('There was a problem handeling this item')
            console.log(item)
            return undefined
        }


        return item
    })
        stack.forEach(item => {
            try {

            } catch {
                console.log('There was a problem handeling this item')
            console.log(item)
    }
    })
        // filter out items we couldn't handle
        itemList = itemList.filter(item => !!item)
        itemList.sort((a, b) => new Date(b.date) - new Date(a.date))

        var dateList;

        if(healthview === "all") {

            dateList = itemList.map(item => {

                    //if(item.resource_type === healthview)
                    return item.date
                }
        )

        }

        else {

            var localItems = itemList.filter(item => item.resource_type === healthview || item.resource_type === item1 || item.resource_type === item2)

            // alert(JSON.stringify(localItems.length))

            dateList = localItems.map(item => {

                    //if(item.resource_type === healthview)
                    return item.date
                }
        )

            //  alert("date"+JSON.stringify(dateList))



        }


        /* var localitems=[];
         if(healthview==="all")
         {

         itemList = itemList.filter(item => item.resource_type === healthview)
         itemList.sort((a, b) => new Date(b.date) - new Date(a.date))
         localitems = itemList.map(item => {
         return item.date
         })
         }
         else
         {

         itemList = itemList.filter(item => !!item)
         itemList.sort((a, b) => new Date(b.date) - new Date(a.date))
         localitems = itemList.map(item => {
         return item.date
         })

         }
         const dateList=localitems;


         itemList = itemList.filter(item => !!item)
         itemList.sort((a, b) => new Date(b.date) - new Date(a.date))
         const dateList = itemList.map(item => {
         return item.date
         })*/




        const uniqueDates = [...new Set(dateList)]
        setDates(uniqueDates)
        setVisDates(uniqueDates.slice(0, 5))



        let doctorsList = itemList.map(item => item.dr).filter(dr => !!dr)
        doctorsList = [...new Set(doctorsList)].map(dr => {
            return {
                name: dr,

                id: dr,
                selected: true
            }
        })

        setPhysNet([...profile.networks.map(network => {
            network.selected = true
        return network
    }), ...doctorsList])

        //alert("helat"+healthview)

        const itemObject = {}
        uniqueDates.forEach(date => {

            // if(healthview === "all")
            var localItems = itemList.filter(item => item.date === date && item.resource_type === healthview || healthview === "all" || item.resource_type === item1 || item.resource_type === item2)
        // else
        // var localItems = itemList.filter(item => item.resource_type === healthview)

        const store = localItems.map(item => item.dr).filter(dr => !!dr)
        const frequency = {}
        let max = 0
        //let doctor = 'Unrecorded Practitioner'
        let doctor = ''
        for(var v in store) {
            frequency[store[v]]=(frequency[store[v]] || 0)+1
            if(frequency[store[v]] > max) {
                max = frequency[store[v]]
                doctor = store[v]
            }
        }
        // setSources({"Conditions":false,"Lab Results":false,"Prescriptions":false,"Procedures":true,"Doctor Visits":false,"Medications":false,"Observations":false})

        //filterList(search, sort, startDate, endDate, sources)
        //alert(JSON.stringify(localItems));

        itemObject[date] = {
            items: localItems,
            doctor: doctor
        }
    })

        setItems(itemObject)
        setFullItems(itemList)

    })
    .catch((error) => {
            if (error.response && error.response.data === 'Token is expired') {
            console.log('Token is expired')
            dispatch(({type: 'token expired'}))
            history.push("/signin", {ongevRoute: "/health-timeline"})
        }
        console.log('Error ', error)
        setErrors({message: 'Unable to get your health information.', linkText: 'Click here to try again'})
    })
    .finally(() => {
            clearTimeout(statusTimer)
            setStatus(false)
        setLoading(false)
    })

    }
}, [ profile, dispatch, errors, history ])



    return (
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
<Paper className={clsx(classes.paper)} elevation={6}>
        <div className={classes.subheader}>
<div className={classes.container}>
<Typography component={"h1"} variant={"h1"} className={classes.title}>
    Your Health Journey
    </Typography>
    {profile.networks.length > 0 ?
<TextField
    title="Search"
    variant="outlined"
    className={classes.textInput}
    fullWidth
    value={search}
    onChange={handleSearch}
    placeholder={'Search for something specific in your records'}
    InputProps={{
        startAdornment:
            <InputAdornment position={"start"} >
            <SearchIcon className={classes.icons}/>
        </InputAdornment>,
            style: {
            fontSize: '24px'
        },

        endAdornment:
        <InputAdornment position="end">
            <CloseIcon className={classes.icons}  onClick={() => setSearch("")}/>

            </InputAdornment>

        }}
/>
: null
}
</div>
    </div>

    <Modal
    open={openAdd}
    onClose={handleCloseAdd}
    disableEnforceFocus={true}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon><CloseIcon className={classes.modalIcon} onClick={handleCloseAdd}/></Icon>
        </div>
        <div className={classes.modalBody}>
<Typography component={"h5"} variant={"h5"}>
        Add note to your {selectedItem.date} visit:
        </Typography>
    <TextField
    fullWidth
    className={classes.modalField}
    multiline
    variant="outlined"
    placeholder='Write your thoughts, needs, insights from this visit here.'
    rows={6}
    value={noteText}
    onChange={(e) => setNoteText(e.target.value)}/>
<Button
    type={"button"}
    variant='contained'
    color='secondary'
    className={classes.addNotesButton}
    startIcon={<SaveIcon/>}
    onClick={() => addNote()}
>
    Save Note
    </Button>
    <Button
    type={"button"}
    variant='outlined'
    color='primary'
    className={classes.cancelAddNotesButton}
    startIcon={<CancelIcon/>}
    onClick={handleCloseAdd}
        >
        Cancel
        </Button>
        </div>
        </div>
        </Modal>

        <Modal
    disableEnforceFocus
    open={openEdit}
    onClose={handleCloseEdit}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon><CloseIcon className={classes.modalIcon} onClick={handleCloseEdit}/></Icon>
        </div>
        <div className={classes.modalBody}>
<Typography component={"h5"} variant={"h5"}>
        Your note from {selectedItem.date} visit:
        </Typography>
    <TextField
    fullWidth
    className={classes.modalField}
    multiline
    variant="outlined"
    rows={6}
    value={noteText}
    onChange={(e) => setNoteText(e.target.value)}/>
<Button
    type={"button"}
    variant='contained'
    color='secondary'
    className={classes.addNotesButton}
    startIcon={<SaveIcon/>}
    onClick={() => handleEditNote()}
>
    Save Note
    </Button>
    <Button
    type={"button"}
    variant='outlined'
    color='primary'
    className={classes.cancelAddNotesButton}
    startIcon={<CancelIcon/>}
    onClick={handleCloseEdit}
        >
        Cancel
        </Button>
        </div>
        </div>
        </Modal>

        <Modal
    disableEnforceFocus
    open={openView}
    onClose={handleCloseView}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon><CloseIcon className={classes.modalIcon} onClick={handleCloseView}/></Icon>
        </div>
        <div className={classes.modalBody}>
<Typography component={"h5"} variant={"h5"}>
        Notes From: {selectedItem.date}
</Typography>
    {selectedItem ? selectedItem.notes.map(note => {
        return <>
    <Typography component={'p'} className={classes.noteViewBody}>
    {note.text}
</Typography>
    <div className={classes.noteButtons}>
<Button
    type={"button"}
    variant="outlined"
    className={classes.editNoteButton}
    color="secondary"
    startIcon={<CreateIcon/>}
    onClick={() => handleOpenEdit(note)}
>
    Edit Note
    </Button>
    <Button
    type={"button"}
    variant="outlined"
    className={classes.deleteNoteButton}
    startIcon={<HighlightOffOutlinedIcon/>}
    onClick={() => deleteNote(note.id)}
>
    Delete Note
    </Button>
    </div>
    </>
}) : null}
</div>
    </div>
    </Modal>
    {profile.networks.length > 0 ?

        loading || fullItems.length > 0 ?
            (errors && errors.message === 'Unable to get your health information.' && errors.message ==='disabled') ?
                null
                :
<Grid container direction={"row"} className={classes.bottomContainer}>
<ErrorMessage errors={errors} color={errors.color} handleClose={handleCloseError} handleLink={!errors.connect ? handleRefresh : handleLinkConnect}/>
<Grid item sm={3} xs={12} className={classes.dateContainer}>
<Filters
    sort={sort}
    setSort={toggleSort}
    physNet={physNet}
    handleChangePhys={handleChangePhys}
    startDate={startDate}
    endDate={endDate}
    setStartDate={handleChangeStartDate}
    setEndDate={handleChangeEndDate}
    sources={sources}
    setSources={handleChangeSources}
        />
        </Grid>
        <Grid item sm={9} xs={12} className={classes.itemListContainer}>
    {loading ? <>
        {status ? <ErrorMessage errors={status} color='primary' handleClose={() => setStatus(false)} handleLink={handleCloseTimeOut}/> : null}
    <div className={classes.loadingCircle}>
    <CircularProgress color='secondary' hidden={errors.color === 'primary'} size={150}/>
        </div>
        </>
    :
    <div className={classes.itemsContainer}>
    <div className={classes.count}>
    <Typography variant='h5' style={{lineHeight: '50px'}}>
        {dates.length + ' Results'}
    </Typography>
    <Typography variant='h5' style={{lineHeight: '50px', fontSize: '14px'}}>
        {'Showing 1-' + String((offset * 5) <= dates.length ? offset * 5 : dates.length)}
    </Typography>
    </div>
    <div className={classes.itemList}>
        {visDates.length===0?<Typography variant='h5' style={{lineHeight: '50px', fontSize: '24px'}}>
            Did not match with any records. Please search with proper keyword
        </Typography>:visDates.map(date => <JourneyItem key={date} date={date} doctor={items[date].doctor} items={items[date].items}/>)}
    </div>
    {(offset * 5) < dates.length ?
    <Button
        fullWidth
        color='primary'
        variant='outlined'
        onClick={loadMore}>
            Load More Health Journey
    </Button>
    : null}
    </div>
    }

</Grid>
    </Grid>
:
<div className={classes.container}>
<div className={classes.noNetworkContainer}>
<div className={classes.noNetworkBox}>
<img src={"/error-icons/image_health-history.png"} className={classes.connectImage} alt='connect network'/>
        <Typography variant='h3' className={classes.connectText}>
    Unable to get your health history from your currently connected networks. Please connect another network with you health history.
    </Typography>
    <Button
    className={classes.connectButton}
    color='primary'
    variant='contained'
    onClick={() => history.push("/patient/healthcare/register")}>
<LinkIcon className={classes.connectIcon}/>
    Connect Now!
    </Button>
    </div>
    </div>

    </div> :
<div className={classes.container}>
<div className={classes.noNetworkContainer}>
<div className={classes.noNetworkBox}>
<img src={"/error-icons/image_health-history.png"} className={classes.connectImage} alt='connect network'/>
        <Typography variant='h3' className={classes.connectText}>
    You will need to connect to your health network in order to view your health history.
    </Typography>
    <Button
    className={classes.connectButton}
    color='primary'
    variant='contained'
    onClick={() => history.push("/patient/healthcare/register")}>
<LinkIcon className={classes.connectIcon}/>
    Connect Now!
    </Button>
    </div>
    </div>

    </div>
}

</Paper>
    </Page>
)
}

export default injectIntl(HealthTimeline)