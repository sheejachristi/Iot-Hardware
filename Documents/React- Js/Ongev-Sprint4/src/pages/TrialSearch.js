import { useState, useEffect, useContext, useRef } from "react";
import * as React from "react";
import { injectIntl } from "react-intl";
import MaterialTable from "material-table";
import Page from "./Page";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, InputBase } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import clsx from "clsx";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "../context/user-context";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import ErrorMessage from "../components/ErrorMessage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/Cancel";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NoConnectionError from "../components/NoConnectionError";
import Modal from '@material-ui/core/Modal';
import { relativeTimeRounding } from "moment";
import Autocomplete from '@material-ui/lab/Autocomplete';

// Styles

const useStyles = makeStyles((theme) => ({
        // Page level styling
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",
        },
        paper: {
            paddingTop: theme.spacing(4),
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: theme.palette.grey.pale,
            alignItems: "center",
            color: theme.palette.grey.dark,
        },
        container: {
            maxWidth: "75rem",
            width: "90%",
            margin: "auto",
            paddingTop: theme.spacing(3),
        },

        searchBars: {
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: theme.spacing(2),
            marginTop: "0px",
            flexWrap: "wrap"
        },
        diagnosisontainer: {
            padding: '0px 0px 0px 10px',

            marginRight:'5px'

        },
        modalContainer: {

            width: '50%',
            padding: '0px 10px',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.dark,

            marginBottom: theme.spacing(2),

            display: 'flex',
            flexDirection: 'row',

            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        searchContainer: {
            width: "48%",
        },
        searchContainer1: {
            padding: '0px 10px',
            width: "90%",
        },
        popupAlert: {
            //width: '50%',

            color: theme.palette.primary.dark,
            padding: theme.spacing(2, 0),
            //marginBottom: theme.spacing(4),
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        addNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            margin: '10px',

        },
        cancelAddNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            borderWidth: '2px',
            '&:hover': {
                borderWidth: '2px',
            }
        },
        popupButton: {
            //[theme.breakpoints.down('xs')]: {
            width: '30%',
            height:'50px',
            margin:'20px'

            //},
        },
        modalButton: {


            width: '80%',



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
            padding: theme.spacing(4),
            color: theme.palette.grey.dark,
        },
        modalField: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            height: '100%'
        },
        modalPaper: {
            width: '68%',
            backgroundColor: 'white',
            outline: 0,
            overflow:'scroll',
        },
        modalFooter: {
            margin: '0px 0px 15px 110px',
            width: '30px',
            // padding: theme.spacing(2),
            color: theme.palette.grey.dark,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            border: '0px',
            overflow:'scroll',
            width:'100%',
            height:'auto',
            padding:'50px',
            marginTop:'100px'
        },
        searchField: {
            backgroundColor: theme.palette.grey.contrastText,
            marginLeft: '20px'
        },
        diagnosisField: {
            backgroundColor: theme.palette.grey.contrastText,
        },
        diagnosisSelect: {
            backgroundColor: theme.palette.grey.contrastText,
            paddingRight: '150px'
        },
        input: {
            color: `${theme.palette.secondary.main}`,
        },
        notchedOutline: {
            borderColor: `${theme.palette.secondary.main} !important`,
        },
        title: {
            marginBottom: theme.spacing(3),
        },
        bottomContainer: {
            backgroundColor: theme.palette.grey.contrastText,
            paddingTop: theme.spacing(2),
            width: "100%",
        },
        trialsContainer: {
            borderLeftStyle: "solid",
            borderLeftWidth: "2px",
            borderColor: theme.palette.grey.light,
            [theme.breakpoints.down("xs")]: {
                borderLeftStyle: "none",
            },
        },
        filterContainer: {
            width: "80%",
        },
        filterTitle: {
            marginBottom: theme.spacing(2),
        },
        searchTitle: {
            marginTop: theme.spacing(2),
        },
        zipcodeField: {
            paddingTop: 0,
            marginTop: 0,
            marginBottom: theme.spacing(2),
            height: "50px",
        },
        sliderLabels: {
            display: "flex",
            justifyContent: "space-between",
            color: theme.palette.grey.main,
        },
        slider: {
            paddingBottom: theme.spacing(2),
            "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                marginTop: -8,
                marginLeft: -12,
            },
            "& .MuiSlider-rail": {
                height: 8,
                borderRadius: 4,
            },
            "& .MuiSlider-track": {
                height: 8,
                borderRadius: 4,
            },
            "& .MuiSlider-valueLabel": {
                left: "calc(-50% + 8px)",
            },
        },
        statusContainer: {
            paddingTop: theme.spacing(2),
            marginTop: theme.spacing(2),
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderColor: theme.palette.grey.light,
            borderWidth: "2px",
            paddingBottom: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
        },
        learnButton: {
            marginRight: theme.spacing(3),
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            textTransform: "none",
        },
        saveButton: {
            marginRight: theme.spacing(2),
        },
        trialListItem: {
            marginBottom: theme.spacing(4),
        },
        trialInfo: {
            height: "100%",
            borderBottomStyle: "solid",
            paddingBottom: theme.spacing(4),
            borderBottomWidth: "1px",
            borderBottomColor: theme.palette.grey.main,
            width: "90%",
        },
        trialDesc: {
            paddingBottom: theme.spacing(2),
        },
        trialList: {
            // overflowY: 'auto',
            // height: '600px',
            // width: '95%',
        },
        trialAvatar: {
            textAlign: "center",
            maxWidth: "100%",
            width: "100px",
            height: "100px",
        },
        avatarContainer: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        },
        loadingCircle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
            flexDirection: "column",
        },
        connectContainer: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            justify: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: theme.spacing(3),
            fontWeight: "bold",
            marginBottom: theme.spacing(3),
        },
        trialInfoContainer: {
            backgroundColor: theme.palette.grey.contrastText,
            paddingTop: theme.spacing(4),
        },
        trialInfoFull: {
            width: "70%",
            borderLeftStyle: "solid",
            borderWidth: "2px",
            borderColor: theme.palette.grey.light,
            marginBottom: theme.spacing(30),
            paddingLeft: theme.spacing(8),
        },
        containerTitle: {
            paddingLeft: theme.spacing(10),
            marginBottom: theme.spacing(6),
        },
        trialInfoTitleContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        trialName: {
            width: "70%",
        },
        status: {
            color: theme.palette.secondary.main,
        },
        trialSubContainer: {
            display: "flex",
            flexDirection: "row",
        },
        trialSubTitle: {
            width: "20%",
        },
        trialSubInfo: {
            width: "80%",
        },
        trialArticleTitleContainer: {
            padding: theme.spacing(5, 10),
            backgroundColor: theme.palette.grey.pale,
        },
        trialFullButtons: {
            width: "50%",
            margin: "auto",
        },
        listHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(6),
        },

        //Error messages styling

        connectButton: {
            marginBottom: "3.125rem",
            width: "18.75rem",
            height: "3.75rem",
            fontSize: "1.125rem",
            [theme.breakpoints.down("sm")]: {
                width: "12rem",
                fontSize: "1rem",
            },
        },
        noResultsButton: {
            marginBottom: "3.125rem",
            width: "18.75rem",
            height: "3.75rem",
            fontSize: "1.125rem",
            [theme.breakpoints.down("sm")]: {
                width: "12rem",
                fontSize: "1rem",
            },
        },
        connectIcon: {
            marginRight: theme.spacing(1),
        },
        noDiagContainer: {
            width: "100%",
            marginTop: "9.375rem",
            paddingBottom: "12.5rem",
        },
        noResultsContainer: {
            width: "90%",
            margin: "auto",
            marginTop: "4.375rem",
            paddingBottom: "12.5rem",
        },
        noDiagBox: {
            width: "100%",
            height: "33.75rem",
            background:
                "linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
        },
        noResultsBox: {
            width: "100%",
            height: "18.75rem",
            background:
                "linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
        },
        connectText: {
            width: "65%",
            textAlign: "center",
            lineHeight: "2.25rem",
        },
        noResultsText: {
            width: "65%",
            textAlign: "center",
            lineHeight: "2.25rem",
            marginTop: "2rem",
        },
        connectImage: {
            width: "30%",
            marginTop: "-6.25rem",
            [theme.breakpoints.down("xs")]: {
                width: "50%",
            },

        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        margin: {
            padding: '0px 10px',
            width: '96%',

        },
    }));
const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            minHeight: '0.1876em',
            position: 'relative',
            marginTop: '10px',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: '1.5rem',
            padding: '28px 20px 15px 40px',
            //transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: 'Roboto Light,sans-serif',
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);

const TrialSearch = ({ intl }) => {
    const history = useHistory();
    const refsObject = useRef({});

    const [profile, dispatch] = useContext(UserContext);

    const classes = useStyles();

    const [trials, setTrials] = useState([]);
    const [offset, setOffset] = useState(1);
    const [fullList, setFullList] = useState([]);
    const [chronicArray, setChronicArray] = useState([])
    const cleanVitalsKey = (key) => {
        const keys = key.split('-')
        if (keys.length === 1) {
            return key
        }
        const first = keys.shift()
        return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
    }
    //const diagOne = profile.diagnosis ? localStorage.getItem('diagone') : "";
    const [diagOne, setDiagOne] = useState(profile.diagnosis ? profile.diagnosis[0] ? profile.diagnosis[0].condition_name : "" : "");


    //alert("diag"+localStorage.getItem('diagone'))
    const [chronicOne, setChronicOne] = useState("");
    const [diagTwo, setDiagTwo] = useState("");
    const [otherSearch, setOtherSearch] = useState("");
    const [zipcode, setZipcode] = useState(
        profile.zipcode ? profile.zipcode : ""
    );
    const [loading, setLoading] = useState(false);
    const [distance, setDistance] = useState(225);
    const [unfilteredList, setUnfilteredList] = useState([]);
    const [zipcodeRange, setZipcodeRange] = useState(false);
    const [openAdd, setOpenAdd] = useState(false)

    let abcd = [];
    const [filter, setFilter] = useState({
        Active: true,
        "Not yet recruiting": false,
        Recruiting: true,
        // Suspended: false,
        // Completed: false,
        // Withdrawn: false,
    });
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    const [checkedFhirItems, setCheckedFhirItems] = useState({});
    const [searchLength,setSearchLength]=useState(true);

    const mostCommonDiagn = ['Medication', 'Treatment']
    const [conditionName, setConditionName] = useState([]);

    const [country, setCountry] = useState("")
    const [countryCheck, setCountryCheck] = useState(false)


    const [resultArray, setResultArray] = useState([]);
    let [manualsearchterms, setManualsearchterms] = useState([]);
    let [searchterms, setSearchterms] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const selectedItem = history.location.state
        ? history.location.state.item
        : false;
    const lastID = history.location.state ? history.location.state.lastID : false;

    let searchString1 = ""

    if (diagOne)
        searchString1 = diagOne.trim().split(" ").join("+");
    if (diagTwo) {
        searchString1 = searchString1 + "+" + diagTwo.trim().split(" ").join("+");
    }
    const [url, setUrl] = useState(
        process.env.REACT_APP_ONGEV_API_BASEURL +
        "/api/" +
        process.env.REACT_APP_ONGEV_API_VERSION +
        "/patient/" +
        profile.uid +
        "/services/clinical-trials"
    );
    const [errors, setErrors] = useState(
        // !profile.network || !profile.network.name
        //jira:-265
        !profile.networks
            ? {
            message:
                "In order to retrieve more accurate matches, we recommend that you connect to your EHR (electronic health records).",
            linkText: "Click here to connect now",
            color: "primary",
        }
            : false
    );
    const [searchErrors, setSearchErrors] = useState();

    const handleCloseError = () => {
        setErrors(false);
    };

    const stopSearch = () => {
        setDiagTwo("")
        setLoading(false)
        setSearchErrors(false);
        //setSearchErrors({ message: "erropr", color: "error" });
        setUnfilteredList([]);
        setTrials([]);
        setFullList([]);


    }

    const zxc=(e)=>{

    }

    const handleFilterChange = (event) => {
        const newFilter = { ...filter, [event.target.name]: event.target.checked };
        setFilter(newFilter);

        filterList(newFilter, zipcodeRange, distance);
    };

    const filterList = (filter, zipcodeRange, distance,country) => {
        let range = zipcodeRange
            ? zipcodeRange.filter((item) => item.distance <= distance)
    : null;
        setFullList(
            unfilteredList.filter((item) => {

        return (

            filter[item.OverallStatus] &&
            (zipcodeRange && distance < 225
                ? item.zipcodes &&
            item.zipcodes.some((zipcode) =>
            range.map((item) => item.zip_code).includes(zipcode)
        )
    : true)
    );
    })
    );
        setOffset(1);
        setTrials(
            unfilteredList
                .filter((item) => {
                return (
                    filter[item.OverallStatus] &&
            (zipcodeRange && distance < 225
                ? item.zipcodes &&
            item.zipcodes.some((zipcode) =>
            range.map((item) => item.zip_code).includes(zipcode)
        )
    : true)
    );
    })
    .slice(0, 10)
    );
    };


    const handleChangeFhirCondition = (event) => {


        for (var i = 0; i < manualsearchterms.search_terms.terms.length; i++) {

            if (manualsearchterms.search_terms.terms[i].term === event.target.name && manualsearchterms.search_terms.terms[i].selected === false) {
                manualsearchterms.search_terms.terms[i].selected = true


                //setRecords([...records, {key: event.target.name, name:event.target.name, selected:true}]);

            }

            else if (manualsearchterms.search_terms.terms[i].term === event.target.name && manualsearchterms.search_terms.terms[i].selected === true) manualsearchterms.search_terms.terms[i].selected = false


        }






        setCheckedFhirItems({ ...checkedFhirItems, [event.target.name]: event.target.checked });




    }

    const [checkvalues, setCheckvalues] = useState([]);

    const resetFilter = () => {
        setFilter({
            Active: true,
            "Not yet recruiting": false,
            Recruiting: true,
            Suspended: false,
            Completed: false,
            Withdrawn: false,
        });
        setDistance(225);
        setFullList(
            unfilteredList.filter((trial) => {
                return (
                    trial.OverallStatus === "Active" ||
            trial.OverallStatus === "Recruiting"
        );
    })
    );
        setTrials(
            unfilteredList
                .filter((trial) => {
                return (
                    trial.OverallStatus === "Active" ||
            trial.OverallStatus === "Recruiting"
        );
    })
    .slice(0, 10)
    );
    };

    // Builds the url value for searching for trial. A useEvent hook watches for changes in the url variable and runs automatically
    const buildUrl = () => {

        let searchString = '';
        if (diagTwo) {
            //setOtherSearch("");
            searchString = diagTwo.trim().split(" ").join("+");
        }
        else if (otherSearch) {
            // setDiagTwo("");
            searchString = otherSearch.trim().split(" ").join("+");
        }
        setUrl(
            process.env.REACT_APP_ONGEV_API_BASEURL +
            "/api/" +
            process.env.REACT_APP_ONGEV_API_VERSION +
            "/patient/" +
            profile.uid +
            "/services/clinical-trials"
        );
        CTSearch();
    };

    const CTSearch=(value,search)=>{


        // const source = axios.CancelToken.source();
        let abc = [];

        /* for(var i=0;i<profile.diagnosis.length;i++){
         abc[i]=profile.diagnosis[i].chronicname;

         }*/


        setLoading(true);
        setOffset(1);

        //alert(JSON.stringify(filter))

        //{"Active":true,"Not yet recruiting":false,"Recruiting":true}

        let statusarray=[];
        if(filter["Recruiting"])
        {
            statusarray.push("Recruiting");
        }
        if(filter["Not yet recruiting"])
        {
            statusarray.push("Not yet recruiting");
        }
        if(filter["Active"])
        {
            statusarray.push("Active");
        }

        let data;

        data = {
            diagnosis: value,
            additionalSearchText: search,
            postalcode: zipcode ? zipcode : "90210",
            distance: distance,
            country:country,
            gender: profile.gender ? profile.gender : "Male",
            age: profile.age ? profile.age : 45,
            status:statusarray

        };


        axios
            .post(url,data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                },
                //cancelToken: source.token,
            })
            .then((response) => {
            if (response.data.fullTrials.length > 0) {
            // cleans up the location data for the results, and gets rid of duplicate locations
            // If there are multiple locations, it changes the location variable to a variation on 'Multiple locations in...'
            // Would be better if the response from the API eliminated duplicate locations itself, and the multiple locations where paired together in some way
            const list = response.data.fullTrials.map((trial) => {
                    // alert(JSON.stringify(trial))
                    const {
                        LocationFacility,
                        LocationCity,
                        LocationState,
                        LocationCountry,
                    } = trial;

            //alert("here"+LocationCity)
            if (LocationCity.split(", ").length > 1) {
                let uniqContries = [...new Set(LocationCountry.split(", "))];
                let countries;
                if (uniqContries.length === 1) {
                    countries = uniqContries[0];
                } else {
                    const lastCountry = uniqContries.pop();
                    uniqContries = uniqContries.join(", ");
                    countries = [uniqContries, lastCountry].join(", and ");
                }
                trial.location = `Multiple locations in ${countries}`;
                trial.zipcodes = trial.LocationZip
                    ? trial.LocationZip.split(", ")
                    : null;
                return trial;
            } else {
                trial.zipcodes = trial.LocationZip
                    ? trial.LocationZip.split(", ")
                    : null;
                trial.location = [
                        LocationFacility,
                        LocationCity,
                        LocationState,
                        LocationCountry,
                    ]
                        .filter((exists) => exists)
            .join(", ");
                return trial;
            }
        });
            // Sets the full list to an unfiltered value
            setUnfilteredList(list);
            // Does a basic filter on the full list to match with default filters
            setFullList(
                list.filter((trial) => {
                    return (
                        trial.OverallStatus === "Active" ||
                trial.OverallStatus === "Recruiting"
            );
        })
        );
            // Pulls the first 10 trials from the filtered list to initially display
            setTrials(
                list
                    .filter((trial) => {
                    return (
                        trial.OverallStatus === "Active" ||
                trial.OverallStatus === "Recruiting"
            );
        })
        .slice(0, 10)
        );
        } else {
            setSearchErrors({ message: "Unable to find trials", color: "error" });
            setUnfilteredList([]);
            setTrials([]);
            setFullList([]);
        }
        setLoading(false);
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/trial/treatment-search" });
        }

        //alert("errrrorrr"+error)
        //console.log('Error ', error)
        setSearchErrors({ message: "Unable to find trials", color: "error" });
        setUnfilteredList([]);
        setTrials([]);
        setFullList([]);
        setLoading(false);
    });

        /*  return () => {
         source.cancel();
         };*/

    }

    // On enter, fields with this onClick event trigger buildUrl
    const keyPress = (e) => {
        if (e.keyCode === 13) {

           // buildUrl();
            setOtherSearch(null);
            CTSearch(diagTwo,"");
        }
    };
    const search = (e) => {


        // buildUrl();
        CTSearch(chronicOne,otherSearch);

    };
    const searchIllness = (e) => {

        setOtherSearch(null);
        CTSearch(diagTwo,"");


    };


    const changeSearchTerm=(e,v)=>{


        setOtherSearch(v);



    }

    // Changes the distance value based off of the slider movement.
    // If there is a valid zipcode in the zipcode field, and we haven't yet sent a request to the zipcode API, this triggers it
    const handleChangeDistance = (v) => {
        console.log("Distance" + v)

        //alert("distance"+v)

        setDistance(v);

        if (!zipcodeRange && zipcode.toString().length === 5 && v < 225) {
            handleFilterDistance(v);
        } else {
            filterList(filter, zipcodeRange, v);
        }
    };

    const clearZipcode = () => {
        setZipcode("");
        setZipcodeRange(false);
        setDistance(225);
        filterList(filter);
    };

    const keyPressDistance = (e) => {
        if (e.keyCode === 13) {
            handleFilterDistance();
        }
    };

    const handleLoadMore = () => {
        setOffset(offset + 1);
        setTrials(fullList.slice(0, (offset + 1) * 10));
    };

    // Sends a request to a zipcode API that returns a list of zipcodes within 200 miles of the zipcode entered, with their relative distance from our zipcode
    const handleFilterDistance = (v) => {

        if (zipcode.toString().length === 5) {


            const config = {};
            const instance = axios.create(config);
            instance.defaults.headers.common = {};
            instance
                .get(
                    "https://www.zipcodeapi.com/rest/" +
                    process.env.REACT_APP_ONGEV_ZIPCODE_API_KEY +
                    "/radius.json/" +
                    zipcode +
                    "/" + v + "/mile",
                    {
                        headers: {},
                    }
                )
                .then((response) => {
                setZipcodeRange(response.data.zip_codes);
            filterList(filter, response.data.zip_codes, v);
            setDistance(v);
            //alert(v)
        })
        .catch((error) => {
                if (error.response && error.response.status === 429) {
                setErrors({
                    message: "Zipcode API reached its hourly limit",
                    color: "error",

                });
            } else {
                console.log(error);
                setErrors({
                    message: "Something went wrong getting the zipcode distances",
                    color: "error",
                });
            }
        });
        } else {
            setZipcodeRange(false);
            filterList(filter);
        }
    };


    useEffect(() => {
        axios
        .get(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'+profile.patientID+'/manual-search-terms', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            }
        })
        .then((response) => {
        if (response.data.success) {
        const details = response.data;

        // alert(details);
        setManualsearchterms(...manualsearchterms,details);
        var manualarray = [];

        var searchtermsarray = [];

        // alert("ddds---" + manualsearchterms.);


        // setSearchterms(...searchterms,details);
        if(details.manual_entry.manual_entry_data.length>0)
        {
            manualarray = details.manual_entry.manual_entry_data;
        }
        if( details.search_terms.terms){
            searchtermsarray = details.search_terms.terms;
        }







        var qwerty = [];

        /* manualarray.forEach(vital => {
         const newVital = cleanVitalsKey(vital.key)


         if (vital.key === "conditions") {


         const conditions = [...new Set(vital.details)];
         setConditionName(...conditionName,conditions);
         for (var j = 0; j < conditions.length; j++) {

         qwerty.push({ "term": conditions[j].condition_name })

         }

         }
         });*/
        for (var i = 0; i < searchtermsarray.length; i++) {

            if (searchtermsarray[i].selected) {

                qwerty.push({ "term": searchtermsarray[i].term });
            }
        }



        resultArray.length = 0;
        //  for(var i=0;i<qwerty.length;i++)
        //{
        // if(qwerty[i].selected){

        resultArray.push(qwerty);
        setResultArray(...resultArray);
        // alert("ssjd--" + JSON.stringify(manualsearchterms));
    }

    //setLoading(false);
})
.catch((error) => {
        if (error.response && error.response.data === "Token is expired") {
        console.log("Token is expired");
        dispatch({ type: "token expired" });
        history.push("/signin", { ongevRoute: "/trial/treatment-search" });
    }

    //alert("errrrorrr"+error)
    //console.log('Error ', error)
    //setErrors({ message: "Unable to load trials", color: "error" });
    setLoading(false);
});



}, []);


    // The page will try and scroll to the last viewed trial in the list, if there's a trial ID in the history state
    useEffect(() => {

        if (lastID && !loading) {
        try {
            refsObject.current[lastID].scrollIntoView();
        } catch {
            console.log("Ref error");
        }
    }
}, [lastID, loading]);



    /* useEffect(() => {


     var manualarray = [];

     var searchtermsarray = [];

     // alert("ddds---" + manualsearchterms.);
     if(manualsearchterms.length==0)
     {
     }
     else
     {

     setSearchterms(manualsearchterms);
     manualarray = manualsearchterms.manual_entry.manual_entry_data;
     searchtermsarray = manualsearchterms.search_terms.terms;







     var qwerty = [];

     manualarray.forEach(vital => {
     const newVital = cleanVitalsKey(vital.key)


     if (vital.key === "conditions") {


     const conditions = [...new Set(vital.details)];
     for (var j = 0; j < conditions.length; j++) {

     qwerty.push({ "term": conditions[j].chronicname })
     }
     }
     });
     for (var i = 0; i < searchtermsarray.length; i++) {

     if (searchtermsarray[i].selected) {

     qwerty.push({ "term": searchtermsarray[i].term });
     }
     }



     resultArray.length = 0;
     //  for(var i=0;i<qwerty.length;i++)
     //{
     // if(qwerty[i].selected){

     resultArray.push(qwerty);
     setResultArray(...resultArray);

     //  }

     // }
     }


     }, [manualsearchterms]);*/

    const handleChronicChange = (e) => {
        //setChronicOne(e.target.value);
        setChronicOne(e.target.value);


        //CTSearch(e.target.value);

        setUrl(
            process.env.REACT_APP_ONGEV_API_BASEURL +
            "/api/" +
            process.env.REACT_APP_ONGEV_API_VERSION +
            "/patient/" +
            profile.uid +
            "/services/clinical-trials"
        );

    }

    const addDetails = () => {
        axios
            .get(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'+profile.patientID+'/manual-search-terms', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                }
            })
            .then((response) => {
            if (response.data.success) {
            if(response.data.search_terms.terms.length>0)
            {
                setSearchLength(true);
            }
            else{
                setSearchLength(false);
            }
            setManualsearchterms(response.data);
        }
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/trial/treatment-search" });
        }

        //alert("errrrorrr"+error)
        //console.log('Error ', error)
        //setErrors({ message: "Unable to load trials", color: "error" });
        setLoading(false);
    });

        // var cloneArray = JSON.parse(JSON.stringify(searchterms));

        // setManualsearchterms(cloneArray);

        setOpenAdd(true)
    }
    const handleCloseAdd = () => {

        setOpenAdd(false);
    };


    const handleCountryChange = (event) => {

        if(event.target.checked){

            setCountry("US");
            setCountryCheck(true);
        }
        else{

            setCountry("");
            setCountryCheck(false);
        }


        filterList(filter, zipcodeRange, distance,country);
    };




    const add = () => {

        var manualarray=[];
        var searchtermsarray=[];
        manualarray = manualsearchterms.manual_entry.manual_entry_data;
        searchtermsarray = manualsearchterms.search_terms.terms;
        let terms={}
        terms=manualsearchterms.search_terms;
        delete terms.status
        var qwerty = [];

        /* manualarray.forEach(vital => {
         const newVital = cleanVitalsKey(vital.key)


         if (vital.key === "conditions") {


         const conditions = [...new Set(vital.details)];
         for (var j = 0; j < conditions.length; j++) {

         qwerty.push({ "term": conditions[j].condition_name })
         }
         }
         });*/
        for (var i = 0; i < searchtermsarray.length; i++) {

            if (searchtermsarray[i].selected) {

                qwerty.push({ "term": searchtermsarray[i].term });
            }
        }



        resultArray.length = 0;


        resultArray.push(qwerty);
        setResultArray(...resultArray);


        axios.put(process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'+profile.patientID+'/search-terms', terms, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })
            .then((response) => {
            if(response.data.success)
        {
            setOpenAdd(false);
        }

    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/trial/treatment-search" });
        }


    })


    };

    // Function to render each trial in the list view
    const renderTrial = (trial) => {
        const { Condition, location } = trial;
        console.log("profile TrailSearch:", profile);

        return (
            <Grid
        container
        direction={"row"}
        className={classes.trialListItem}
        key={trial.NCTId}
        ref={(ref) => {
            refsObject.current[trial.NCTId] = ref;
        }}
    >
        {/* Icon on the left. Currently a placeholder */}
    <Grid item xs={3} className={classes.avatarContainer}>
    <LocalPharmacyIcon className={classes.trialAvatar} />
    </Grid>

        {/* Basic information */}
        <Grid item xs={9} className={classes.trialInfo}>
    <div className={classes.trialInfoTitleContainer}>
    <Typography
        component={"h4"}
        variant={"h4"}
        className={classes.trialName}
    >
        {location}
    </Typography>
        <Typography
        component={"h4"}
        variant={"subtitle1"}
        className={classes.status}
    >
        {trial.OverallStatus}
    </Typography>
        </div>

        <div className={classes.trialDesc}>
    <div className={classes.trialSubContainer}>
    <Typography
        component={"h4"}
        variant={"subtitle1"}
        className={classes.trialSubTitle}
    >
        Study Title:
            </Typography>
        <Typography
        component={"h4"}
        variant={"body1"}
        className={classes.trialSubInfo}
    >
        {trial.BriefTitle}
    </Typography>
        </div>

        {Condition ? (
        <div className={classes.trialSubContainer}>
        <Typography
        component={"h4"}
        variant={"subtitle1"}
        className={classes.trialSubTitle}
    >
        Conditions:
            </Typography>
        <Typography
        component={"h4"}
        variant={"body1"}
        className={classes.trialSubInfo}
    >
        {Condition}
    </Typography>
        </div>
    ) : null}
    </div>

        {/* The buttons for each trial. Learn more takes the user to that trial's detailed view. */}
        {/* Placeholder for Save for Later, for when we implement that feature */}
    <div className={classes.trialButtons}>
        {/* <Button
         type={"button"}
         variant='outlined'
         color='secondary'
         className={classes.saveButton}
         startIcon={<SaveIcon/>}>
         Save For Later
         </Button> */}

    <Button
        type={"button"}
        variant="outlined"
        startIcon={<InfoIcon />}
        color="primary"
        onClick={() => {
            window.scrollTo(0, 0);
            // Adds the trial ID to the current history state, so if the user comes back to this location, the page will atempt to scroll to the trial
            history.replace("/trial/treatment-search", {
                    ...history.location.state,
                lastID: trial.NCTId,
        });
            history.push("/trial/treatment-search", { item: trial });
        }}
    >
        Learn More
        </Button>
        </div>
        </Grid>
        </Grid>
    );
    };

    // Function to render the detailed view of the trial

    const renderTrialInfo = (trial) => {
        const { BriefTitle } = trial;

        return (
            <Page pageTitle={intl.formatMessage({ id: "dashboard_title" })}>
    <Paper className={clsx(classes.paper)} elevation={6}>
            {/* Title location */}

            <div className={classes.trialArticleTitleContainer}>
    <Typography
        component={"h1"}
        variant={"h1"}
        style={{ marginBottom: "8px" }}
    >
        {BriefTitle}
    </Typography>
        <Typography component={"h3"} variant={"subtitle1"}>
            {trial.location}
    </Typography>
        </div>

        {/* Bottom section of detailed trial view */}

        <Grid
        container
        direction={"row"}
        className={classes.trialInfoContainer}
    >
        {/* The left side of the page, which contains the button to go back to the previous page */}
        {/* As well as, in the future, the button to save the trial */}

    <Grid item xs={3}>
            <div className={classes.trialFullButtons}>
    <Button
        variant="contained"
        fullWidth
        color="primary"
        startIcon={<ArrowBackIosIcon />}
        style={{ marginBottom: "16px" }}
        onClick={() => {
            // refsObject.current[trial.NCTId].scrollIntoView()
            history.push("/trial/treatment-search", {
                item: false,
                lastID: trial.NCTId,
            });
        }}
    >
        Go Back
        </Button>

        {/* <Button
         variant='outlined'
         fullWidth
         startIcon={<SaveIcon/>}
         color='secondary'>
         Save For Later
         </Button> */}
        </div>
        </Grid>

        {/* The right section, which has the trial information */}

        <Grid item sx={9} className={classes.trialInfoFull}>
    <>
        {trial.OverallStatus ? (
        <Typography
            component={"p"}
            variant={"h4"}
            className={classes.trialDesc}
        >
            Status: {trial.OverallStatus}
        </Typography>
        ) : null}
        {trial.StartDate ? (
        <Typography
            component={"p"}
            variant={"h4"}
            className={classes.trialDesc}
        >
            Start Date: {trial.StartDate}
        </Typography>
        ) : null}
        {trial.CompletionDate ? (
        <Typography
            component={"p"}
            variant={"h4"}
            className={classes.trialDesc}
        >
            Completion Date: {trial.CompletionDate}
        </Typography>
        ) : null}
        {trial.LocationFacility ? (
        <Typography
            component={"p"}
            variant={"h4"}
            className={classes.trialDesc}
        >
            Facility: {trial.trial.LocationFacility}
        </Typography>
        ) : null}
    </>
    <Typography
        component={"p"}
        variant={"h4"}
        className={classes.trialDesc}
    >
        Brief Summary:
            </Typography>
        <Typography
        component={"p"}
        variant={"h6"}
        className={classes.trialDesc}
    >
        {trial.BriefSummary}
    </Typography>
        <Typography
        component={"p"}
        variant={"h4"}
        className={classes.trialDesc}
    >
        Detailed Summary:
            </Typography>
        <Typography
        component={"p"}
        variant={"h6"}
        className={classes.trialDesc}
    >
        {trial.DetailedDescription}
    </Typography>
        <>
        {trial.StudyPopulation ? (
        <>
        <Typography
            component={"p"}
        variant={"h4"}
        className={classes.trialDesc}
    >
        Targeted Population:
            </Typography>
        <Typography
        component={"p"}
        variant={"h6"}
        className={classes.trialDesc}
    >
        {trial.StudyPopulation}
    </Typography>
        </>
    ) : null}

        {trial.EligibilityCriteria ? (
        <>
        <Typography
            component={"p"}
            variant={"h4"}
            className={classes.trialDesc}
        >
            Criteria for Entry:
        </Typography>
        <Typography
            component={"p"}
            variant={"h6"}
            className={classes.trialDesc}
        >
            {trial.EligibilityCriteria}
        </Typography>
        </>
        ) : null}
    </>
    </Grid>
        </Grid>
        </Paper>
        </Page>
    );
    };

    // If the route points to a specific trial, we will show it's detailed view instead of the search screen
    // renderTrialInfo is the function just above
    if (selectedItem) {
        return renderTrialInfo(selectedItem);
    }

    // On each rerender we check to see if there are more than one trial from their search and filters
    // If not, we set an error
    if (!loading && !searchErrors && trials.length < 1) {
        setSearchErrors({ message: "Unable to find trials", color: "error" });
    } else if (searchErrors && trials.length > 1) {
        setSearchErrors(false);
    }

    return (
        <Page pageTitle={intl.formatMessage({ id: "dashboard_title" })}>
<Paper className={clsx(classes.paper)} elevation={6}>
        <div className={classes.container}>
<Typography component={"h1"} variant={"h1"} className={classes.title}>
    Find Clinical Trial Matches
    </Typography>

    {/* If we have a stored diagnosis, show it and a search bar for another input they can add */}
    {!!profile.conditions ? (
    <div className={classes.searchBars}>


    <div style={{width:'50%', float:'left', background:'#eee'}}>


    <div style={{ display: 'flex', width: '100%' }}>
    <div className={classes.diagnosisontainer}>

    <FormControl variant="filled" className={classes.margin}>

    <Select style={{width:'350px'}}
        labelId="condition"

        inputProps={{
        id: "hey"
    }}
        onChange={handleChronicChange}
        input={<BootstrapInput />}

    >
        {resultArray.map(type => <MenuItem value={type.term}>{type.term}</MenuItem>)}
    </Select>
    </FormControl>
    </div>
    <div className={classes.popupAlert}>
    <div>

    <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        disableEnforceFocus={true}
        className={classes.modal}
    >
    <div className={classes.modalPaper}>
    <div className={classes.modalHeader}>
    <Icon><CloseIcon className={classes.modalIcon} onClick={handleCloseAdd} /></Icon>
        </div>
        <div className={classes.modalBody}>
        {searchLength?<div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            {manualsearchterms.length==0?'':


            manualsearchterms.search_terms.terms.map((item, index) => (
            <React.Fragment>
            <div style={{ width: '20%' }}>
            <FormControlLabel style={item.selected ?
            { minWidth: '150px', maxWidth: 'auto', height: '50px', background: '#83BD36', borderRadius: '5px', float: 'left', marginRight: '30px', marginTop: '30px' } :
            { minWidth: '150px', maxWidth: 'auto', height: '50px', background: '#eee', borderRadius: '5px', float: 'left', marginRight: '30px', marginTop: '30px' }}
                control={
                    <Checkbox name={item.term} checked={checkedFhirItems[item.term]} onChange={handleChangeFhirCondition} icon={<span />} checkedIcon={<span />}
            />
            }
                label={item.term} />
            </div>
            </React.Fragment>


            ))

            }

        </div>

        <div style={{ textAlign: 'center', padding: '25px' }}>
        <Button
            type={"button"}
            variant='contained'
            color='primary'
            className={classes.addNotesButton}
            onClick={() => add()}

        >
            OK
            </Button>
            <Button
            type={"button"}
            variant='outlined'
            color='primary'
            className={classes.cancelAddNotesButton}
            startIcon={<CancelIcon />}
            onClick={handleCloseAdd}
                >
                Cancel
                </Button></div></div>:<div>No Results Found</div>}

    </div>



    </div>
    </Modal>
    </div>

    </div>

    <Button style={{background:'#83BD36'}}
        variant='contained'
        color='primary'

        className={classes.popupButton}
        onClick={() => addDetails()}>

        Select Conditions
    </Button>

    </div>
    <div style={{ display: 'flex', width: '100%' }}>

    <div className={classes.searchContainer1}>

        {/*<TextField
         value={otherSearch}
         title="OtherSearch"
         onChange={(e) => setOtherSearch(e.target.value)}

         onKeyDown={keyPress}
         variant="outlined"
         className={classes.searchField}
         placeholder="Search for medications,treatments etc"
         fullWidth
         InputProps={{
         startAdornment:
         <InputAdornment position="start">
         <SearchIcon />
         </InputAdornment>,
         endAdornment:
         <InputAdornment position="end">
         <CloseIcon className={classes.icons} onClick={stopSearch} />

         </InputAdornment>

         }}
         />*/}


    <FormControl style={{width:'85%', height:'100px', background:'#eee'}}

        name='otherSearch'

            >
            <div style={{display:'flex',marginLeft:'10px'}}>

    <Autocomplete

        onChange={changeSearchTerm}
        value={otherSearch}
        id="otherSearch"
        name='otherSearch'
        options={mostCommonDiagn}

        freeSolo

        getOptionLabel={option=>option}
        renderInput={(params) => (
    <TextField style={{width:'400px',height:'60px', background:'#fff'}}
        {...params}
        inputStyle={{ textAlign: 'center' }}
        id="otherSearch"
        placeholder="Search for medications,treatments etc"
        name='otherSearch'
        variant="outlined"

            />)}

    />
    <div>
    <Button
        type={"button"}
        variant='contained'
        color='primary'
        style={{cursor:"pointer", margin:'20px', background:'secondary'}}
        onClick={search}

            >
           Search
            </Button></div>

    </div>
    </FormControl>



            </div>



            </div>


            </div>

            <div className={classes.searchContainer} style={{float:'left'}}>
    <TextField
        value={diagTwo}
        title="Search"
        onChange={(e) => setDiagTwo(e.target.value)}

        onKeyDown={keyPress}
        variant="outlined"
        className={classes.searchField}
        placeholder="Or search for a different chronic illness"
        fullWidth
        InputProps={{

            endAdornment:
    <InputAdornment position="end">

            <SearchIcon onClick={searchIllness} style={{marginRight:'30px'}}/>
            <CloseIcon className={classes.icons} onClick={stopSearch} />

            </InputAdornment>

    }}
    />
    </div>



    </div>
    ) : null}
</div>

    {/* Container for the filters and search results */}
    <div className={classes.bottomContainer}>
<div className={classes.container}>
    {profile.conditions ? (
    <>
    {/* If we are unable to connect to our API we show an error page */}



        {errors && errors.message === "Unable to load trials" ? (
        <NoConnectionError />
    ) : (
    <>
    {/* A generic holder for alert messages, mainly one for prompting the user to connect to a healthcare network if they aren't already connected */}



    <ErrorMessage
        errors={errors}
        color={errors.color}
        handleClose={handleCloseError}
        handleLink={() =>
        history.push("/patient/healthcare/register")
    }
    />

    <Grid
        container
        direction={"row"}
        style={{ paddingBottom: "100px" }}
    >
        {/* The container for the search filters */}
    <Grid item xs={12} sm={3} className={classes.filters}>
    <div className={classes.filterContainer}>
    <Typography
        component={"h5"}
        variant={"h5"}
        className={classes.filterTitle}
    >
        Filter Results
    </Typography>

    <Typography
        component={"h6"}
        variant={"h6"}
        className={classes.searchTitle}
    >
        Location
        </Typography>

        <TextField
        variant="outlined"
        margin="normal"
        disabled={loading}
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        onBlur={() => handleFilterDistance()}
        onKeyDown={keyPressDistance}
        className={classes.zipcodeField}
        placeholder="Zipcode"
        fullWidth
        InputProps={{
        endAdornment: zipcode ? (
        <InputAdornment position="end">
            <CancelIcon hidden={"true"}
        onClick={clearZipcode}
        color="secondary"
            />
            </InputAdornment>
    ) : null,
    }}
    />
    <Typography
        component={"h6"}
        variant={"h6"}
        className={classes.searchTitle}
    >
        Country
        </Typography>
        <FormControlLabel
        control={
            <Checkbox
        checked={countryCheck==true?true:false}
        name="US"
        onChange={handleCountryChange}
            />
    }
        label="US-Only"
            />

            <div className={classes.sliderLabels}>
    <Typography
        component={"p"}
        className={classes.zipcodeLabel}
    >
        Distance
        </Typography>
        <Typography
        component={"p"}
        className={classes.zipcodeLabel}
    >
        {distance < 225 ? `1-${distance} Miles` : "All"}
    </Typography>
    </div>
    <Slider
        min={25}
        value={distance}
        disabled={loading}
        onChangeCommitted={(e, v) => handleChangeDistance(v)}
        max={225}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => (v < 225 ? v : "All")}
        marks={[{ value: 225, label: "All" }]}
        color="secondary"
        step={25}
        className={classes.slider}
    />

        {/* The status filters, with commented placeholders for statuses supported in the future */}
    <div className={classes.statusContainer}>
    <Typography component={"h6"} variant={"h6"}>
        Status
        </Typography>
        <FormControlLabel
        control={
            <Checkbox
        checked={filter["Not yet recruiting"]}
        name="Not yet recruiting"
        onChange={handleFilterChange}
            />
    }
        label="Not yet recruiting"
            />
            <FormControlLabel
        control={
            <Checkbox
        checked={filter["Recruiting"]}
        name="Recruiting"
        onChange={handleFilterChange}
            />
    }
        label="Recruiting"
            />
            <FormControlLabel
        control={
            <Checkbox
        checked={filter["Active"]}
        name="Active"
        onChange={handleFilterChange}
            />
    }
        label="Active"
            />
            {/* <FormControlLabel
             control={
             <Checkbox
             checked={filter["Suspended"]}
             name="Suspended"
             onChange={handleFilterChange}
             />
             }
             label="Suspended"
             /> */}
        {/* <FormControlLabel
         control={
         <Checkbox
         checked={filter["Completed"]}
         name="Completed"
         onChange={handleFilterChange}
         />
         }
         label="Completed"
         /> */}
        {/* <FormControlLabel
         control={
         <Checkbox
         checked={filter["Withdrawn"]}
         name="Withdrawn"
         onChange={handleFilterChange}
         />
         }
         label="Withdrawn"
         /> */}
    </div>
    </div>
    </Grid>

    <Grid
        item
        xs={12}
        sm={9}
        className={classes.trialsContainer}
    >
        {loading ? (
        <div className={classes.loadingCircle}>
        <Typography color="primary" variant="h6">
            Loading Your Trials. This may take a second.
        </Typography>
        <CircularProgress size={150} />
            </div>
        ) : (
        <>
        {/* Shows an error message for zero or one results */}
            {searchErrors ? (
            <div className={classes.noResultsContainer}>
            <div className={classes.noResultsBox}>
            <Typography
                variant="h3"
                className={classes.noResultsText}
            >
                Unable to find any trials for your search
            </Typography>
            <Button
                className={classes.noResultsButton}
                color="primary"
                variant="contained"
                onClick={resetFilter}
                    >
                    {/* <AddCircleIcon className={classes.connectIcon}/> */}
                Reset your filters
            </Button>
            </div>
            </div>
            ) : (
            <>
            <div className={classes.listHeader}>
            <Typography
                component={"h1"}
                variant={"h5"}
                className={classes.containerTitle}
            >
                {fullList.length} Results
            </Typography>
            <Typography
                component={"h1"}
                variant={"body1"}
                    >
                    Showing 1-
            {offset * 10 < fullList.length
                ? offset * 10
                : fullList.length}
            </Typography>
            </div>

            <div className={classes.trialList}>
                {trials.map((trial) => renderTrial(trial))}
                {/* Button to load more results */}
                {/* Only visible if there are more results to load */}
                {offset * 10 < fullList.length ? (
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleLoadMore}
                    fullWidth
                    startIcon={
                        <ExpandMoreIcon
                    className={classes.icon}
                />
                }
                    className={classes.loadButton}
                >
                    Load More Articles
                </Button>
                ) : null}
            </div>
            </>
            )}
        </>
        )}
    </Grid>
    </Grid>
    </>
    )}
    </>
    ) : (
    <div className={classes.noDiagContainer}>
    <div className={classes.noDiagBox}>
    <img
        src={"/error-icons/image_clinical-match.png"}
        className={classes.connectImage}
        alt="clinical match"
            />
            <Typography variant="h3" className={classes.connectText}>
        You haven't entered a chronic illness that can be used to
        search for matching clinical trials. Click the button below
        to manually add your health details.
    </Typography>
    <Button
        className={classes.connectButton}
        color="primary"
        variant="contained"
        onClick={() => history.push("/health/details")}
    >
    <AddCircleIcon className={classes.connectIcon} />
        Add your health details
    </Button>
    </div>
    </div>
    )}
</div>
    </div>
    </Paper>
    </Page>
);
};

export default injectIntl(TrialSearch);