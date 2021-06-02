import React from 'react';
// import * as IoIcons from "react-icons/io";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'side-nav-text'
    },
    {
        title: 'Subscriptions',
        path: '/subscriptions',
        icon: <MdIcons.MdSubscriptions />,
        cName: 'side-nav-text'
    },
    {
        title: 'History',
        path: '/history',
        icon: <MdIcons.MdHistory />,
        cName: 'side-nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <MdIcons.MdSettings />,
        cName: 'side-nav-text'
    },
    {
        title: 'Watch Later',
        path: '/watchlater',
        icon: <MdIcons.MdWatchLater />,
        cName: 'side-nav-text'
    },
    {
        title: 'Help',
        path: '/help',
        icon: <MdIcons.MdHelp />,
        cName: 'side-nav-text'
    },
]