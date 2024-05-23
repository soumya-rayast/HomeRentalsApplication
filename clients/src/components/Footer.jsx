import React from 'react'
import {Location,LocalPhone,Email} from "@mui/icons-material"
import "../Styles/Footer.scss"
const Footer = () => {
    return (
<div className="footer">
    <div className="footer_left">
        <a href="/"><img src="/assests/logo.png" alt="logo" /></a>
    </div>
    <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
            <li>About us</li>
            <li>Terms and Condition</li>
            <li>Return and Refund Policy</li>
        </ul>
    </div>
    <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
            <LocalPhone/>
            <p>89709487287</p>
        </div>
        <div className="footer_right_info">
            <Email/>
            <p>stayeaseRental@gmail.com</p>
        </div>
        <img src="/assests/payment.png" alt="payment" />
    </div>
</div>
    )
}

export default Footer
