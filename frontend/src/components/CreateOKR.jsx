import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Store only the essential data that will be saved to the list
  const essentialData = {
    id: Date.now().toString(), // Generate unique ID
    title: objective,
    description: description,
    progress: 0, // New OKRs start at 0%
    dueDate: endDate,
    owner: 'Current User', // You can replace this with actual user name
    team: assignedTeam,
    keyResults: keyResults.length,
  };

  // Store complete form data for internal use (not saved to list)
  const completeFormData = {
    objective,
    description,
    category,
    priority,
    visibility,
    startDate,
    endDate,
    assignedTeam,
    keyResults
  };
   const completeFormDatas = {
    objective,
    description,
    category,
    priority,
    visibility,
    startDate,
    endDate,
    assignedTeam,
    keyResults
  };

  // Log form data whenever any field changes
  useEffect(() => {
    console.log('=== ESSENTIAL DATA (to be saved) ===');
    console.log('Essential Data:', essentialData);
    console.log('=== COMPLETE FORM DATA (internal use) ===');
    console.log('Complete Form Data:', completeFormDatas);
    console.log('====================================');
  }, [objective, description, category, priority, visibility, startDate, endDate, assignedTeam, keyResults]);

  const addKeyResult = () => {
    const newId = (keyResults.length + 1).toString();
    const newKeyResults = [
      ...keyResults,
      { id: newId, title: '', target: '', unit: '', description: '' },
    ];
    setKeyResults(newKeyResults);
    console.log('Added new key result. Total key results:', newKeyResults.length);
  };

  const removeKeyResult = (id) => {
    if (keyResults.length > 1) {
      const filteredResults = keyResults.filter((kr) => kr.id !== id);
      setKeyResults(filteredResults);
      console.log('Removed key result with ID:', id);
      console.log('Remaining key results:', filteredResults);
    }
  };

  const updateKeyResult = (id, field, value) => {
    const updatedKeyResults = keyResults.map((kr) =>
      kr.id === id ? { ...kr, [field]: value } : kr
    );
    setKeyResults(updatedKeyResults);
    console.log(`Updated key result ${id} - ${field}:`, value);
    console.log('Updated key result object:', updatedKeyResults.find(kr => kr.id === id));
  };


  const handleSaveDraft = () => {
    console.log('=== SAVING DRAFT ===');
    console.log('Essential Data (to be added to OKR list):', essentialData);
    console.log('Complete Form Data (internal):', completeFormData);
    console.log('==================');
    alert('Saving as draft... Check console for essential data to store!');
  };

  const handlePublish = async () => {
  const url = `http://localhost:3000`;

  try {
    const response = await axios.post(url + `/api/add/addokr`, completeFormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    if (response.data.success) {
      // Redirect on success
      window.location.replace("http://localhost:5173/");
    } else {
      console.error("Server responded with success: false");
    }

  } catch (error) {
    // This block handles network or server errors (like 500, 404, etc.)
    console.error("Error while publishing:", error.response?.data || error.message);
  }
};



  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
          color: '#e2e8f0',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f1f5f9' }}>
            Create New OKR
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>
            Define your objectives and key results (Check console for data structure)
          </p>
        </div>
        <div>
          <button
            onClick={handleSaveDraft}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              border: '1px solid #475569',
              background: '#1e293b',
              color: '#e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Save Draft
          </button>
          <button
            onClick={}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
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
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px',
              backgroundColor: '#1e293b',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#f1f5f9' }}>
              🎯 Objective
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '14px' }}>
                Objective Title *
              </label>
              <input
                type="text"
                placeholder="What do you want to achieve?"
                value={objective}
                onChange={(e) => {
                  setObjective(e.target.value);
                  console.log('Objective changed:', e.target.value);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '14px' }}>
                Description
              </label>
              <textarea
                placeholder="Provide more context about this objective..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  console.log('Description changed:', e.target.value);
                }}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '14px' }}>
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g., Product, Marketing"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    console.log('Category changed:', e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    color: '#e2e8f0',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '14px' }}>
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    console.log('Priority changed:', e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    color: '#e2e8f0',
                    fontSize: '14px',
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
                onChange={(e) => {
                  setAssignedTeam(e.target.value);
                  console.log('Assigned Team changed:', e.target.value);
                }}
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
                onChange={(e) => {
                  setVisibility(e.target.value);
                  console.log('Visibility changed:', e.target.value);
                }}
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
                onChange={(e) => {
                  setStartDate(e.target.value);
                  console.log('Start Date changed:', e.target.value);
                }}
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
                onChange={(e) => {
                  setEndDate(e.target.value);
                  console.log('End Date changed:', e.target.value);
                }}
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