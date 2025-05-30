import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Collapse sidebar on initial load if on a small screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true); // Tailwind's md breakpoint
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize(); // Run once on mount

    window.addEventListener('resize', handleResize); // Update on window resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <SideBar isCollapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Home;
