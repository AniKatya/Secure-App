import React, { Component } from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from '@material-ui/core/Link';
import '../../styles/police.css'

class CallPolice extends Component {

  render(){
    return(
        <div id="policeContainer">
         <Link href="tel:+972546830028"><PhoneIcon id="policeIcon" className = "emergency-button" ></PhoneIcon></Link>
        </div>
    );
 }
}
export default CallPolice;