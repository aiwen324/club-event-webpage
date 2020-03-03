import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { blue, red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            backgroundColor: 'seagreen',
            borderColor: 'seagreen',
        },
    },
}));

export default function DashboardAddButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
            >
                New Event
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
            >
                New Survey
            </Button>
        </div>
    );
}