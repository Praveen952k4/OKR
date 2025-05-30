import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../assets/assets'; // Adjust path if needed
import { useAuth } from '../contexts/AuthContext';
import { FaBullseye, FaSignOutAlt } from 'react-icons/fa';

const SideBar = ({ isCollapsed }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Icon size: bigger when collapsed, smaller when expanded
  const iconSizeClass = isCollapsed ? 'w-8 h-8' : 'w-5 h-5';

  return (
    <div
      className={`
        ${isCollapsed ? 'w-20' : 'w-64'} 
        transition-all duration-300 
        bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-700 
        flex flex-col h-full
        select-none
      `}
    >
      {/* Logo */}
      <div
        className={`
          p-4 border-b border-gray-200 dark:border-gray-700
          flex items-center justify-center
          ${!isCollapsed ? 'justify-start space-x-3' : ''}
        `}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center w-12 h-12">
          <FaBullseye className={`text-white ${isCollapsed ? 'w-8 h-8' : 'w-6 h-6'}`} />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl text-gray-900 dark:text-white">OKR Pro</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-1 py-3">
        <ul className="flex flex-col items-center space-y-1">
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.route;
            const Icon = item.icon;
            return (
              <li key={item.label} className="w-full">
                <Link
                  to={item.route}
                  className={`
                    group flex items-center
                    justify-center ${!isCollapsed ? 'justify-start px-4' : ''}
                    w-full h-12 rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={iconSizeClass} />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
  <div
    className={`
      flex items-center
      ${isCollapsed ? 'flex-col space-y-1 text-center' : 'space-x-3'}
      justify-center
    `}
  >
    <img
      src={
        user?.avatar ||
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
      alt={user?.name || 'User'}
      className={`rounded-full ${isCollapsed ? 'w-12 h-12' : 'w-8 h-8'}`}
    />

    <div className={isCollapsed ? 'text-xs' : 'flex-1'}>
      <p className={`font-medium text-gray-900 dark:text-white ${isCollapsed ? 'text-sm' : 'text-base'}`}>
        {user?.name || 'Praveen'}
      </p>
      <p className={`text-gray-500 dark:text-gray-400 capitalize ${isCollapsed ? 'text-xs' : 'text-sm'}`}>
        {user?.role || 'Manager'}
      </p>
    </div>

    <button
      onClick={logout}
      className={`
        ${isCollapsed ? 'mt-2' : ''}
        h-8 w-8 p-0 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-600
      `}
      title="Logout"
    >
      <FaSignOutAlt className={isCollapsed ? "w-6 h-6" : "w-5 h-5"} />
    </button>
  </div>
</div>


    </div>
  );
};

export default SideBar;
