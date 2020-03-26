import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    // '& > *': {
    margin: theme.spacing(1),
    backgroundColor: "seagreen",
    borderColor: "seagreen",
    // },
    "&:hover": {
      backgroundColor: "#5ac3ec",
      borderColor: "#5ac3ec"
    }
  }
}));

export default function DashboardAddButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        component={RouterLink}
        to="/admin/edit_announce"
      >
        New Event
      </Button>
      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        component={RouterLink}
        to="/admin/edit_announce"
      >
        New Survey
      </Button>
    </div>
  );
}
