import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker } from "@material-ui/pickers";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const useStyles = makeStyles((theme) => ({ 
    root: {
        width: '100%',
        paddingRight: '50px',
        boxSizing: 'border-box'
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    box: {
        marginBottom: theme.spacing(3),
        borderBottomStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey.light,
        paddingBottom: theme.spacing(1.5),
        
    },
    selectedSort: {
        color: theme.palette.secondary.main
    },
    datePicker: {
        marginBottom: theme.spacing(2),
    },
    input: {
        height: '40px',
        backgroundColor: theme.palette.grey.pale,
        '& input': {
            fontSize: '1.125rem'
        },
        '& MuiInputAdornment-root': {
            color: theme.palette.primary.main
        }
    },
    dateTitle: {
        fontSize: '0.875rem'
    },
    dateIcon: {
        color: theme.palette.primary.main + '!important',
    },
    showMoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(-1),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    showMoreText: {
        color: theme.palette.primary.main,
        fontWeight: 900
    }
}))

const Filters = ({sort, setSort, physNet, handleChangePhys, startDate, endDate, setStartDate, setEndDate, sources, setSources}) => {

   // alert(JSON.stringify(physNet))
    const classes = useStyles();
    const [showMore, setShow] = useState(false)

    const handleChangeSort = (event) => {
        setSort(event.target.value);
    }

    const handleChangeSources = (event) => {
        //alert("check"+event.target.name);
        const newSources = {...sources}
        newSources[event.target.name] = !newSources[event.target.name]
        setSources(newSources)
    }

    const toggleShow = () => {
        setShow(!showMore)
    }

    function Content() {
        return (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {Object.keys(sources).slice(5).map(key => {
                    return (
                        <FormControlLabel
                        key={key}
                        control={<Checkbox checked={sources[key]} onChange={handleChangeSources} name={key} />}
                        label={key}
                        />
                        )
                    })}
            </motion.div>
        );
    }

    return (
        <div className={classes.root}>
            <AnimateSharedLayout>

                <Typography variant='h5' className={classes.title}>Filter Results</Typography>

                <motion.div layout className={classes.box}>
                    <Typography variant='h6'>Sort By</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="sort by" name="sort1" value={sort} onChange={handleChangeSort}>
                            <FormControlLabel value="newest" control={<Radio />} className={sort === 'newest' ? classes.selectedSort : classes.unselectedSort} label="Newest" />
                            <FormControlLabel value="oldest" control={<Radio />} className={sort === 'oldest' ? classes.selectedSort : classes.unselectedSort} label="Oldest" />
                        </RadioGroup>
                    </FormControl>
                </motion.div>

                <motion.div layout className={classes.box}>
                    <Typography variant='h6'>Date Range</Typography>

                    <Typography variant='body1' className={classes.dateTitle}>Start Date</Typography>
                    <KeyboardDatePicker
                            id="startDate"
                            disableFuture
                            inputVariant="outlined"
                            format="yyyy/MM/dd"
                            className={classes.datePicker}
                            fullWidth
                            value={startDate}
                            maxDate={new Date()}
                            invalidDateMessage={null}
                            onChange={date => setStartDate(date)}
                            InputProps={{className: classes.input}}
                            KeyboardButtonProps={{className: classes.dateIcon}}
                            />

                    <Typography variant='body1' className={classes.dateTitle}>End Date</Typography>
                    <KeyboardDatePicker
                            id="endDate"
                            disableFuture
                            inputVariant="outlined"
                            format="yyyy/MM/dd"
                            className={classes.datePicker}
                            fullWidth
                            minDate="1900/01/01"
                            value={endDate}
                            invalidDateMessage={null}
                            onChange={setEndDate}
                            InputProps={{className: classes.input}}
                            KeyboardButtonProps={{className: classes.dateIcon}}
                            />
                </motion.div>

                <motion.div layout className={classes.box}>
                    <Typography variant='h6'>Sources</Typography>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            <motion.div layout>
                                {Object.keys(sources).slice(0, 5).map(key => {
                                    return (
                                        <FormControlLabel
                                        control={<Checkbox checked={sources[key]} onChange={handleChangeSources} name={key} />}
                                        label={key}
                                        key={key}
                                        />
                                        )
                                    })}
                            </motion.div>
                            <AnimatePresence>{showMore && <Content />}</AnimatePresence>
                        </FormGroup>
                    </FormControl>
                    <div className={classes.showMoreContainer} onClick={toggleShow}>
                        <Typography variant='body1' className={classes.showMoreText}>{showMore ? 'Show Less' : 'Show More'}</Typography>
                        {showMore ? <ExpandLess/> : <ExpandMore/>}
                    </div>
                </motion.div>

                <motion.div layout className={classes.box}>
                    <Typography variant='h6'>Physicians/Network</Typography>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            {physNet.map(item => {
                                return (
                                    <FormControlLabel
                                    control={<Checkbox checked={!!item.selected} onChange={handleChangePhys} name={item.name} />}
                                    label={item.name}
                                    key={item.id}
                                    />
                                    )
                                })}
                        </FormGroup>
                    </FormControl>
                </motion.div>

            </AnimateSharedLayout>
        </div>
    )

}

export default Filters