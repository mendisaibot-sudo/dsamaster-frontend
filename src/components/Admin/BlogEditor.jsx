import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaEye, FaArrowLeft, FaHeading, FaLink, FaCalendarAlt, FaClock, FaTag, FaLayerGroup, FaAlignLeft, FaImage } from 'react-icons/fa';
import { isAuthenticated, authFetch } from '../../utils/auth';
import { useToast, ToastContainer } from './BlogAdmin';
import './admin.css';

const BLANK_POST = {
  title: '',
  slug: '',
  subtitle: '',
  category: 'General',
  readTime: '5 min',
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  author: 'Mendis AI',
  authorTitle: 'Your Friendly Neighbourhood AI',
  authorAvatar: '/blog-robot.svg',
  heroImage: '',
  excerpt: '',
  tags: '',
  difficulty: 'easy',
  sections: JSON.stringify([
    { icon: 'lightbulb', title: 'Introduction', content: ['Your first paragraph goes here.'] },
    { icon: 'code', title: 'Key Concepts', content: ['Explain the concepts here.'] },
    { icon: 'rocket', title: 'Conclusion', conclusion: true, content: ['Wrap it up.'] },
  ], null, 2),
};

// Helpers to normalize backend data for display
const normalizeReadTime = (rt) => {
  if (!rt) return '5 min';
  if (typeof rt === 'number') return `${rt} min`;
  if (typeof rt === 'string') {
    if (rt.includes('min')) return rt;
    return `${rt} min`;
  }
  return '5 min';
};

const normalizeDifficulty = (d) => {
  if (!d) return 'easy';
  return d.toLowerCase();
};

const normalizeTags = (tags) => {
  if (!tags) return '';
  if (Array.isArray(tags)) return tags.join(', ');
  if (typeof tags === 'string') return tags;
  return '';
};

const normalizeSections = (sections) => {
  if (!sections) return JSON.stringify([], null, 2);
  if (typeof sections === 'string') {
    try { JSON.parse(sections); return sections; } catch { return JSON.stringify([], null, 2); }
  }
  if (Array.isArray(sections)) return JSON.stringify(sections, null, 2);
  return JSON.stringify([], null, 2);
};

const BlogEditor = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const { toasts, show } = useToast();

  const [form, setForm] = useState({ ...BLANK_POST });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    if (!isEdit || !slug) return;
    const load = async () => {
      try {
        const res = await authFetch(`/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          const post = data.data || {};
          setForm((prev) => ({
            ...prev,
            ...post,
            readTime: normalizeReadTime(post.readTime),
            difficulty: normalizeDifficulty(post.difficulty),
            tags: normalizeTags(post.tags),
            sections: normalizeSections(post.sections),
          }));
          return;
        }
      } catch { /* fallback - keep blank form */ }
    };
    load();
  }, [slug, isEdit]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.slug.trim()) errs.slug = 'Slug is required';
    else if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = 'Slug must be lowercase letters, numbers, and hyphens only';
    if (!form.excerpt.trim()) errs.excerpt = 'Excerpt is required';
    if (!form.date.trim()) errs.date = 'Date is required';
    if (!form.readTime.trim()) errs.readTime = 'Read time is required';
    try { JSON.parse(form.sections); } catch { errs.sections = 'Invalid JSON in sections'; }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      // Parse readTime integer from string (e.g., "5 min" -> 5)
      const readTimeInt = parseInt(form.readTime) || 5;

      // Capitalize difficulty for backend ("easy" -> "Easy")
      const difficultyCapitalized = form.difficulty
        ? form.difficulty.charAt(0).toUpperCase() + form.difficulty.slice(1).toLowerCase()
        : 'Easy';

      // Build payload matching backend model exactly
      const payload = {
        slug: form.slug,
        title: form.title,
        subtitle: form.subtitle || '',
        excerpt: form.excerpt,
        content: '',
        date: form.date,
        readTime: readTimeInt,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        difficulty: difficultyCapitalized,
        author: form.author || 'Mendis AI',
        published: true,
        category: form.category || 'General',
        authorTitle: form.authorTitle || 'Your Friendly Neighbourhood AI',
        authorAvatar: form.authorAvatar || '/blog-robot.svg',
        heroImage: form.heroImage || '',
        sections: JSON.parse(form.sections),
      };

      const endpoint = isEdit ? `/blogs/${slug}` : '/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await authFetch(endpoint, { method, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) {
        show(isEdit ? 'Post updated successfully' : 'Post created successfully', 'success');
        setTimeout(() => navigate('/admin/blog'), 800);
      } else {
        show(data.error || `Error ${res.status}: ${res.statusText}`, 'error');
      }
    } catch {
      show('Network error. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    if (!form.title) return;
    const s = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 60);
    updateField('slug', s);
  };

  const previewContent = () => {
    try { return JSON.parse(form.sections); } catch { return []; }
  };

  return (
    <div className="admin-page">
      <ToastContainer toasts={toasts} />
      <div className="admin-header">
        <div className="admin-header-left">
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => navigate('/admin/blog')}>
            <FaArrowLeft /> Back
          </button>
          <h1>{isEdit ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="admin-header-right">
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setPreview((p) => !p)}>
            <FaEye /> {preview ? 'Edit' : 'Preview'}
          </button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave} disabled={saving}>
            <FaSave /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="admin-container">
        {preview ? (
          <div className="admin-table-wrapper" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>{form.title || 'Untitled'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{form.subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span><FaCalendarAlt /> {form.date}</span>
              <span><FaClock /> {form.readTime}</span>
            </div>
            {previewContent().map((section, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{section.title}</h3>
                {section.content?.map((p, j) => (
                  <p key={j} style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.7 }}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} noValidate style={{ maxWidth: '800px' }}>
            <div className="admin-form-row grid-2">
              <div className="admin-form-group">
                <label htmlFor="title"><FaHeading /> Title *</label>
                <input id="title" value={form.title} onChange={(e) => updateField('title', e.target.value)}
                  onBlur={generateSlug} placeholder="Enter post title" className={errors.title ? 'admin-input-error' : ''} />
                {errors.title && <span className="admin-error-text">{errors.title}</span>}
              </div>
              <div className="admin-form-group">
                <label htmlFor="slug"><FaLink /> Slug *</label>
                <input id="slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)}
                  placeholder="post-url-slug" className={errors.slug ? 'admin-input-error' : ''} />
                {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
                <span className="admin-help-text">Lowercase, letters, numbers, hyphens only</span>
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="subtitle"><FaAlignLeft /> Subtitle</label>
              <input id="subtitle" value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Brief subtitle describing the post" />
            </div>

            <div className="admin-form-group">
              <label htmlFor="excerpt"><FaAlignLeft /> Excerpt *</label>
              <textarea id="excerpt" rows={3} value={form.excerpt} onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Short description for listings" className={errors.excerpt ? 'admin-input-error' : ''} />
              {errors.excerpt && <span className="admin-error-text">{errors.excerpt}</span>}
            </div>

            <div className="admin-form-row grid-3">
              <div className="admin-form-group">
                <label htmlFor="category"><FaLayerGroup /> Category</label>
                <input id="category" value={form.category} onChange={(e) => updateField('category', e.target.value)}
                  placeholder="e.g. Data Structures" />
              </div>
              <div className="admin-form-group">
                <label htmlFor="readTime"><FaClock /> Read Time *</label>
                <input id="readTime" value={form.readTime} onChange={(e) => updateField('readTime', e.target.value)}
                  placeholder="e.g. 8 min" className={errors.readTime ? 'admin-input-error' : ''} />
                {errors.readTime && <span className="admin-error-text">{errors.readTime}</span>}
              </div>
              <div className="admin-form-group">
                <label htmlFor="date"><FaCalendarAlt /> Date *</label>
                <input id="date" value={form.date} onChange={(e) => updateField('date', e.target.value)}
                  placeholder="May 1, 2026" className={errors.date ? 'admin-input-error' : ''} />
                {errors.date && <span className="admin-error-text">{errors.date}</span>}
              </div>
            </div>

            <div className="admin-form-row grid-2">
              <div className="admin-form-group">
                <label htmlFor="tags"><FaTag /> Tags (comma separated)</label>
                <input id="tags" value={form.tags} onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="algorithm, javascript, beginner" />
              </div>
              <div className="admin-form-group">
                <label htmlFor="difficulty"><FaLayerGroup /> Difficulty</label>
                <select id="difficulty" value={form.difficulty} onChange={(e) => updateField('difficulty', e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="heroImage"><FaImage /> Hero Image URL</label>
              <input id="heroImage" value={form.heroImage} onChange={(e) => updateField('heroImage', e.target.value)}
                placeholder="https://example.com/image.jpg or /local-path.svg" />
            </div>

            <div className="admin-form-group">
              <label htmlFor="sections"><FaLayerGroup /> Sections JSON *</label>
              <textarea id="sections" rows={20} value={form.sections}
                onChange={(e) => updateField('sections', e.target.value)}
                className={`admin-editor-textarea ${errors.sections ? 'admin-input-error' : ''}`} />
              {errors.sections && <span className="admin-error-text">{errors.sections}</span>}
              <span className="admin-help-text">Define article sections as JSON array. Each section needs icon, title, and content array.</span>
            </div>

            <div className="admin-btn-group admin-btn-group-right">
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/blog')}>
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                <FaSave /> {saving ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
