import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiClient from '../../apiClient';
import { observer, inject } from 'mobx-react';
import '../../styles/signUp.css'
import Logo from "../materialComps/logo_transparent.png"
import { Redirect } from 'react-router-dom'
import { urlBase64ToUint8Array } from '../../client'

@inject('UserStore')
@observer

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            name: "",
            email: "",
            address: ""
        }
    }

    updateSignUpState = () => this.props.updateCondition(this.state.name);

    addUserData = async() => {

        !this.state.name || !this.state.email ? alert('please fill empty fields') : this.updateSignUpState()

        localStorage.setItem("name", this.state.name)

        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords
            this.props.UserStore.updateVictimLocation(coords.latitude.toFixed(6), coords.longitude.toFixed(6))
        })

        const publicVapidKey = "BJ0EZi8Bbg3qs7GFg1t9ItYQTu9XyRC2e1Goph9BabRVq6M9nFdmz--aAokvfbq9T9lkerpvTOf0Npv9hvJ4N2k";
        const register = await navigator.serviceWorker.register("/worker.js", { scope: "/" });
        const endpoint = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        })

        const subscription = JSON.stringify(endpoint)
        let existingUser = await apiClient.findUser(this.state.name, this.state.email);

        if (existingUser.data) {
            this.props.UserStore.updateCurrentUserID(existingUser.data._id)
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const coords = pos.coords
                const addressCoded = await apiClient.getDecodedAddress(coords.latitude, coords.longitude)
                const address = addressCoded.data.results[0].formatted_address
                await apiClient.updateUser(coords.latitude, coords.longitude, address, subscription)
            })
        }else {
            const s = this.state
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const coords = pos.coords
                const addressCoded = await apiClient.getDecodedAddress(coords.latitude, coords.longitude)
                const address = addressCoded.data.results[0].formatted_address
                await apiClient.addNewUser(s.name, s.email, coords.latitude, coords.longitude, address, subscription)
                const newUser = await apiClient.findUser(s.name, s.email)
                this.props.UserStore.updateCurrentUserID(newUser.data._id)
            })
        }
        this.setRedirect()
    }

    setRedirect = () => this.setState({ redirect: true });

    renderRedirect = () => this.state.redirect ? <Redirect to='/emergency' /> : null

    saveUserData = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className = "signup-container">
                <img id="logo" src={Logo} style={{}} alt=''/>
                <div className = "name-container">
                    <span id="name-header">Your Name: </span>
                    <TextField id="name-input"  name="name" type="text" onChange={this.saveUserData} />
                </div>
                <div className = "email-container">
                    <span id="email-header">Your Email: </span>
                    <TextField className = "input" id="email-input" name="email" type="text" onChange={this.saveUserData} />
                </div>
                {this.renderRedirect()}
                <Button id="register-button" variant="contained" onClick={this.addUserData}>Enter</Button>
            </div>
        );
    }
}
export default SignUp;