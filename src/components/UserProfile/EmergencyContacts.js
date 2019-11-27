import React, { Component } from 'react'
import PhoneNumber from './PhoneNumber'
import apiClient from '../../apiClient'
import { observer, inject } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../styles/contacts.css'


@inject('UserStore')
@observer
class EmergencyContacts extends Component {
    constructor() {
        super()
        this.state = {
            contacts: [],
            name: "",
            phoneNumber: ""
        }
    }

    getAllContacts = async () => {
        const contactsInfo = await apiClient.getAllContacts()
        const contacts = contactsInfo.data
        this.setState({ contacts })
    };

    componentDidMount = async () => await this.getAllContacts();

    updateContactKeys = e => this.setState({ [e.target.name]: e.target.value });

    addNewContact = async () => {
        await apiClient.addUserContact(this.state.name, this.state.phoneNumber)
        await this.getAllContacts()
    };

    deleteUserContact = async (id) => {
        await apiClient.deleteUserContact(id)
        await this.getAllContacts();
    };

    updateUserContactNumber = async (id, phoneNumber) => {
        await apiClient.updateUserContactNumber(id, phoneNumber)
        await this.getAllContacts()
    };

    render() {
        const contacts = this.state.contacts
        return (
            <div className="emergency-contacts-container">
                <h3 id="comp-header">ADD EMERGENCY CONTACT</h3>
                <div style={{ marginTop: "20px" }}>
                    {contacts ? contacts.map(c =>
                        <PhoneNumber key={c._id} contact={c} deleteUserContact={this.deleteUserContact} updateUserContactNumber={this.updateUserContactNumber} />
                    ) : null}
                </div>
                <div className="name-container" style={{ marginTop: "50px" }}>
                    <div id="header-name">Name:</div>
                    <TextField id = "input-name" name="name" value={this.state.name} onChange={this.updateContactKeys} type="text" />
                </div>

                <div className="phone-container">
                    <div id="header-phone">Phone Number: </div>
                    <TextField id = "input-phone" name="phoneNumber" value={this.state.phoneNumber} onChange={this.updateContactKeys} type="text" />
                </div>
                <Button id = "addcontact-button" variant="contained" color="primary" onClick={this.addNewContact}>Add</Button>
            </div>
        )
    }
}
export default EmergencyContacts