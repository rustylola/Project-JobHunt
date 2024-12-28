import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import Links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';

const SidebarMobile = () => {
  const {showSidebar, toggleSidebar} = useDashboardContext();
  // console.log(Links);

  return (
    <Wrapper>
      <div className={showSidebar? "sidebar-container show-sidebar":'sidebar-container'}>
        <div className="content">
          <button type="button" className='close-btn' onClick={toggleSidebar}>
            <FaTimes/>
          </button>
          <header>
            <Logo/>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SidebarMobile
