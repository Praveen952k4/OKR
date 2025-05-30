import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('quarter');

  const mockReports = [
    {
      id: '1',
      title: 'Q2 2024 Performance Report',
      type: 'quarterly',
      date: '2024-06-30',
      status: 'completed',
      insights: [
        'Overall completion rate: 78%',
        'Engineering team exceeded targets by 12%',
        'Marketing needs attention on social media OKRs',
      ],
    },
    {
      id: '2',
      title: 'June 2024 Monthly Summary',
      type: 'monthly',
      date: '2024-06-30',
      status: 'completed',
      insights: [
        'Best performing month so far',
        '15 OKRs completed ahead of schedule',
        'Team collaboration improved significantly',
      ],
    },
    {
      id: '3',
      title: 'Week 27 Progress Report',
      type: 'weekly',
      date: '2024-07-07',
      status: 'draft',
      insights: [
        'Strong momentum in product development',
        'Customer satisfaction OKRs on track',
        'Need to focus on retention metrics',
      ],
    },
  ];

  const summaryStats = [
    {
      title: 'Total OKRs Tracked',
      value: 127,
      change: '+8 this month',
    },
    {
      title: 'Average Completion',
      value: '78%',
      change: '+5% vs last quarter',
    },
    {
      title: 'Active Teams',
      value: 12,
      change: '+2 new teams',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#065f46', color: '#d1fae5' }; // inverted colors for dark bg
      case 'draft':
        return { backgroundColor: '#92400e', color: '#fef3c7' };
      case 'scheduled':
        return { backgroundColor: '#1e40af', color: '#dbeafe' };
      default:
        return { backgroundColor: '#374151', color: '#e5e7eb' };
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'quarterly':
        return { backgroundColor: '#5b21b6', color: '#ede9fe' };
      case 'monthly':
        return { backgroundColor: '#1e40af', color: '#dbeafe' };
      case 'weekly':
        return { backgroundColor: '#065f46', color: '#d1fae5' };
      default:
        return { backgroundColor: '#374151', color: '#e5e7eb' };
    }
  };

  return (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      padding: 20,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'black',
      color: 'white',
      boxSizing: 'border-box',
      overflowY: 'auto',
    }}
  >
    {/* Header */}
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Reports</h1>
        <p style={{ color: '#ccc', marginTop: 6 }}>
          Generate and view comprehensive OKR reports
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          style={{
            padding: '8px 12px',
            border: '1px solid #666',
            background: 'black',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Schedule Report
        </button>
        <button
          style={{
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Generate Report
        </button>
      </div>
    </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          style={{
            padding: 8,
            flex: 1,
            backgroundColor: '#111',
            color: '#eee',
            border: '1px solid #444',
            borderRadius: 4,
          }}
        >
          <option value="all">All Reports</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{
            padding: 8,
            flex: 1,
            backgroundColor: '#111',
            color: '#eee',
            border: '1px solid #444',
            borderRadius: 4,
          }}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Summary Stats */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #444',
              borderRadius: 8,
              padding: 20,
              flex: 1,
              marginRight: idx < summaryStats.length - 1 ? 12 : 0,
              backgroundColor: '#111',
              color: '#eee',
            }}
          >
            <p style={{ fontSize: 14, color: '#bbb', marginBottom: 4 }}>
              {stat.title}
            </p>
            <p
              style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: 12, color: '#888' }}>{stat.change}</p>
          </div>
        ))}
      </section>

      {/* Reports List */}
      <section
        style={{
          border: '1px solid #444',
          borderRadius: 8,
          padding: 20,
          marginBottom: 30,
          backgroundColor: '#111',
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 16, color: '#eee' }}>
          Recent Reports
        </h2>
        {mockReports.map((report) => (
          <div
            key={report.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: 12,
              borderBottom: '1px solid #222',
              color: '#eee',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <h3 style={{ margin: 0 }}>{report.title}</h3>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    ...getTypeStyle(report.type),
                  }}
                >
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    ...getStatusStyle(report.status),
                  }}
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#bbb', marginBottom: 12 }}>
                {report.date}
              </p>
              <div>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 6,
                    color: '#eee',
                  }}
                >
                  Key Insights:
                </h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#ccc' }}>
                  {report.insights.map((insight, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginLeft: 20,
              }}
            >
              {report.status === 'completed' && (
                <button
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #3b82f6',
                    background: '#000',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    borderRadius: 4,
                    fontSize: 12,
                  }}
                >
                  Download
                </button>
              )}
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #555',
                  background: '#000',
                  color: '#eee',
                  cursor: 'pointer',
                  borderRadius: 4,
                  fontSize: 12,
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section
        style={{
          border: '1px solid #444',
          borderRadius: 8,
          padding: 20,
          backgroundColor: '#111',
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 16, color: '#eee' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              flex: 1,
              height: 80,
              border: '1px solid #555',
              background: '#000',
              color: '#eee',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Weekly Report
          </button>
          <button
            style={{
              flex: 1,
              height: 80,
              border: '1px solid #555',
              background: '#000',
              color: '#eee',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Monthly Summary
          </button>
          <button
            style={{
              flex: 1,
              height: 80,
              border: '1px solid #555',
              background: '#000',
              color: '#eee',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Quarterly Review
          </button>
        </div>
      </section>
    </div>
  );
};

export default Reports;
