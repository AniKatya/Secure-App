import React, { Component } from 'react';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';import '../../styles/Help.css'
import { alert } from "../../service"
import { observer, inject } from 'mobx-react';
import apiClient from '../../apiClient';


@inject('UserStore')
@observer

class Help extends Component {

  saveCurrentLocation = async () => {
    let latitude = this.props.UserStore.latitude
    let longitude = this.props.UserStore.longitude
    let data =  await apiClient.getDecodedAddress(latitude, longitude)
    let address = data.data.results[0].formatted_address
    await apiClient.updateUserLocation(latitude, longitude, address)
    alert()
  }

  render(){
    return(
      <div id="helpContainer">
        <ErrorTwoToneIcon id="helpIcon" onClick = {this.saveCurrentLocation}/>
      </div>
    );
 }
}

export default Help;