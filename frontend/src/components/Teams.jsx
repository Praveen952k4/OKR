import React, { useState } from 'react';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockTeams = [
    {
      id: '1',
      name: 'Product Development',
      description: 'Building amazing products for our users',
      members: [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'manager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member' }
      ],
      okrsCount: 8,
      progress: 72,
      color: 'blue'
    },
    {
      id: '2',
      name: 'Marketing',
      description: 'Growing our brand and reaching new customers',
      members: [
        { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'manager' },
        { id: '5', name: 'David Brown', email: 'david@example.com', role: 'member' }
      ],
      okrsCount: 5,
      progress: 85,
      color: 'green'
    },
    {
      id: '3',
      name: 'Engineering',
      description: 'Technical excellence and innovation',
      members: [
        { id: '6', name: 'Alex Chen', email: 'alex@example.com', role: 'admin' },
        { id: '7', name: 'Emily Davis', email: 'emily@example.com', role: 'member' },
        { id: '8', name: 'Tom Anderson', email: 'tom@example.com', role: 'member' },
        { id: '9', name: 'Lisa Garcia', email: 'lisa@example.com', role: 'member' }
      ],
      okrsCount: 12,
      progress: 68,
      color: 'purple'
    }
  ];

  // Role icons as simple SVGs or emojis for demo
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <span title="Admin" className="text-yellow-600">👑</span>;
      case 'manager':
        return <span title="Manager" className="text-blue-600">⚙️</span>;
      default:
        return <span title="Member" className="text-gray-600">👤</span>;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getColorClass = (color, base, variant) => {
    return `${base}-${color}-${variant}`;
  };

  // Filter teams by searchTerm (case-insensitive)
  const filteredTeams = mockTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Collaborate with your teams and track collective progress</p>
          </div>
          {/* Create Team Button */}
          <button
            type="button"
            className="inline-flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Team</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          />
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 col-span-full">No teams found.</p>
          ) : (
            filteredTeams.map((team) => (
              <div
                key={team.id}
                className="cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
              >
                {/* Card Header */}
                <div className="flex items-center space-x-3 p-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${getColorClass(team.color, 'bg', '100')} dark:${getColorClass(team.color, 'bg', '900')}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${getColorClass(team.color, 'text', '600')} dark:${getColorClass(team.color, 'text', '400')}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{team.description}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4 p-4">
                  {/* Team Stats */}
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{team.members.length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{team.okrsCount}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">OKRs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{team.progress}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="mb-2 flex justify-between items-center text-sm font-medium text-gray-600">
                      <span>Team Progress</span>
                      <span className="text-gray-600 dark:text-gray-400">{team.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${team.progress}%` }}
                        className={`h-full rounded bg-${team.color}-600 dark:bg-${team.color}-400`}
                      ></div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-gray-600">Team Members</h4>
                    <div className="space-y-2">
                      {team.members.slice(0, 3).map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {/* Avatar */}
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-6 w-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</span>
                          </div>
                          <span className={`inline-flex items-center space-x-1 rounded px-2 py-0.5 text-xs font-semibold ${getRoleBadgeColor(member.role)}`}>
                            {getRoleIcon(member.role)}
                            <span>{member.role}</span>
                          </span>
                        </div>
                      ))}
                      {team.members.length > 3 && (
                        <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                          +{team.members.length - 3} more members
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
