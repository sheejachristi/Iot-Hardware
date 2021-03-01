import React, {useEffect, useState} from 'react';
import { useIntl } from 'react-intl'
import {makeStyles} from '@material-ui/core/styles'
import{
    Grid,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core/'
import {useHistory} from 'react-router-dom'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import axios from '../../utils/axios'
import Article from './Article'

const useStyles = makeStyles((theme) => ({

        trialMatches: {
            flexDirection: "row",
            justify: "center",
            alignItems: "center",
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(20)
        },
        matchesLeft: {
            backgroundColor: theme.palette.secondary.main,
            paddingLeft: '6%',
            height: '57.5rem',
            color: theme.palette.secondary.contrastText,
            [theme.breakpoints.down('xs')]: {
                height: '35rem',
            },
        },
        numMatches: {
            fontSize: '128px',
            fontWeight: 100,
            marginTop: theme.spacing(3),
            [theme.breakpoints.only('sm')]: {
                fontSize: '100px',
            },
        },
        loadingSpinner: {
            color: theme.palette.secondary.contrastText,
        },
        dividerLine: {
            width: '80%',
            borderBottomStyle: 'solid',
            marginBottom: theme.spacing(2),
        },
        matchesRight: {
            backgroundColor: '#E6F3D1',
            height: '57.5rem',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(5),
        },
        matchesRightTop: {
            marginTop: theme.spacing(5),
            display: 'flex',
            flexDirection: 'row',
            marginBottom: theme.spacing(4),
        },
        matchesRightDisabled: {
            backgroundColor: theme.palette.secondary.pale,
            minHeight: '61.25rem',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            opacity: 0.2,
        },
        matchedArticalesContainer: {
            height: '60%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(8),
            width: '100%',
        },
        connectImage: {
            width: '90%',
            marginTop: '-6.25rem',
            marginLeft: '-6%',
            [theme.breakpoints.down('xs')]: {
                width: '70%',
                marginLeft: '10%',
            }
        },
        selector: {
            marginLeft: theme.spacing(4),
            width: theme.spacing(30),

        },
        select: {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.contrastText,
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1),
        },
        countText: {
            fontSize: '24px',
            fontWeight: 300,
            width: '85%'
        },
        selectIcon: {

        }
    }))


const ArticleMatches = ({profile}) => {
    const classes = useStyles();
    const history = useHistory()
    const intl = useIntl()
    const [loading, setLoading] = useState(true)
    const [numMatches, setNumMatches] = useState(0)
    const [articles, setArticles] = useState([{number: 1}, {number: 2}, {number: 3}])
    const [error] = useState(false)
    const [search, setSearch] = useState(profile.interests[0])

    const renderArticle = (match, i) => {
        return (
            <Article id={match.id} key={match.id ? match.id : match.number} title={match.primaryText} count={i+1} searchScore={match.searchScore}/>

    )
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const source = axios.CancelToken.source()

        const searchString = search.split('-').join('+')
        setLoading(true)
    setArticles([{number: 1, id: false}, {number: 2, id: false}, {number: 3, id: false}])
    const url = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/care-nexis/search/' + searchString

    axios.get(url, {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
            cancelToken: source.token,
        })
        .then((response) => {
        const results = response.data.search.data.searchResults
        let articleArray = []
        Object.keys(results).forEach((category, index) => {
        articleArray = articleArray.concat(results[category].filter(result => result.objectType === 'Article'))
})
    articleArray.sort((a, b) => b.searchScore - a.searchScore)
    setNumMatches(articleArray.length)
    setArticles(articleArray.slice(0, 3))
    setLoading(false)

})
.catch(err => {
        console.log(err)
    setLoading(false)
})

    return () => {
        source.cancel()
    }
}, [search])


    return (
        <Grid container direction={"row"} className={classes.trialMatches} >

<Grid item sm={4} xs={12} className={classes.matchesLeft}>
<img src={"/error-icons/image_diagnosis-articles.png"} className={classes.connectImage} alt='connect network'/>
        <Typography component={"h1"} variant={'h1'} className={classes.numMatches}>
    {!loading ? numMatches < 100 ? numMatches : '99+' : '-'}
</Typography>
    <div className={classes.dividerLine}/>
<Typography variant={'h5'} className={classes.countText}>
    Articles  Related to <span style={{fontWeight: 700}}>{intl.formatMessage({ id: search })}</span>
    </Typography>
    </Grid>

    <Grid item sm={8} xs={12} className={error ? classes.matchesRightDisabled : classes.matchesRight}>
        <div className={classes.matchesRightTop}>
<Typography variant='h2' >
        Content For You
    </Typography>
    <FormControl variant="outlined" id='interests' className={classes.selector}>
<Select
    id="interest"
    color={'secondary'}
    value={search}
    onChange={handleChange}
    name='interests'
    disabled={loading}
    inputProps={{
        classes: {
            root: classes.select,
        }
    }}
>
    {profile.interests?  profile.interests.map(interest => {
        return <MenuItem color='secondary' value={interest}>{intl.formatMessage({ id: interest })}</MenuItem>
    }) : null}
</Select>
    </FormControl>
    </div>
    <div className={classes.matchedArticlesContainer} >
    {articles.map((article, i) => renderArticle(article, i))}
</div>
    <Button
    type={"button"}
    className={classes.matchesButton}
    variant={"outlined"}
    color={'secondary'}
    fullWidth
    onClick={() => history.push("/diagnosis/information", {search: intl.formatMessage({ id: search })})}
    startIcon={<OpenInBrowserIcon style={{fontSize: '22px'}}/>}
>
    View All Content Matches
    </Button>
    </Grid>

    </Grid>
)
}



export default ArticleMatches