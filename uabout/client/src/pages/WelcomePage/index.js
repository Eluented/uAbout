import styled from "styled-components";
import { AccountBox } from '../../components'

import logo from './pics/UAbout2.png';
import './index.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus, faAnglesRight, faCalendarDays } from "@fortawesome/free-solid-svg-icons";


const WelcomePage = () => {

    return (
        <>
            <div class="ParentContainer">
                <div class= "WelcomeContainer">
                    <img src={logo} style={{  marginBottom: "-1.5%", marginTop: "-15%"}}width="60%" />
<br></br>
                    <ul style={{ "list-style-type": "none" }}>
                        <li><FontAwesomeIcon icon={faAnglesRight} size="1x" />__  All your friends using different communication platforms?</li>
                        <br></br>
                        <li><FontAwesomeIcon icon={faAnglesRight} size="1x" />__  Tired of rounding them up for a get-together?</li>
                        <br></br>
                        <li><FontAwesomeIcon icon={faAnglesRight} size="1x" />__  Fed-up having to message every single person individually?</li>
                    </ul>
                    <h4 style={{  fontWeight: "normal",  marginBottom: "-1%", marginTop: "0",  textDecoration: "underline"}}>That's where we come in</h4>
                    <p style={{  marginBottom: "-1%"}}><FontAwesomeIcon icon={faSearch} size="1x" />    Search for your friends by their name or username</p>
                    <p style={{  marginBottom: "-1%"}}><FontAwesomeIcon icon={faUserPlus} size="1x" />    Create an event and invite all of your uAbout friends...or just the ones you <em>really</em> like!</p>
                    <p style={{  marginBottom: "-1%"}}><FontAwesomeIcon icon={faCalendarDays} size="1x" />    Keep up to date with your social calendar &amp; enjoy making plans again!</p>
                   
                </div>
                <div class="FormContainer">
                    <AccountBox />
                </div>
            </div>

        </>




    );

}


export default WelcomePage;