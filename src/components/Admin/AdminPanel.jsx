import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUsers, FaUserCheck, FaUserShield, FaCode,
  FaEdit, FaTrashAlt, FaSearch, FaNewspaper,
  FaSignOutAlt, FaSpinner,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './AdminPanel.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamaster.de';

let toastId = 0;
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);
  return { toasts, show };
};

const ToastContainer = ({ toasts }) => (
  <div className="admin-toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`admin-toast admin-toast-${t.type}`}>
        <span className="admin-toast-icon">
          {t.type === 'success' ? '\u2713' : t.type === 'error' ? '\u2717' : '!'}
        </span>
        <span className="admin-toast-message">{t.message}</span>
      </div>
    ))}
  </div>
);

const DeleteModal = ({ user, onConfirm, onCancel, loading }) => (
  <div className="admin-modal-overlay" onClick={onCancel}>
    <div className="admin-modal" onClick={e => e.stopPropagation()}>
      <h3><FaTrashAlt /> Delete User?</h3>
      <p>
        Are you sure you want to delete <strong>{user?.first_name} {user?.last_name}</strong>?
        This action cannot be undone.
      </p>
      <div className="admin-btn-group" style={{ justifyContent: 'center' }}>
        <button className="admin-btn admin-btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? <><FaSpinner className="spin" /> Deleting...</> : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

const EditModal = ({ user, onSave, onCancel, loading }) => {
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    is_active: user?.is_active ?? true,
    is_verified: user?.is_verified ?? false,
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, form);
  };

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal admin-modal-wide" onClick={e => e.stopPropagation()}>
        <h3><FaEdit /> Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row grid-2">
            <div className="admin-form-group">
              <label>First Name</label>
              <input
                type="text"
                value={form.first_name}
                onChange={e => handleChange('first_name', e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={form.last_name}
                onChange={e => handleChange('last_name', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="admin-form-row grid-3">
            <div className="admin-form-group">
              <label>Role</label>
              <select value={form.role} onChange={e => handleChange('role', e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Status</label>
              <select
                value={form.is_active ? 'active' : 'inactive'}
                onChange={e => handleChange('is_active', e.target.value === 'active')}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Verified</label>
              <select
                value={form.is_verified ? 'yes' : 'no'}
                onChange={e => handleChange('is_verified', e.target.value === 'yes')}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="admin-btn-group admin-btn-group-right">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? <><FaSpinner className="spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const { toasts, show } = useToast();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const getToken = () => localStorage.getItem('access_token');

  const authFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
    return res;
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }
    if (currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, statsRes] = await Promise.all([
          authFetch('/api/admin/users'),
          authFetch('/api/admin/stats'),
        ]);

        if (!usersRes.ok) throw new Error('Failed to fetch users');
        if (!statsRes.ok) throw new Error('Failed to fetch stats');

        const usersData = await usersRes.json();
        const statsData = await statsRes.json();

        setUsers(usersData.data || usersData.users || []);
        setStats(statsData.data || statsData.stats || null);
      } catch (err) {
        setError(err.message);
        show(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, show]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await authFetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
        show('User deleted successfully', 'success');
      } else {
        show('Failed to delete user', 'error');
      }
    } catch {
      show('Network error', 'error');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleSave = async (id, form) => {
    setSaving(true);
    try {
      const res = await authFetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(prev => prev.map(u => (u.id === id ? (data.data || data.user || { ...u, ...form }) : u)));
        show('User updated successfully', 'success');
        setEditTarget(null);
      } else {
        show('Failed to update user', 'error');
      }
    } catch {
      show('Network error', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.first_name || '').toLowerCase().includes(q) ||
      (u.last_name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    );
  });

  const statCards = [
    {
      icon: <FaUsers />,
      label: 'Total Users',
      value: stats?.total_users ?? users.length,
      bg: 'rgba(99,102,241,0.1)',
      color: 'var(--primary)',
    },
    {
      icon: <FaUserCheck />,
      label: 'Active Users',
      value: stats?.active_users ?? users.filter(u => u.is_active).length,
      bg: 'rgba(34,197,94,0.1)',
      color: 'var(--success)',
    },
    {
      icon: <FaUserShield />,
      label: 'Verified Users',
      value: stats?.verified_users ?? users.filter(u => u.is_verified).length,
      bg: 'rgba(6,182,212,0.1)',
      color: 'var(--info)',
    },
    {
      icon: <FaCode />,
      label: 'Problems Solved',
      value: stats?.total_problems_solved ?? 0,
      bg: 'rgba(245,158,11,0.1)',
      color: 'var(--warning)',
    },
  ];

  return (
    <div className="admin-page">
      <ToastContainer toasts={toasts} />

      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {editTarget && (
        <EditModal
          user={editTarget}
          onSave={handleSave}
          onCancel={() => setEditTarget(null)}
          loading={saving}
        />
      )}

      <div className="admin-header">
        <div className="admin-header-left">
          <FaUserShield className="admin-header-icon" />
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-header-right">
          <Link to="/admin/blog" className="admin-btn admin-btn-primary admin-btn-sm">
            <FaNewspaper /> Blog Panel
          </Link>
          <span>Signed in as <strong>{currentUser?.first_name || 'Admin'}</strong></span>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-stats-grid">
          {statCards.map((s, i) => (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="admin-stat-content">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-toolbar">
          <div className="admin-section-title"><FaUsers /> Users</div>
          <div className="admin-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="admin-error">
            <p>{error}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="admin-empty">
            <h3>No users found</h3>
            <p>{search ? 'Try a different search term.' : 'No users in the system yet.'}</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Progress</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="admin-user-name">{u.first_name} {u.last_name}</div>
                    </td>
                    <td className="admin-user-email">{u.email}</td>
                    <td>
                      <span className={`admin-role-badge admin-role-${u.role}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${u.is_active ? 'admin-status-active' : 'admin-status-inactive'}`}>
                        {u.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-verified-badge ${u.is_verified ? 'admin-verified-yes' : 'admin-verified-no'}`}>
                        {u.is_verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span className="admin-progress">
                        {u.solved_count ?? u.problems_solved ?? 0}
                      </span>
                    </td>
                    <td className="admin-user-date">{formatDate(u.created_at)}</td>
                    <td>
                      <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="edit-btn"
                          onClick={() => setEditTarget(u)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => setDeleteTarget(u)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
