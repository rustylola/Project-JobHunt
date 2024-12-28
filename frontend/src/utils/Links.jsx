import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const Links = [
    {
        text: 'Dashboard', 
        path: '.',
        icon: <IoBarChartSharp />,
    },
    {
        text: 'add job', 
        path: 'addjob',
        icon: <FaWpforms />,
    },
    {
        text: 'All job', 
        path: 'alljobs',
        icon: <MdQueryStats />,
    },
    {
        text: 'profile', 
        path: 'profile',
        icon: <ImProfile />,
    },
    {
        text: 'admin', 
        path: 'admin',
        icon: <MdAdminPanelSettings />,
    }
];
export default Links;
