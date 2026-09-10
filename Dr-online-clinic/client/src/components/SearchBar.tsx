import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <input
        type="text"
        placeholder="Search doctors by name or specialty..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          fontSize: '1rem',
          outline: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#0f172a'
        }}
      />
    </div>
  );
};

export default SearchBar;
