import React from 'react'
import styled from 'styled-components';
import {Logo} from '../components/index';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main1.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
          Experience seamless job hunting, personalized recommendations, and exclusive access to diverse career growth prospects. Unlock the door to your dream job with us today!
          </p>
          <Link to='/register' className='btn register-link'>Register</Link>
          <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <img src={main} alt="job road" className='img main-img' />
      </div>
    </Wrapper>
  )
};


export default Landing
