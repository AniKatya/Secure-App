import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwipeableTemporaryDrawer from './SideBar'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor:"#1d2a33"}} position="static">
        <Toolbar>
            <SwipeableTemporaryDrawer />
          <Typography style={{marginLeft:"70px",color: "#3B8EA5",fontWeight:"bold",fontFamily:'Work Sans'}} variant="h5" className={classes.title}>
            RescYouMe
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}