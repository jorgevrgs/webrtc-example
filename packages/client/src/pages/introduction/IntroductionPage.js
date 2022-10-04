import React from 'react';
import logo from '../../assets/images/logo.png';
import './IntroductionPage.css';

export default function IntroductionPage() {
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} alt="logo" />
        Buttons
      </div>
    </div>
  );
}
