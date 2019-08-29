/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PublicIcon from '@material-ui/icons/Public';
import Logo from "../materialComps/logo_transparent.png" 

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
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
      <List>
          <img src={Logo} style={{width: "250px", height: "250px"}} />
          <Divider style={{marginTop:"-40px"}}/>
          <ListItem style={{marginTop:"20px"}}>
             <ListItemIcon style={{marginRight:"-20px"}}><PersonIcon /></ListItemIcon>
             <Button ><Link className="links" to="/userProfile" style={{color:"black", textDecorationLine:"none"}}>user Profile</Link></Button>
          </ListItem>
          <ListItem>
             <ListItemIcon style={{marginRight:"-22px"}}><AssignmentIndIcon /></ListItemIcon>
             <Button ><Link className="links" to="/register" style={{color:"black", textDecorationLine:"none"}}>register</Link></Button>
          </ListItem>
          <ListItem>
             <ListItemIcon style={{marginRight:"-20px"}}><DirectionsRunIcon /></ListItemIcon>
             <Button ><Link className="links" to="/emergency" style={{color:"black", textDecorationLine:"none"}}>emergency</Link></Button>
          </ListItem>
          <ListItem>
             <ListItemIcon style={{marginRight:"-30px"}}><PublicIcon /></ListItemIcon>
             <Button ><Link className="links" to="/sos" style={{color:"black", textDecorationLine:"none"}}>SoS</Link></Button>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>

    <MenuIcon style={{marginTop:"5px"}} onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
