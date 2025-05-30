import React, { useState } from 'react';
import { Shield, Users, Settings, BarChart3, Database, UserCheck, UserX, Crown } from 'lucide-react';

const AdminPanel = () => {
  const [userFilter, setUserFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-07-10',
      okrsCount: 12,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-07-09',
      okrsCount: 8
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'member',
      status: 'active',
      lastLogin: '2024-07-08',
      okrsCount: 5
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'manager',
      status: 'inactive',
      lastLogin: '2024-06-15',
      okrsCount: 3
    }
  ];

  const systemStats = [
    {
      title: 'Total Users',
      value: '247',
      change: '+12 this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active OKRs',
      value: '1,234',
      change: '+89 this week',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: 'Excellent',
      icon: Database,
      color: 'purple'
    },
    {
      title: 'Admin Actions',
      value: '56',
      change: 'Last 24h',
      icon: Shield,
      color: 'orange'
    }
  ];

  // Helpers for badge colors
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 text-yellow-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'manager': return <Settings className="w-4 h-4 text-blue-600" />;
      default: return <UserCheck className="w-4 h-4 text-gray-600" />;
    }
  };

  // Filtering users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = userFilter === 'all' || user.status === userFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 mt-2">Manage users, system settings, and platform administration</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-600 px-3 py-1 rounded hover:bg-gray-800 transition">
            <Database className="w-4 h-4" />
            <span>System Logs</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition">
            <Settings className="w-4 h-4" />
            <span>System Settings</span>
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-gray-900 rounded-lg p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-800`}>
                <Icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* User Management */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center space-x-2 text-xl font-semibold">
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </h2>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition">
            <UserCheck className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            style={{ minWidth: '250px' }}
          />
          <select
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            style={{ minWidth: '180px' }}
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            style={{ minWidth: '180px' }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 border border-gray-700 rounded hover:bg-gray-800 transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-white text-lg font-bold">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-bold">{user.okrsCount}</div>
                  <div className="text-xs text-gray-400">OKRs</div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-sm font-semibold ${getRoleBadgeColor(user.role)}`}
                  >
                    {getRoleIcon(user.role)}
                    <span>{user.role}</span>
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${getStatusBadgeColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition text-sm">
                    Edit
                  </button>
                  {user.status === 'active' ? (
                    <button className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-700 hover:text-white transition">
                      <UserX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-700 hover:text-white transition">
                      <UserCheck className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500">No users found matching filters.</p>
          )}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="flex items-center space-x-2 text-xl font-semibold mb-4">
            <Database className="w-5 h-5" />
            <span>System Health</span>
          </h3>
          {[{
            label: 'Database Performance',
            value: 98,
            display: '98%'
          }, {
            label: 'API Response Time',
            value: 95,
            display: '95%'
          }, {
            label: 'Server Uptime',
            value: 99.9,
            display: '99.9%'
          }].map(({ label, value, display }, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1 text-gray-400 font-medium text-sm">
                <span>{label}</span>
                <span>{display}</span>
              </div>
              <div className="w-full bg-gray-800 rounded h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="flex items-center space-x-2 text-xl font-semibold mb-4">
            <Shield className="w-5 h-5" />
            <span>Recent Admin Actions</span>
          </h3>
          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>User role updated for jane@example.com</span>
              <span className="ml-auto text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>System backup completed successfully</span>
              <span className="ml-auto text-xs text-gray-500">4h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>New user registration: mike@example.com</span>
              <span className="ml-auto text-xs text-gray-500">6h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Failed login attempts detected</span>
              <span className="ml-auto text-xs text-gray-500">8h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
