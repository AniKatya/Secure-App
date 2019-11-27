import React, {Component} from 'react'
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp'
import '../../styles/contacts.css'


class PhoneNumber extends Component {
    constructor(){
        super()
        this.state = { 
            phoneNumber: 0,
            showInput: false
        }
    }
    showInput = () => this.setState({ showInput: true });

    focusInput = component => component ? component.focus() : null;

    updateContactKeys = e => this.setState({ [e.target.name]: e.target.value });

    deleteUserContact = async() => await this.props.deleteUserContact(this.props.contact._id);

    updateUserContactNumber = async(e) => {
        if(e.which === 13){
            this.setState({ showInput: false })
            return await this.props.updateUserContactNumber(this.props.contact._id, this.state.phoneNumber)
        }
    };

    render() {
        const c = this.props.contact
        return (
            <div className = "contacts-box">
                <HighlightOffSharpIcon className="delete-icon" onClick={this.deleteUserContact}></HighlightOffSharpIcon>
                <span className = "contact-data"><strong>{c.name}: </strong></span>
                {this.state.showInput ? <input ref={this.focusInput} name="phoneNumber" value={this.state.phoneNumber} onChange={this.updateContactKeys} onKeyPress={this.updateUserContactNumber} type="tel"/> :
                 <span onClick={this.showInput} >{c.phoneNumber}</span>}
            </div>
        )
    }
}
export default PhoneNumber