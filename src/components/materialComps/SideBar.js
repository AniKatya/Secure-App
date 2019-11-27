import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PublicIcon from '@material-ui/icons/Public';
import '../../styles/appbar.css'
import Logo from "../materialComps/logo_transparent.png" 
import { black } from 'material-ui/styles/colors';
// import { ActionImportantDevices } from 'material-ui/svg-icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List className = "sidebar-container">
          <img src={Logo} alt="" id = "sidebar-logo" />
          <Divider />
          <ListItem>
             <ListItemIcon className = "sidebar-icon">  
                <PersonIcon />
             </ListItemIcon>
             <Button >
               <Link className="links" to="/userProfile" className = "sidebar-link">user Profile</Link>
             </Button>
          </ListItem>
          <ListItem>
             <ListItemIcon className = "sidebar-icon">
               <DirectionsRunIcon />
             </ListItemIcon>
             <Button >
               <Link className="links" to="/emergency" className = "sidebar-link">emergency</Link>
             </Button>
          </ListItem>
          <ListItem>
             {/* <ListItemIcon className = "sidebar-icon">
                <PublicIcon />
             </ListItemIcon> */}
             {/* <Button >
                <Link className="links" to="/sos" id="sos-link" className = "sidebar-link">SOS</Link>
             </Button> */}
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
    <MenuIcon onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton}>
    </MenuIcon>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
        onOpen={toggleDrawer('top', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </div>
  );
}
