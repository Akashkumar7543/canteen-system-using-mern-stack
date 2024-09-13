import React from 'react'
import Ecommerce from './Ecommerce';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Ecommerce />
    </div>
  );
}

export default Dashboard;
