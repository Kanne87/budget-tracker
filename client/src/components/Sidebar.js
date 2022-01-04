import React from 'react';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import PaymentsIcon from '@mui/icons-material/Payments';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function Sidebar() {
   return (
      <div className='sidebar'>
         <div className='sidebarWrapper'>
            <div className='sidebarMenu'>
               <h3 className='sidebarTitle'>
                  Dashboard
               </h3>
               <ul className="sidebarList">
                  <li className="sidebarListItem"><PaymentsIcon /> Budget</li>
                  <li className="sidebarListItem"><ShowChartIcon /> Monitor</li>
               </ul>
            </div>
         </div>
      </div>
   )
}
