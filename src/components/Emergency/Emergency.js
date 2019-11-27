import React, { Component } from 'react';
import Help from './Help';
import CallPolice from './CallPolice';
import PlayRingtone from './PlayRingtone';
import SendLocationToEC from './SendLocationToEC';
import '../../styles/emergency.css'


class Emergency extends Component {
  render(){
    return(
        <div className="emergencyContainer">
          <Help />
          <div className = "emergency-buttons-container">
          <SendLocationToEC />
          <CallPolice />
          <PlayRingtone />
          </div>
        </div>
    );
 }
}

export default Emergency;