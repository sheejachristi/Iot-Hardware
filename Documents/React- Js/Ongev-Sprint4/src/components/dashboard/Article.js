import React, {useEffect, useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import{
    Typography,
    Button,
} from '@material-ui/core/'
import Skeleton from '@material-ui/lab/Skeleton';
import {useHistory} from 'react-router-dom'
import axios from '../../utils/axios'
import { UserContext } from '../../context/user-context'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(5),
    },
    imageContainer: {
        backgroundColor: theme.palette.secondary.contrastText,
        flex: '0 0 auto',
        height: '200px',
        width: '200px',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    textContainer: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        color: theme.palette.secondary.dark,
        fontSize:'28px',
        marginBottom:'20px'
    },
    bodyText: {
        height: '100px',
        width: '100%',
        overflow: 'hidden',
        fontSize:'16px'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    learnButton: {
        width: '180px',

    }
}))

const Article = ({id, title, count, searchScore}) => {
    const classes = useStyles();
    const history = useHistory()
    const [, dispatch] =useContext(UserContext)
    const [article, setArticle] = useState(false)

    const imageURL = '/health/health' + count + '.png'

    useEffect(() => {
        setArticle(false)
        if (id) {
            const source = axios.CancelToken.source()

            axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/care-nexis/article/' + id,
            { 
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
                cancelToken: source.token,
            })
            .then((response) => {
                const result = response.data.articles.data.articles[id]
                setArticle(result)
            })
            .catch((error) => {
                if (error.response && error.response.data === 'Token is expired') {
                    console.log('Token is expired')
                    dispatch(({type: 'token expired'}))
                    history.push("/signin", {ongevRoute: "/diagnosis/information"})
                }
                console.log('Error ', error)
            })
            return () => {
                source.cancel()
            }
        }
    }, [id, dispatch, history])

    const bodyTemplate = () => {
        //return `The article, "${title}", does not have a summary. Relevancy score: ${searchScore.toFixed(2)}`
        //return `The article, "${title}"`
        return null
    }


    if (id) {
        return (
                <div className={classes.root}>
        {/*<div className={classes.imageContainer}>
                        <img src={imageURL} className={classes.image} alt={title}/>
                    </div>*/}

                    <div className={classes.textContainer}>
                        <Typography  className={classes.title}>
                            {title}
                        </Typography>

        {/* {article ?
                        <Typography variant='body1' className={classes.bodyText}>
                            {article.secondaryText ? article.secondaryText : bodyTemplate()}
                        </Typography> :
                        <Skeleton width={'100%'}  height={'90px'} animation={'pulse'} />
                        }*/}

                        <Button
                        disabled={!article}
                        variant='contained'
                        color='secondary'
                        className={classes.learnButton}
                        startIcon={<OpenInNewIcon style={{fontSize: '22px'}}/>}
                        onClick={() => history.push("/diagnosis/information", {article: article, previous: 'dashboard'})}>
                            Read More
                        </Button>
                    </div>
                </div>

        )
    } else {
        return (
            <Skeleton width={'100%'} className={classes.root} height={'100px'} animation={'pulse'} />
        )
    }
    
}

export default Article