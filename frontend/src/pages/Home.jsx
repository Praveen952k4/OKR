import React, { useState } from 'react';
import Header from '../components/Header';

import SideBar from '../components/SideBar';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (

    <div className=" flex bg-gray-50 dark:bg-gray-900">
      <SideBar isCollapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">
          <Dashboard />
          {/* You can render children or dashboard widgets here */}
        </main>
      </div>
    </div>
  );
};

export default Home;
