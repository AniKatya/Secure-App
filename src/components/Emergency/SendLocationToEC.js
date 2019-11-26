/* eslint-disable no-unused-expressions */
import React, {Component} from 'react'
import apiClient from '../../apiClient'
import { inject } from 'mobx-react';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import Link from '@material-ui/core/Link';
import '../../styles/location.css'

@inject("UserStore")
class SendLocationToEC extends Component {
    constructor(){
        super()
        this.state = {
            contacts: [],
            address: "",
            currentLocation: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentDidMount = async() => await this.sendTextToUserContacts();

    sendTextToUserContacts = async() => {
        await navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords
            this.setState({ 
                currentLocation: { 
                    latitude: coords.latitude, 
                    longitude: coords.longitude 
                }
            })
            this.updateAddress()
        })
        await this.getAllContacts()
    };

    updateAddress = async () => {
        const state = this.state.currentLocation
        let data =  await apiClient.getDecodedAddress(state.latitude, state.longitude)
        let address = data.data.results[0].formatted_address
        this.setState({ address })
    };

    getAllContacts = async() => {
        const contactsInfo = await apiClient.getAllContacts()
        const contacts = contactsInfo.data
        this.setState({ contacts })
    };

    cleanPhoneNumbers = () => this.state.contacts.map(c => c.phoneNumber).map(c => c.slice(1, c.length)).map(c => `+972${c}`);

    render() {
        const userName = this.props.UserStore.currentUser.name
        // let contactNumbers = this.cleanPhoneNumbers()
        // const cleanNumbers = contactNumbers.join(",")
        const sms = `sms:+972546830028?body=Your friend, ${userName}, is feeling unsafe. ${userName} is located at ${this.state.address}`
        return (
            this.state.address ? 
            <div id="locationContainer" >
                <Link  href={sms}><ChatTwoToneIcon id="locationIcon"/></Link>
            </div>: null
        )
    }
}
export default SendLocationToEC