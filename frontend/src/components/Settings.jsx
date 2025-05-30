import React, { useState } from 'react';

// Dummy icons as simple SVG components (replace with your own SVG or Emoji)
const KeyIcon = () => <span role="img" aria-label="key">🔑</span>;
const SmartphoneIcon = () => <span role="img" aria-label="smartphone">📱</span>;

// Simple Switch component
const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
  >
    <span
      className={`block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}
    />
  </button>
);

// Simple Tabs component
const Tabs = ({ tabs, activeTab, onChange }) => (
  <div>
    <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`py-2 px-4 font-medium ${
            activeTab === tab.value
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div className="mt-6">{tabs.find((tab) => tab.value === activeTab)?.content}</div>
  </div>
);

const Settings = () => {
  // Theme toggle dummy state (replace with your real theme context if needed)
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    avatar: '', // URL if any
  };

  // Notifications state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    okrDeadlines: true,
    teamUpdates: true,
    weeklyReports: false,
  });

  // Local state for Tabs
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col space-y-6 p-6 w-screen h-screen bg-black text-white overflow-auto">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account preferences and system settings
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          {
            value: 'profile',
            label: 'Profile',
            content: (
              <div className="border rounded-md p-6 bg-white dark:bg-gray-800 shadow">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-1 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue={user.name.split(' ')[0]}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-1 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue={user.name.split(' ')[1]}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-1 font-medium">
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      defaultValue={user.role}
                      disabled
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block mb-1 font-medium">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      defaultValue="utc-5"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    >
                      <option value="utc-8">Pacific Time (UTC-8)</option>
                      <option value="utc-7">Mountain Time (UTC-7)</option>
                      <option value="utc-6">Central Time (UTC-6)</option>
                      <option value="utc-5">Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="bio" className="block mb-1 font-medium">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            ),
          },
          {
            value: 'notifications',
            label: 'Notifications',
            content: (
              <div className="border rounded-md p-6 bg-white dark:bg-gray-800 shadow space-y-6">
                {[
                  {
                    id: 'email',
                    label: 'Email Notifications',
                    desc: 'Receive notifications via email',
                  },
                  {
                    id: 'push',
                    label: 'Push Notifications',
                    desc: 'Receive push notifications in your browser',
                  },
                  {
                    id: 'okrDeadlines',
                    label: 'OKR Deadlines',
                    desc: 'Get reminded about upcoming OKR deadlines',
                  },
                  {
                    id: 'teamUpdates',
                    label: 'Team Updates',
                    desc: 'Notifications about team OKR updates',
                  },
                  {
                    id: 'weeklyReports',
                    label: 'Weekly Reports',
                    desc: 'Receive weekly progress reports',
                  },
                ].map(({ id, label, desc }) => (
                  <div key={id} className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">{label}</label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                    </div>
                    <Switch
                      checked={notifications[id]}
                      onChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, [id]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            ),
          },
          {
            value: 'security',
            label: 'Security',
            content: (
              <div className="space-y-6">
                <div className="border rounded-md p-6 bg-white dark:bg-gray-800 shadow">
                  <div className="flex items-center space-x-2 mb-4 font-semibold">
                    <KeyIcon />
                    <span>Password & Authentication</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block mb-1 font-medium">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block mb-1 font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border rounded-md p-6 bg-white dark:bg-gray-800 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <SmartphoneIcon />
                      <span className="ml-2">Setup 2FA</span>
                    </button>
                  </div>
                </div>
              </div>
            ),
          },
          {
            value: 'appearance',
            label: 'Appearance',
            content: (
              <div className="border rounded-md p-6 bg-white dark:bg-gray-800 shadow space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium block mb-1">Theme</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Light</span>
                    <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                    <span className="text-sm">Dark</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Language</label>
                  <select
                    defaultValue="en"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Settings;
