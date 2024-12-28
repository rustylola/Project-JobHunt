import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, Sidebar, SidebarMobile } from '../components'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () =>{
  try{
    const { data } = await customFetch.get('/users/current-user'); 
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  // console.log(user);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const toggleDarkTheme = async () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
    console.log('toggle dark theme');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
    console.log('User Loggout');
  };
  
  return (
    <DashboardContext.Provider value={
      {user, showSidebar,isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}
      }>
      <Wrapper>
        <main className="dashboard">
          <Sidebar />
          <SidebarMobile />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;