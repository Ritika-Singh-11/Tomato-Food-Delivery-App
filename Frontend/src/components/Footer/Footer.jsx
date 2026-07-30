import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt=''/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos beatae minus tenetur rerum dolores. Excepturi, ipsa esse sit officiis ullam libero sunt. Earum, et temporibus id ipsa fugiat veniam ducimus.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
       <h2>COMPANY</h2>
       <ul>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>DELEIVERY</li>
        <li>PRRIVACY POLICY</li>
       </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET INN TOUGH</h2>
            <ul>
                <li>+1-212-456-7890  </li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2026 @ Tomato.com -All Right Reserved</p>
    </div>
  )
}

export default Footer
