import React, { useState, useMemo } from 'react';
import ProgressChart from './ProgressChart';

// Mock data
const mockOKRsInitial = [
  {
    id: '1',
    title: 'Increase User Engagement',
    description: 'Improve user engagement metrics across all platforms to drive better retention and satisfaction.',
    progress: 75,
    dueDate: 'Dec 31, 2024',
    owner: 'John Doe',
    team: 'Product',
    keyResults: 3,
  },
  {
    id: '2',
    title: 'Launch New Feature Set',
    description: 'Develop and release three new core features to enhance user experience and competitive positioning.',
    progress: 45,
    dueDate: 'Nov 15, 2024',
    owner: 'Jane Smith',
    team: 'Engineering',
    keyResults: 5,
  },
  {
    id: '3',
    title: 'Expand Market Reach',
    description: 'Enter two new geographic markets and establish partnerships to increase customer base by 40%.',
    progress: 30,
    dueDate: 'Jan 31, 2025',
    owner: 'Mike Johnson',
    team: 'Sales',
    keyResults: 4,
  },
];

// Status helper
const getStatusFromProgress = (progress) => {
  if (progress < 40) return 'behind';
  if (progress <= 60) return 'at-risk';
  return 'on-track';
};

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// OKR Card
const OKRCard = ({ okr, onUpdate, onDelete }) => {
  const statusColors = {
    'on-track': 'text-green-600',
    'at-risk': 'text-yellow-500',
    behind: 'text-red-600',
  };

  const status = getStatusFromProgress(okr.progress);

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition">
      <button
        onClick={() => onDelete(okr.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
        aria-label="Delete OKR"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3
        className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline"
        onClick={() => onUpdate(okr.id)}
      >
        {okr.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{okr.description}</p>

      <p className={`mt-2 font-medium ${statusColors[status] || 'text-gray-700 dark:text-gray-300'}`}>
        Status: {status.replace('-', ' ')}
      </p>

      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
        <span>Owner: {okr.owner}</span>
        <span>Due: {okr.dueDate}</span>
      </div>

      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Key Results: {okr.keyResults} | Team: {okr.team}
      </div>

      <div className="mt-3 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600" style={{ width: `${okr.progress}%` }} />
      </div>
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const [okrs, setOkrs] = useState(mockOKRsInitial);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // Modal & editing state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOKR, setCurrentOKR] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editProgress, setEditProgress] = useState('');

  // Open modal and populate fields on OKR title click
  const handleUpdate = (id) => {
    const okr = okrs.find((o) => o.id === id);
    if (!okr) return;

    setCurrentOKR(okr);
    setEditTitle(okr.title);
    setEditProgress(okr.progress.toString());
    setModalOpen(true);
  };

  // Save changes from modal
  const handleModalSave = () => {
    const progressNum = parseInt(editProgress, 10);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      alert('Invalid progress value');
      return;
    }

    setOkrs((prev) =>
      prev.map((okr) =>
        okr.id === currentOKR.id
          ? { ...okr, title: editTitle, progress: progressNum }
          : okr
      )
    );

    setModalOpen(false);
    setCurrentOKR(null);
  };

  // Delete OKR confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this OKR?')) {
      setOkrs((prev) => prev.filter((okr) => okr.id !== id));
    }
  };

  // Sorted OKRs memoized
  const sortedOKRs = useMemo(() => {
    if (!sortField) return okrs;

    return [...okrs].sort((a, b) => {
      let valA, valB;

      switch (sortField) {
        case 'status': {
          const order = ['behind', 'at-risk', 'on-track'];
          valA = order.indexOf(getStatusFromProgress(a.progress));
          valB = order.indexOf(getStatusFromProgress(b.progress));
          break;
        }
        case 'owner':
          valA = a.owner.toLowerCase();
          valB = b.owner.toLowerCase();
          break;
        case 'dueDate':
          valA = new Date(a.dueDate);
          valB = new Date(b.dueDate);
          break;
        case 'keyResults':
          valA = a.keyResults;
          valB = b.keyResults;
          break;
        default:
          return 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [okrs, sortField, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your objectives and key results performance
          </p>
        </div>
        <button
          className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => alert('Create OKR clicked')}
          type="button"
        >
          Create OKR
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <label className="font-semibold text-gray-700 dark:text-gray-300">Sort by:</label>
        <select
          className="p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          value={sortField || ''}
          onChange={(e) => setSortField(e.target.value || null)}
        >
          <option value="">None</option>
          <option value="status">Status</option>
          <option value="owner">Owner</option>
          <option value="dueDate">Due Date</option>
          <option value="keyResults">Key Results</option>
        </select>

        <button
          className="px-3 py-1 border rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          type="button"
        >
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent OKRs</h2>
            <button
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              type="button"
              onClick={() => alert('View all clicked')}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {sortedOKRs.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 italic">No OKRs available.</p>
            )}
            {sortedOKRs.map((okr) => (
              <OKRCard key={okr.id} okr={okr} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        <div>
          <ProgressChart />
        

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {/* Replace these buttons with your actual Button components and icons */}
              <button className="w-full justify-start border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <span className="w-4 h-4 mr-2">🎯</span>
                Create New OKR
              </button>
              <button className="w-full justify-start border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <span className="w-4 h-4 mr-2">👥</span>
                Invite Team Member
              </button>
              <button className="w-full justify-start border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <span className="w-4 h-4 mr-2">📈</span>
                View Analytics
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Modal for editing OKR */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Update OKR</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editProgress}
              onChange={(e) => setEditProgress(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleModalSave}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            type="button"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
