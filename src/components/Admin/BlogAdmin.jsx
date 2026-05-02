import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt, FaEdit, FaTrashAlt, FaEye, FaPlus,
  FaNewspaper, FaCalendarAlt,
} from 'react-icons/fa';
import { isAuthenticated, authFetch, logout } from '../../utils/auth';
import { allPosts } from '../Blog/blogData';
import './admin.css';

let toastId = 0;
export const useToast = () => {
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

const DeleteModal = ({ post, onConfirm, onCancel, loading }) => (
  <div className="admin-modal-overlay" onClick={onCancel}>
    <div className="admin-modal" onClick={e => e.stopPropagation()}>
      <h3><FaTrashAlt /> Delete Post?</h3>
      <p>Are you sure you want to delete <strong>&quot;{post?.title}&quot;</strong>? This cannot be undone.</p>
      <div className="admin-btn-group" style={{ justifyContent: 'center' }}>
        <button className="admin-btn admin-btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

const BlogAdmin = () => {
  const navigate = useNavigate();
  const { toasts, show } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated()) return;
    const fetchPosts = async () => {
      try {
        const res = await authFetch('/blogs');
        if (res.ok) {
          const data = await res.json();
          setPosts(Array.isArray(data) ? data : data.posts || []);
        } else {
          const enriched = await Promise.all(
            allPosts.map(async post => {
              try {
                const mod = await import(`../Blog/blogContent/${post.slug}.json`);
                const content = mod.default || mod;
                return { ...post, tags: content.tags || [] };
              } catch { return { ...post, tags: [] }; }
            })
          );
          setPosts(enriched);
        }
      } catch {
        setPosts(allPosts.map(p => ({ ...p, tags: [] })));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await authFetch(`/blogs/${deleteTarget.slug}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.slug !== deleteTarget.slug));
        show('Post deleted successfully', 'success');
      } else {
        show('Failed to delete post', 'error');
      }
    } catch {
      show('Network error. Please try again.', 'error');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getDifficultyClass = diff => diff ? `admin-difficulty admin-difficulty-${diff.toLowerCase()}` : '';

  return (
    <div className="admin-page">
      <ToastContainer toasts={toasts} />

      {deleteTarget && (
        <DeleteModal
          post={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      <div className="admin-header">
        <div className="admin-header-left">
          <FaNewspaper className="admin-header-icon" />
          <h1>Blog Control Panel</h1>
        </div>
        <div className="admin-header-right">
          <span>Signed in as <strong>admin</strong></span>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon"><FaNewspaper /></div>
            <div className="admin-stat-content">
              <h3>{posts.length}</h3>
              <p>Total Posts</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--success)' }}><FaCalendarAlt /></div>
            <div className="admin-stat-content">
              <h3>{posts.filter(p => {
                try { return new Date(p.date) <= new Date(); } catch { return true; }
              }).length}</h3>
              <p>Published</p>
            </div>
          </div>
        </div>

        <div className="admin-toolbar">
          <div className="admin-section-title"><FaNewspaper /> All Posts</div>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => navigate('/admin/blog/new')}>
            <FaPlus /> New Post
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="admin-empty">
            <h3>No posts yet</h3>
            <p>Create your first blog post to get started.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Read Time</th>
                  <th>Difficulty</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.slug}>
                    <td>
                      <div className="admin-post-title">{post.title}</div>
                      <div className="admin-post-date" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>/{post.slug}</div>
                    </td>
                    <td className="admin-post-date">{post.date}</td>
                    <td>
                      <div className="admin-tags">
                        {(post.tags || []).slice(0, 3).map(tag => (
                          <span key={tag} className="admin-tag">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td>{post.readTime}</td>
                    <td>
                      {post.difficulty && (
                        <span className={getDifficultyClass(post.difficulty)}>{post.difficulty}</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="view-btn" onClick={() => window.open(`/#/blog/${post.slug}`, '_blank')} title="Preview">
                          <FaEye />
                        </button>
                        <button className="edit-btn" onClick={() => navigate(`/admin/blog/edit/${post.slug}`)} title="Edit">
                          <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteTarget(post)} title="Delete">
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

export default BlogAdmin;
export { ToastContainer };
