import React, { useState } from 'react';

const CreateOKR = () => {
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [visibility, setVisibility] = useState('team');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [keyResults, setKeyResults] = useState([
    { id: '1', title: '', target: '', unit: '', description: '' },
  ]);

  const addKeyResult = () => {
    const newId = (keyResults.length + 1).toString();
    setKeyResults([
      ...keyResults,
      { id: newId, title: '', target: '', unit: '', description: '' },
    ]);
  };

  const removeKeyResult = (id) => {
    if (keyResults.length > 1) {
      setKeyResults(keyResults.filter((kr) => kr.id !== id));
    }
  };

  const updateKeyResult = (id, field, value) => {
    setKeyResults(
      keyResults.map((kr) =>
        kr.id === id ? { ...kr, [field]: value } : kr
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
      case 'medium':
        return { backgroundColor: '#fef3c7', color: '#78350f' };
      case 'low':
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      default:
        return { backgroundColor: '#e5e7eb', color: '#374151' };
    }
  };

  const handleSaveDraft = () => {
    alert('Saving as draft...');
    // Implement saving logic here
  };

  const handlePublish = () => {
    alert('Publishing OKR...');
    // Implement publishing logic here
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        color: '#eee',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          color: '#eee',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            Create New OKR
          </h1>
          <p style={{ color: '#bbb', marginTop: '8px' }}>
            Define your objectives and key results
          </p>
        </div>
        <div>
          <button
            onClick={handleSaveDraft}
            style={{
              marginRight: '10px',
              padding: '8px 12px',
              border: '1px solid #888',
              background: '#222',
              color: '#eee',
              cursor: 'pointer',
            }}
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            style={{
              padding: '8px 12px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Publish OKR
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Main Form */}
        <div style={{ flex: '2 1 600px' }}>
          {/* Objective Section */}
          <section
            style={{
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '24px',
              backgroundColor: '#111',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
              🎯 Objective
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px' }}>
                Objective Title *
              </label>
              <input
                type="text"
                placeholder="What do you want to achieve?"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                placeholder="Provide more context about this objective..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g., Product, Marketing"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    color: '#eee',
                  }}
                />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#222',
                    border: '1px solid #555',
                    color: '#eee',
                  }}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* Key Results */}
          <section
            style={{
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '16px',
              backgroundColor: '#111',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h2>Key Results</h2>
              <button
                onClick={addKeyResult}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #888',
                  background: '#222',
                  color: '#eee',
                  cursor: 'pointer',
                }}
              >
                + Add Key Result
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {keyResults.map((kr, index) => (
                <div
                  key={kr.id}
                  style={{
                    border: '1px solid #555',
                    borderRadius: '6px',
                    padding: '12px',
                    backgroundColor: '#222',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <strong>Key Result {index + 1}</strong>
                    {keyResults.length > 1 && (
                      <button
                        onClick={() => removeKeyResult(kr.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f87171',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>
                      Title *
                    </label>
                    <input
                      type="text"
                      placeholder="What specific result do you want to achieve?"
                      value={kr.title}
                      onChange={(e) =>
                        updateKeyResult(kr.id, 'title', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#222',
                        border: '1px solid #555',
                        color: '#eee',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 100px' }}>
                      <label style={{ display: 'block', marginBottom: '6px' }}>
                        Target Value *
                      </label>
                      <input
                        type="text"
                        placeholder="100"
                        value={kr.target}
                        onChange={(e) =>
                          updateKeyResult(kr.id, 'target', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '8px',
                          backgroundColor: '#222',
                          border: '1px solid #555',
                          color: '#eee',
                        }}
                      />
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                      <label style={{ display: 'block', marginBottom: '6px' }}>
                        Unit
                      </label>
                      <select
                        value={kr.unit}
                        onChange={(e) =>
                          updateKeyResult(kr.id, 'unit', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '8px',
                          backgroundColor: '#222',
                          border: '1px solid #555',
                          color: '#eee',
                        }}
                      >
                        <option value="">Select unit</option>
                        <option value="number">Number</option>
                        <option value="percentage">Percentage (%)</option>
                        <option value="currency">Currency ($)</option>
                        <option value="users">Users</option>
                        <option value="days">Days</option>
                        <option value="hours">Hours</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>
                      Description
                    </label>
                    <textarea
                      placeholder="How will you measure this key result?"
                      value={kr.description}
                      onChange={(e) =>
                        updateKeyResult(kr.id, 'description', e.target.value)
                      }
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#222',
                        border: '1px solid #555',
                        color: '#eee',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section
            style={{
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '16px',
              backgroundColor: '#111',
              color: '#eee',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Settings</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px' }}>
                Assigned Team
              </label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                }}
              >
                <option value="">Select team</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="product">Product</option>
                <option value="sales">Sales</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px' }}>
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                }}
              >
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="organization">Organization</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px' }}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                  marginBottom: '12px',
                }}
              />

              <label style={{ display: 'block', marginBottom: '6px' }}>
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#222',
                  border: '1px solid #555',
                  color: '#eee',
                }}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CreateOKR;
