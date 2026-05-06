import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import './CodeBlock.css';

/**
 * CodeBlock - Syntax highlighted code display with copy button
 * @param {string} code - The code string to display
 * @param {string} language - Language for display label (python, javascript, etc)
 */
export const CodeBlock = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Simple syntax highlighting
  const highlightCode = (code) => {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/('.*?'|".*?"|'''[\s\S]*?'''|"""[\s\S]*?""")/g, '<span class="code-string">$1</span>')
      .replace(/\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|with|lambda|yield|raise|pass|break|continue|in|and|or|not|is|True|False|None)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/\b(print|len|range|map|filter|zip|enumerate|sum|min|max|abs|round|sorted|reversed|type|str|int|float|list|dict|tuple|set|open|input)\b/g, '<span class="code-builtin">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>')
      .replace(/(\w+)\s*\(/g, '<span class="code-function">$1</span>(');
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="code-lang">{language}</span>
        <button className="code-copy-btn" onClick={handleCopy} title="Copy to clipboard">
          {copied ? <FaCheck /> : <FaCopy />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-content">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
};
