import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Links from '../utils/Links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({isSidebar}) => {
  const {toggleSidebar, user} = useDashboardContext();

  return (
    <div className="nav-links">
        {Links.map((link) => {
            const {text, path, icon} = link;
            const { role } = user;
            if(path === 'admin' && role !== 'admin') return;
            return <NavLink to={path} key={text} className='nav-link' onClick={isSidebar? null : toggleSidebar} end>
            <span className="icon">{icon}</span>
            {text}
            </NavLink>
        })}
    </div>
  )
}

export default NavLinks
