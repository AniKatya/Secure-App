import React, { Component } from 'react';
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import '../../styles/PlayRingtone.css'
import ringtone from "../materialComps/ringtone.mp3"

class PlayRingtone extends Component {
  playAudio(){
    new Audio(ringtone).play()
  };

  render(){
    return(
        <div id="playRingtoneContainer">
        <PhonelinkRingTwoToneIcon onClick={this.playAudio} id="playRingtoneIcon"/>
        </div>
    );
 }
}

export default PlayRingtone;