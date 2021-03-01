import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import{
    Typography,
    Avatar,
    Grid,
    TableRow,
    TableCell,
    TableHead,
    Table,
    TableBody
} from '@material-ui/core/'
import { motion, AnimatePresence } from "framer-motion";
import Icon from '@mdi/react'
import ExpandMore from '@material-ui/icons/ExpandMore';
import defineInfo from './resourceDictionary';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            marginBottom: theme.spacing(3)
        },
        container: {
            paddingLeft: '20px',
            boxSizing: 'border-box',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: theme.spacing(1),
            borderBottomStyle: 'solid',
            borderWidth: '1px',
            borderColor: theme.palette.secondary.main,
            cursor: 'pointer',
        },
        avatar: {
            backgroundColor: theme.palette.secondary.main,
            height: theme.spacing(7),
            width: theme.spacing(7),
        },
        icon: {
            color: theme.palette.secondary.contrastText,
            height: '70%'
        },
        title: {
            color: theme.palette.secondary.darkest
        },
        subHeader: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        learnMore: {
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: 900,
            color: theme.palette.secondary.main,
        },
        learnMoreSelected: {
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: 900,
            color: theme.palette.secondary.light,
        },
        learnMoreIcon: {
            color: theme.palette.secondary.main
        },
        bodyText: {
            fontSize: '12px',
            lineHeight: '14px',
            marginTop: theme.spacing(2),
            whiteSpace: 'pre-line',
            overflowX: 'scroll'
        },
        subTableCell: {
            border: '1px solid rgba(224, 224, 224, 1)',
        },
        noBorderCell: {
            border: 'none'
        }
    }))

const JourneyEntry = ({item}) => {
    console.log("entry"+item.resource_type);
    const classes = useStyles();
    const [showMore, setShowMore] = useState(false)

    //alert(JSON.stringify(item.result))

    //const list = {1,2,3,4,5}
    var index;
    const toggleShow = () => {
        setShowMore(!showMore)
    }

    const info = defineInfo(item)

    function tableShow()  {
        var i;
        for(i=0;i<item.result.length;i++) {
            return (
                <TableRow>
                <TableCell>
                {item.result[i].reference[i].low} / {item.result[i].reference[i].high}
        </TableCell>
            <TableCell>
            {item.name}
        </TableCell>
            <TableCell>
            {item.category}
        </TableCell>
            </TableRow>
        ) }
    }



    function Content() {
        const data = {...item}
        delete data.id
        delete data.date
        delete data.month
        delete data.year
        delete data.iconType
        const keys = Object.keys(data).filter(key => data[key] && key !== 'notes')

        const formatKey = (string) => {
            return string.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }

        const formatObj = (obj) => {
            if (obj) {
                const keys = Object.keys(obj).filter(k => k && obj[k])
                return (
                    <Table>
                    <TableBody>
                    {keys.map(key => {
                        return (
                    <TableRow key={key}>
                    <TableCell className={classes.subTableCell}>
                {formatKey(key)}
            </TableCell>
                <TableCell className={classes.subTableCell}>
                {typeof obj[key] !== 'object' ? obj[key] : formatValue(obj[key])}
            </TableCell>
                </TableRow>
            )
            })}
            </TableBody>
                </Table>
            )

            } else {
                return undefined
            }
        }

        const formatValue = (value) => {
            return typeof value !== 'object' ?  value : Array.isArray(value) ?
        <Table>
            <TableBody>
            {
                value.filter(k => k).map(v => {
                return (
            <TableRow key={v}>
                <TableCell className={classes.noBorderCell}>
            {formatValue(v)}
        </TableCell>
            </TableRow>
        )
        })
        }
        </TableBody>
            </Table>
        : formatObj(value)
        }

        return (
            <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
    <div className={classes.bodyText} >
    <Table>
        <TableBody>
        {keys.map(key => {
            const value = data[key]
            return (
        <TableRow key={key}>
            <TableCell>
            {formatKey(key)}
            </TableCell>
            <TableCell>
            {formatValue(value)}
            </TableCell>
            </TableRow>
    )
    })}
    </TableBody>
        </Table>
        </div>
        {/* dangerouslySetInnerHTML={{__html: item.text.div}} */}
        </motion.div>
    );
    }

    function ContentNew() {
        const data = {...item}
        delete data.id
        delete data.date
        delete data.month
        delete data.year
        delete data.iconType
        const keys = Object.keys(data).filter(key => data[key] && key !== 'notes')




        //alert(JSON.stringify(keys));

        const formatKey = (string) => {
            return string.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }

        const formatObj = (obj) => {
            if (obj) {
                const keys = Object.keys(obj).filter(k => k && obj[k])

                return (
                    <Table>
                    <TableBody>
                    {keys.map(key => {
                        return (
                    <TableRow key={key}>
                    <TableCell className={classes.subTableCell}>
                {formatKey(key)}
            </TableCell>
                <TableCell className={classes.subTableCell}>
                {typeof obj[key] !== 'object' ? obj[key] : formatValue(obj[key])}
            </TableCell>
                </TableRow>
            )
            })}
            </TableBody>
                </Table>
            )

            } else {
                return undefined
            }
        }

        const formatValue = (value) => {
            return typeof value !== 'object' ?  value : Array.isArray(value) ?
        <Table>
            <TableBody>
            {
                value.filter(k => k).map(v => {
                return (
            <TableRow key={v}>
                <TableCell className={classes.noBorderCell}>
            {formatValue(v)}
        </TableCell>
            </TableRow>
        )
        })
        }
        </TableBody>
            </Table>
        : formatObj(value)
        }




        return (
            <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
    <div className={classes.bodyText} >

    <Table>
        <TableBody>
        {keys.map(key => {

            //alert(JSON.stringify(key))

            if(key!="result" && key!="desc") {

            const value = data[key]
            return (
                <TableRow key={key}>
                <TableCell>
                {formatKey(key)}
                </TableCell>
                <TableCell>
                {formatValue(value)}
                </TableCell>
                </TableRow>
        ) }
    })}
    </TableBody>
        </Table>


        <Table>


        <TableHead>
        <TableRow>
        <TableCell style={{border: "3px solid rgb(0, 0, 0)"}}><h3>Test Description </h3></TableCell>
        <TableCell style={{border: "3px solid rgb(0, 0, 0)"}}><h3>Value Observed </h3></TableCell>
        <TableCell style={{border: "3px solid rgb(0, 0, 0)"}}><h3>Reference Range </h3></TableCell>

        </TableRow>
        </TableHead>


        <TableBody>



        {item.result.map(list => {


//alert(JSON.stringify(list))

            //alert(JSON.stringify(item.result[i].reference))

            // for(j=0;j<item.result.length;i++) {
            return (
        < TableRow >
        < TableCell style={{border: "3px solid rgb(0, 0, 0)"}} >
        {list.display.substring(10)}
    </TableCell >
        < TableCell style={{border: "3px solid rgb(0, 0, 0)"}}>
        {list.valueQuantity?list.valueQuantity.value   :list.value} {list.value?'':list.valueQuantity.unit}
    </TableCell >
        < TableCell style={{border: "3px solid rgb(0, 0, 0)"}}>
        {list.reference?list.reference[0].text : "-"}

    </TableCell >
        < / TableRow >
    )


    })}
    </TableBody>
        </Table>
        </div>
        {/* dangerouslySetInnerHTML={{__html: item.text.div}} */}
        </motion.div>
    );
    }


    if(item.resource_type === "DiagnosticReport")
    {
        return (
            <motion.div layout className={classes.root} key={item.id}>
    <Grid container >
    <Grid item xs={1}>
        <motion.div layout>
    <Avatar className={classes.avatar}>
    <Icon
        path={info.icon}
        className={classes.icon}
    />
    </Avatar>
    </motion.div>
    </Grid>

    <Grid item xs={11} className={classes.container}>
    <motion.div layout className={classes.header} onClick={toggleShow}>
        <Typography variant='h4' className={classes.title}>
        {item.desc}
    </Typography>
    <div className={classes.subHeader}>
    <Typography variant='body1' className={showMore ? classes.learnMoreSelected : classes.learnMore}>
        Learn More
    </Typography>
    <motion.div
        animate={showMore ? { rotate: -90 } : { rotate: 0 }}
            >
            <ExpandMore className={classes.learnMoreIcon}/>
    </motion.div>
    </div>
    </motion.div>
    <AnimatePresence>{showMore && <ContentNew />}</AnimatePresence>
    </Grid>
    </Grid>
    </motion.div>
    )
    }

    else {

        return (
            <motion.div layout className={classes.root} key={item.id}>
    <Grid container >
        <Grid item xs={1}>
            <motion.div layout>
        <Avatar className={classes.avatar}>
    <Icon
        path={info.icon}
        className={classes.icon}
    />
    </Avatar>
        </motion.div>
        </Grid>

        <Grid item xs={11} className={classes.container}>
    <motion.div layout className={classes.header} onClick={toggleShow}>
            <Typography variant='h4' className={classes.title}>
        {item.desc}
    </Typography>
        <div className={classes.subHeader}>
    <Typography variant='body1' className={showMore ? classes.learnMoreSelected : classes.learnMore}>
            Learn More
        </Typography>
        <motion.div
        animate={showMore ? { rotate: -90 } : { rotate: 0 }}
            >
            <ExpandMore className={classes.learnMoreIcon}/>
    </motion.div>
        </div>
        </motion.div>
        <AnimatePresence>{showMore && <Content />}</AnimatePresence>
        </Grid>
        </Grid>
        </motion.div>
    )
    }

}
export default JourneyEntry


