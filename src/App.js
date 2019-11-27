/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import SignUp from './components/Register/SignUp.js';
// import EmergencyContacts from './components/UserProfile';
import Sos from './components/Sos/Sos';
import UserProfile from './components/UserProfile/UserProfile'
import Emergency from './components/Emergency/Emergency'
import { BrowserRouter as Router, Route} from 'react-router-dom'
// import Register from './components/Register';
import '../src/styles/style.css'
//Material UI
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ButtonAppBar from './components/materialComps/AppBar'
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom'

const theme = createMuiTheme({ palette: { primary: { main: '#EAC563' } } });

@inject('UserStore')
@observer
class App extends Component {
  constructor(){
    super()
    this.state = { name: "" }
  }

  componentWillMount = () => localStorage.name ? this.setState({ name: localStorage.name }) : null;
  
  updateCondition = name => this.setState({ name });

  render() {
    const name = this.state.name
    return (
      <Router>
        {name !== "" ?<ButtonAppBar /> : null}
        <MuiThemeProvider theme={theme}>
          <AppBar position="static"></AppBar>
        </MuiThemeProvider>
        <Route path="/" exact render={() => <SignUp updateCondition={this.updateCondition} />} />
        {name !== "" ? <Route path="/sos" exact render={() => <Sos />} />: <Redirect to='/' />}
        {name !== "" ? <Route path="/userProfile" exact render={() => <UserProfile />} />: <Redirect to='/' />}
        {name !== "" ? <Route path="/emergency" exact render={() => <Emergency />} /> : <Redirect to='/' />}
      </Router>
    )
  }
}

export default App;
