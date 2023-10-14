import {imagesUrl} from './imagesUrl';
import {CategoryIcon, CityIcon, ContentIcon, DashboardIcon} from "../assets/svgs";
//import can from '../store/auth/can.js';

export const mainHeader = [
    {
        title: 'Dashboard',
        // icon: <DashboardIcon/>,
    //     isComingSoon: true,
     },
    {
        title: 'Cities',
        // icon: <CityIcon/>,
    },
    // can("view","Article") && 
    {
        title: 'Content',
        // icon: <ContentIcon/>,
    },

    {
        title: 'Experiences',
        // icon: <CategoryIcon/>,
    },
    {
        title: 'DailyScope',
        // icon: <CategoryIcon/>,
    },
    {
        title: 'Contributors',
        // icon: <CategoryIcon/>,
    },
    {
        title: 'Management',
        // icon: <CategoryIcon/>,
    },
    {
        title: 'Users',
        // icon: <CategoryIcon/>,
    },

];

export const innerHeader = [
    {
        name: 'Pending',
        path: 'pending',
        icon: '',
    },
    {
        name: 'Completed',
        path: 'completed',
        icon: imagesUrl.icons.checkCircleBlue,
    },
];
