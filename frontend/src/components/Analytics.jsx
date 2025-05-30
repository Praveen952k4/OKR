import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Users,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('quarter');
  const [teamFilter, setTeamFilter] = useState('all');

  // Updated progress data with team-specific details
  const progressData = [
    {
      month: 'Jan',
      teams: {
        engineering: { completed: 4, active: 6 },
        marketing: { completed: 3, active: 4 },
        product: { completed: 2, active: 3 },
        sales: { completed: 2, active: 3 },
        support: { completed: 1, active: 2 }
      }
    },
    {
      month: 'Feb',
      teams: {
        engineering: { completed: 5, active: 7 },
        marketing: { completed: 4, active: 5 },
        product: { completed: 2, active: 4 },
        sales: { completed: 2, active: 2 },
        support: { completed: 2, active: 2 }
      }
    },
    {
      month: 'Mar',
      teams: {
        engineering: { completed: 6, active: 7 },
        marketing: { completed: 5, active: 6 },
        product: { completed: 3, active: 4 },
        sales: { completed: 3, active: 3 },
        support: { completed: 1, active: 2 }
      }
    },
    {
      month: 'Apr',
      teams: {
        engineering: { completed: 7, active: 8 },
        marketing: { completed: 6, active: 7 },
        product: { completed: 4, active: 5 },
        sales: { completed: 3, active: 4 },
        support: { completed: 2, active: 3 }
      }
    },
    {
      month: 'May',
      teams: {
        engineering: { completed: 8, active: 9 },
        marketing: { completed: 7, active: 7 },
        product: { completed: 4, active: 6 },
        sales: { completed: 4, active: 4 },
        support: { completed: 2, active: 2 }
      }
    },
    {
      month: 'Jun',
      teams: {
        engineering: { completed: 9, active: 10 },
        marketing: { completed: 8, active: 8 },
        product: { completed: 5, active: 6 },
        sales: { completed: 4, active: 5 },
        support: { completed: 4, active: 1 }
      }
    }
  ];

  // Derive progress data based on teamFilter
  const filteredProgressData = progressData.map((entry) => {
    if (teamFilter === 'all') {
      let totalCompleted = 0;
      let totalActive = 0;
      Object.values(entry.teams).forEach((team) => {
        totalCompleted += team.completed;
        totalActive += team.active;
      });
      return { month: entry.month, completed: totalCompleted, active: totalActive };
    } else {
      const team = entry.teams[teamFilter];
      return {
        month: entry.month,
        completed: team ? team.completed : 0,
        active: team ? team.active : 0
      };
    }
  });

  const teamPerformance = [
    { team: 'Engineering', progress: 85, okrs: 12 },
    { team: 'Marketing', progress: 92, okrs: 8 },
    { team: 'Product', progress: 78, okrs: 10 },
    { team: 'Sales', progress: 88, okrs: 6 },
    { team: 'Support', progress: 95, okrs: 5 }
  ];

  const statusDistribution = [
    { name: 'Completed', value: 35, color: '#10B981' },
    { name: 'On Track', value: 45, color: '#3B82F6' },
    { name: 'At Risk', value: 15, color: '#F59E0B' },
    { name: 'Off Track', value: 5, color: '#EF4444' }
  ];

  const keyMetrics = [
    {
      title: 'Total OKRs',
      value: '127',
      change: '+12%',
      icon: Target,
      color: 'text-blue-400 bg-blue-500/10'
    },
    {
      title: 'Completion Rate',
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-green-400 bg-green-500/10'
    },
    {
      title: 'Active Teams',
      value: '24',
      change: '+3',
      icon: Users,
      color: 'text-purple-400 bg-purple-500/10'
    },
    {
      title: 'Avg. Progress',
      value: '82%',
      change: '+7%',
      icon: BarChart3,
      color: 'text-orange-400 bg-orange-500/10'
    }
  ];

  return (
    <div className="space-y-6 p-6 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-400 mt-2">Track performance and gain insights from your OKRs</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-4 py-2"
          >
            <option value="all">All Teams</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="product">Product</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-900 shadow rounded p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm flex items-center mt-1 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metric.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OKR Progress Over Time */}
        <div className="bg-gray-900 shadow rounded p-6">
          <div className="flex items-center mb-4 space-x-2 font-semibold text-lg">
            <BarChart3 className="w-5 h-5" />
            <span>OKR Progress Over Time</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#fff' }} />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="active" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-gray-900 shadow rounded p-6">
          <div className="flex items-center mb-4 space-x-2 font-semibold text-lg">
            <PieChart className="w-5 h-5" />
            <span>OKR Status Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#fff' }} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-gray-900 shadow rounded p-6">
        <div className="flex items-center mb-4 space-x-2 font-semibold text-lg">
          <Users className="w-5 h-5" />
          <span>Team Performance</span>
        </div>
        <div className="space-y-4">
          {teamPerformance
            .filter((team) =>
              teamFilter === 'all' ? true : team.team.toLowerCase() === teamFilter
            )
            .map((team, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">{team.team}</h3>
                  <p className="text-sm text-gray-400">{team.okrs} OKRs</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-700 rounded h-2 overflow-hidden">
                    <div className="bg-green-500 h-2" style={{ width: `${team.progress}%` }}></div>
                  </div>
                  <span className="font-bold text-lg w-12 text-right">{team.progress}%</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
