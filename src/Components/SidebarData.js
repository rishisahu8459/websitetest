import React from 'react'
import BungalowIcon from '@mui/icons-material/Bungalow';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import RouterIcon from '@mui/icons-material/Router';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const SidebarData = [
    {
      title: "Home",
      icon: <BungalowIcon />,
      link: "/dashboard",
    },
    {
      title: "Shop",
      icon: <ShoppingBasketIcon />,
      link: "/shop",
    },
    {
      title: "Router Config",
      icon: <RouterIcon />,
      link: "/router-config", // Update with the correct path
    },
    {
      title: "Help & Support",
      icon: <SupportAgentIcon />,
      link: "/help-support", // Update with the correct path
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      link: "/settings", // Update with the correct path
    },
    {
      title: "People",
      icon: <PeopleAltIcon />,
      link: "/people", // Update with the correct path
    },
    {
      title: "Logout",
      icon: <ExitToAppIcon />,
      link: "/", // Update with the correct path
    }
  ];
  