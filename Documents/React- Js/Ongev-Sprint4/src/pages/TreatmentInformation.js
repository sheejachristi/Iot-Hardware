import React, {useState, useContext, useEffect} from 'react'
import {injectIntl} from 'react-intl'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField'
import clsx from "clsx";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from "@material-ui/core/InputAdornment";
import { UserContext} from "../context/user-context";
import axios from "../utils/axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import ErrorMessage from '../components/ErrorMessage'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useHistory} from 'react-router-dom'
import NoConnectionError from '../components/NoConnectionError'

const useStyles = makeStyles((theme) => ({ 
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        
    },
    paper: {
        paddingTop: theme.spacing(4),
        width: "100%",
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.grey.pale,
        alignItems: "center",
        color: theme.palette.grey.dark,
    },
    container: {
        maxWidth: '75rem',
        width: '90%',
        margin: 'auto',
    },
    searchBars: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(4),
        marginTop: '0px'
    },
    searchTitle: {
        fontWeight: 'bold',
        color: theme.palette.grey.dark
    },
    title: {
        marginBottom: theme.spacing(4),
        color: theme.palette.grey.dark
    },
    bottomContainer: {
        backgroundColor: theme.palette.grey.contrastText,
        paddingTop: theme.spacing(2),
        width: '100%'
    },
    trialsContainer: {
        backgroundColor: 'white',
        paddingTop: theme.spacing(2)
    },
    trialButtons: {
        marginTop: theme.spacing(2)
    },
    learnButton: {
        marginRight: theme.spacing(3),
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        textTransform: 'none'
    },
    trialListItem: {
        marginBottom: theme.spacing(4),
        borderBottomWidth: '1px',
        borderBottomColor: theme.palette.grey.main,
        borderBottomStyle: 'solid',
    },
    trialInfo: {
        height: '100%',
        paddingBottom: theme.spacing(4),
        width: '100%'
    },
    trialName: {
        trailName: theme.spacing(2)
    },
    trialDesc: {
        paddingBottom: theme.spacing(2)
    },
    trialList: {

    },
    articleAvatar: {
        textAlign: 'center',
        margin: 'auto',
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '600px'
    },
    articleFull: {
        paddingLeft: '5%',
        paddingRight: '5%',
        borderLeftStyle: 'solid',
        borderColor: theme.palette.grey.light,
        borderWidth: '2px',
    },
    articleContainer: {
        backgroundColor: theme.palette.grey.contrastText,
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    backButton: {
        width: '60%',
        marginTop: theme.spacing(8),
    },
    resultsContainer: {

    },
    filtersContainer: {
        borderRightStyle: 'solid',
        borderColor: theme.palette.grey.light,
        borderWidth: '2px',
    },
    // filters: {
    //     marginLeft: theme.spacing(16),
    // },
    filterTitle: {
        marginBottom: theme.spacing(2),
    },
    radios: {
        paddingBottom: theme.spacing(2),
        borderBottomStyle: 'solid',
        borderColor: theme.palette.grey.light,
        borderWidth: '1px',
        width: '80%',
    },
    loadButton: {
        height: '60px',
        marginBottom: theme.spacing(5),
        fontSize: '18px'
    },
    icon: {
        fontSize: '20px'
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
    },
    errorContainer: {
        width: '100%',
        marginTop: '9.375rem',
        paddingBottom: '12.5rem'
    },
    errorBox: {
        width: '100%',
        height: '25.625rem',
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
    errorText: {
        width: '60%',
        textAlign: 'center',
        marginBottom: '3.125rem',
        lineHeight: '2.25rem'
    },
    connectText: {
        width: '70%',
        textAlign: 'center',
        lineHeight: '2.25rem',
        marginBottom: '7rem',
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
    noDiagContainer: {
        width: '100%',
        marginTop: '9.375rem',
        paddingBottom: '12.5rem'
    },
    noDiagBox: {
        width: '100%',
        height: '33.75rem',
        background: 'linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}))

const TreatmentInformation = ({intl}) => {

    
    const history = useHistory()
    const classes = useStyles();
    const [, dispatch] =useContext(UserContext)
    const [trials, setTrials] = useState([]);
    const search = history.location.state ? history.location.state.search : false
    const [diagOne, setDiagOne] = useState(search ?  search : '' );
    let searchString1 = diagOne.trim()
    const [url, setUrl] = useState(searchString1 ? process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/care-nexis/search/' + searchString1 : '')
    const [errors, setErrors] = useState(false)
    const [loading, setLoading] = useState(search ? true : false)
    const [articleId, setArticleId] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [searched, setSearched] = useState(false)
    const article = history.location.state ? history.location.state.article : false
    // const [sort, setSort] = useState('relevant')
    const [offset, setOffset] = useState(1)
    const [fullList, setFullList] = useState([])

    const handleCloseError = () => {
        setErrors(false)
    }

    const buildUrl = () => {

        setLoading(true);
        let searchString = diagOne.trim().split(' ').join('+')
        if (searchString1) {
            setUrl(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/care-nexis/search/' + searchString)
        }
    }

    // const handleSortChange = (event) => {
    //     setSort(event.target.value);
    // };

    const keyPress = (e) =>  {
        if(e.keyCode === 13){

            buildUrl()
        }
    }

    const stopSearch = () => {
        setSearched(false)
        setLoading(false)
        setDiagOne("")
        setErrors(false)
        setFullList([])
        setTrials([])
        setCancel(true)
    }

    const handleLoadMore = () => {
        setOffset(offset + 1)
        setTrials(fullList.slice(0, (offset + 1) * 10))
    }

    // Watches changes in the url variable, then searches for articles when it changes
    useEffect(() => {
        const searchTrials = () => {
            setLoading(true)
            console.log(url)
            setOffset(1)
            axios.get(url, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } })
                .then((response) => {
                    const results = response.data.search.data.searchResults
                    let articleArray = []
                    Object.keys(results).forEach((category, index) => {
                        articleArray = articleArray.concat(results[category].filter(result => result.objectType === 'Article'))
                    })
                    articleArray.sort((a, b) => b.searchScore - a.searchScore)
                    if (articleArray.length > 0 ){
                        setFullList(articleArray)
                        setTrials(articleArray.slice(0, 10))
                    } else {
                        setFullList([])
                        setTrials([])
                    }
                    setErrors(false)
                    setSearched(true)
                    setLoading(false)
                })
            .catch((error) => {
                if (error.response && error.response.data === 'Token is expired') {
                    console.log('Token is expired')
                    dispatch(({type: 'token expired'}))
                    history.push("/signin", {ongevRoute: "/diagnosis/information"})
                }
                console.log('Error ', error)
                setErrors({message: 'Unable to load articles'})
                setLoading(false)
            })
        }

        if (url) {
            searchTrials()
        }

    }, [url, dispatch, history])

    useEffect(() => {
        if (articleId) {
            const source = axios.CancelToken.source()

            setLoading(true)
            console.log(articleId)
            axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/care-nexis/article/' + articleId,
            { 
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
                cancelToken: source.token,
            })
            .then((response) => {
                const result = response.data.articles.data.articles[articleId]
                history.push("/diagnosis/information", {article: result})
                setLoading(false)
                setArticleId(false)
            })
            .catch((error) => {
                if (error.response && error.response.data === 'Token is expired') {
                    console.log('Token is expired')
                    dispatch(({type: 'token expired'}))
                    history.push("/signin", {ongevRoute: "/diagnosis/information"})
                }
                console.log('Error ', error)
                setErrors({message: 'Something went wrong'})
                setLoading(false)
            })

            return () => {
                source.cancel()
            }
        }
    }, [articleId, dispatch, history])

    useEffect(() => {
        if (article) {
            window.scrollTo(0,0)
        }
    }, [article])



    const renderTrial = (trial) => {
        return (
            <Grid container direction={"row"} className={classes.trialListItem} key={trial.id}>
                <Grid item sx={12} className={classes.trialInfo}>
                    <Typography component={"h1"} variant={"h2"} className={classes.trialName}>
                        {trial.primaryText}
                    </Typography>
                    {trial.secondaryText ?
                        <Typography component={"p"} variant={"h4"} className={classes.trialDesc}>
                            {trial.secondaryText}
                        </Typography>
                    : null
                    }
                    
                    <div className={classes.trialButtons}>
                        <Button
                            type={"button"}
                            variant="outlined" 
                            className={classes.learnButton}
                            startIcon={<OpenInBrowserIcon/>}
                            color="primary"
                            onClick={() => setArticleId(trial.id)}>
                                Read Article
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderFullArticle = (article) => {
        return (
            <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
                <Paper className={clsx(classes.paper)} elevation={6}>
                    <div className={classes.container}>
                        <Typography component={"h1"} variant={"h1"} className={classes.title}>
                            {article.title}
                        </Typography>
                    </div>
                    <div className={classes.articleContainer}>
                        <div className={classes.container}>
                            <ErrorMessage errors={errors ? errors : undefined} handleClose={handleCloseError}/>
                            <Grid container direction={"row"} className={classes.articleHolder}>
                                <Grid item xs={2}>
                                    <Button
                                        className={classes.backButton}
                                        color='primary'
                                        variant='contained'
                                        fullWidth
                                        startIcon={<ArrowBackIosIcon/>}
                                        onClick={() => {
                                            if (history.location.state && history.location.state.previous === 'dashboard') {
                                                history.push("/dashboard")
                                            } else {
                                                history.push("/diagnosis/information")
                                            }

                                        }}>
                                            Go Back
                                    </Button>
                                </Grid>
                                <Grid item xs={10} className={classes.articleFull}>
                                    <div dangerouslySetInnerHTML={{ __html: article.bodyContent }} />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Paper>
            </Page>
        )
    }

    if (article) {
        return(
            renderFullArticle(article)
        )
    }

    return (
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})} >
            <Paper className={clsx(classes.paper)} elevation={6} errors={errors ? errors : undefined}>
                <div className={classes.container}>

                
                    <Typography component={"h1"} variant={"h1"} className={classes.title}>
                        Search Articles, Research & Information
                    </Typography>
                    
                    <div className={classes.searchBars}>
                        <TextField
                            value={diagOne}
                            onChange={(e) => setDiagOne(e.target.value)}
                            onBlur={() => buildUrl()}
                            variant="outlined"
                            fullWidth
                            onKeyDown={keyPress}
                            placeholder='Enter a diagnosis'
    InputProps={{
        startAdornment:
            <InputAdornment position={"start"} >
            <SearchIcon className={classes.icons}/>
    </InputAdornment>,
            style: {
            fontSize: '24px'
        },

        endAdornment:
           <span hidden = {true}> <InputAdornment position="end" >
            <CloseIcon className={classes.icons}  onClick={stopSearch} />

            </InputAdornment></span>

    }}
                        />
                    </div>


                </div>        
                <div className={classes.trialsContainer}>
                    <div className={classes.container}>
                        {
                        !loading && fullList.length === 0 ?
                        
                            
                        <div className={classes.noDiagContainer}>
                            <div className={classes.noDiagBox}>
                                <img src={"/error-icons/image_diagnosis-articles.png"} className={classes.connectImage} alt='connect network'/>
                                <Typography variant='h3' className={classes.connectText}>
                                    {searched ? "Unable to find any articles for the search term entered. Please try something else." : "Enter a term into the field above to search through our database of relevant articles"}
                                </Typography>
                            </div>
                        </div>

                    
                        :

                        errors.message === 'Unable to load articles' ?
                        
                            <NoConnectionError/>

                        :
                        loading ?
                        <div className={classes.loadingCircle}>
                            <CircularProgress size={150}/> 
                        </div>
                        :
                        <>
                            <ErrorMessage errors={errors} handleClose={handleCloseError}/>
                            <Grid container direction={"row"} style={{marginTop: '32px', paddingBottom: '100px'}}>
                                {/* <Grid item xs={'2'} className={classes.filtersContainer}>
                                    <div className={classes.filters}>
                                        <Typography variant={'h5'} className={classes.filterTitle}>
                                            Filter Results
                                        </Typography>
                                        <Typography variant={'subtitle1'}>
                                            Sort By
                                        </Typography>
                                        <FormControl component="fieldset" className={classes.radios}>
                                            <RadioGroup aria-label="gender" name="gender1" value={sort} onChange={handleSortChange}>
                                                <FormControlLabel value="relevant" control={<Radio />} label="Relevant" />
                                                <FormControlLabel value="recent" control={<Radio />} label="Recent" />
                                                <FormControlLabel value="popular" control={<Radio />} label="Popular" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </Grid> */}

                                <Grid item xs={12} className={classes.resultsContainer}>
                                    
                                    <div className={classes.listHeader}>
                                        {fullList.length > 0 ?
                                        <Typography component={"h1"} variant={"h5"} className={classes.resultTitle}>
                                            {fullList.length} Results
                                        </Typography>
                                        : null}
                                        {fullList.length > 0 ?
                                        <Typography component={"h1"} variant={"body1"} >
                                            Showing 1-{offset * 10 < fullList.length ? offset * 10 : fullList.length}
                                        </Typography>
                                        : null}

                                    </div>
                                    <div className={classes.trialList}>
                                        {trials.map(trial => renderTrial(trial))}
                                        {offset * 10 < fullList.length ? 
                                        <Button
                                            color='primary'
                                            variant='outlined'
                                            onClick={handleLoadMore}
                                            fullWidth
                                            startIcon={<ExpandMoreIcon className={classes.icon}/>}
                                            className={classes.loadButton}>
                                                Load More Articles
                                        </Button>
                                        : null
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                            
                        </>
                        }
                    </div>
                </div>
                
            </Paper>
        </Page>
    )
}

export default injectIntl(TreatmentInformation)