import React, { useState } from 'react';

const MyOKRs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockOKRs = [
    {
      id: '1',
      title: 'Increase Product User Engagement',
      description: 'Improve user retention and engagement metrics across our platform',
      progress: 75,
      status: 'active',
      dueDate: '2024-12-31',
      keyResults: [
        { id: '1', title: 'Daily Active Users', progress: 80, target: 10000, current: 8000, unit: 'users' },
        { id: '2', title: 'User Session Duration', progress: 70, target: 15, current: 10.5, unit: 'minutes' },
        { id: '3', title: 'Feature Adoption Rate', progress: 75, target: 80, current: 60, unit: '%' }
      ]
    },
    {
      id: '2',
      title: 'Launch New Mobile App',
      description: 'Successfully launch and deploy our mobile application',
      progress: 45,
      status: 'active',
      dueDate: '2024-11-30',
      keyResults: [
        { id: '4', title: 'App Store Approval', progress: 100, target: 1, current: 1, unit: 'approval' },
        { id: '5', title: 'User Downloads', progress: 30, target: 5000, current: 1500, unit: 'downloads' },
        { id: '6', title: 'App Rating', progress: 0, target: 4.5, current: 0, unit: 'stars' }
      ]
    },
    // Optional: add OKRs with other statuses to test filtering
    {
      id: '3',
      title: 'Improve Internal Documentation',
      description: 'Make internal docs clear and accessible',
      progress: 20,
      status: 'draft',
      dueDate: '2024-09-15',
      keyResults: [
        { id: '7', title: 'Write API Docs', progress: 10, target: 100, current: 10, unit: 'pages' },
      ],
    },
  ];

  const filteredOKRs = mockOKRs.filter((okr) => {
    const matchesSearch = okr.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || okr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge colors for dark background
  const statusColors = {
    active: { backgroundColor: '#065f46', color: '#d1fae5' },      // dark green background, light text
    draft: { backgroundColor: '#374151', color: '#e5e7eb' },       // dark gray background, light text
    completed: { backgroundColor: '#1e40af', color: '#dbeafe' },   // dark blue background, light text
    archived: { backgroundColor: '#991b1b', color: '#fee2e2' },    // dark red background, light text
  };

  // Clamp progress between 0 and 100
  const clampProgress = (value) => Math.min(100, Math.max(0, value));

  const ProgressBar = ({ value }) => (
    <div style={{ width: '100%', backgroundColor: '#333', borderRadius: 4, height: 8 }}>
      <div
        style={{
          width: `${clampProgress(value)}%`,
          height: '100%',
          backgroundColor: '#3b82f6',
          borderRadius: 4,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );

  // Format dueDate for readability
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: 20,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#eee',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{ fontSize: 32, fontWeight: 'bold', margin: 0, color: '#eee' }}
            >
              My OKRs
            </h1>
            <p style={{ color: '#bbb', marginTop: 6 }}>
              Track and manage your objectives and key results
            </p>
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              fontSize: 14,
              borderRadius: 4,
              cursor: 'pointer',
            }}
            onClick={() => alert('Create OKR clicked')}
            aria-label="Create a new OKR"
          >
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>+</span>
            Create OKR
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Search OKRs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                borderRadius: 4,
                border: '1px solid #555',
                fontSize: 14,
                backgroundColor: '#111',
                color: '#eee',
              }}
              aria-label="Search OKRs"
            />
            <span
              style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontSize: 16,
                userSelect: 'none',
              }}
            >
              🔍
            </span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: 160,
              padding: '8px 12px',
              borderRadius: 4,
              border: '1px solid #555',
              fontSize: 14,
              cursor: 'pointer',
              backgroundColor: '#111',
              color: '#eee',
            }}
            aria-label="Filter OKRs by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* OKRs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {filteredOKRs.length === 0 && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              No OKRs match your criteria.
            </p>
          )}

          {filteredOKRs.map((okr) => (
            <div
              key={okr.id}
              style={{
                border: '1px solid #222',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
                backgroundColor: '#111',
                transition: 'box-shadow 0.3s',
                cursor: 'default',
                color: '#eee',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.7)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.7)')
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: '0 0 8px',
                      color: '#3b82f6',
                    }}
                  >
                    <span role="img" aria-label="target">
                      🎯
                    </span>
                    {okr.title}
                  </h2>
                  <p style={{ color: '#bbb', marginTop: 0 }}>{okr.description}</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    alignItems: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      ...statusColors[okr.status],
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {okr.status}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 12,
                      color: '#888',
                      gap: 4,
                      userSelect: 'none',
                    }}
                  >
                    <span role="img" aria-label="calendar">
                      📅
                    </span>
                    {formatDate(okr.dueDate)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontWeight: '600', fontSize: 14, color: '#eee' }}
                  >
                    Overall Progress
                  </span>
                  <span style={{ fontSize: 14, color: '#888' }}>{okr.progress}%</span>
                </div>
                <ProgressBar value={okr.progress} />
              </div>

              <div style={{ marginTop: 24 }}>
                <h3
                  style={{ fontWeight: '600', marginBottom: 12, color: '#eee' }}
                >
                  Key Results
                </h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {okr.keyResults.map((kr) => (
                    <div
                      key={kr.id}
                      style={{
                        backgroundColor: '#222',
                        borderRadius: 8,
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        color: '#eee',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p
                          style={{ margin: 0, fontWeight: '600', fontSize: 14 }}
                        >
                          {kr.title}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: 6,
                          }}
                        >
                          <ProgressBar value={kr.progress} />
                          <span
                            style={{
                              fontSize: 12,
                              color: '#888',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {kr.current}/{kr.target} {kr.unit}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontWeight: '700', fontSize: 14 }}>
                        {kr.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOKRs;
