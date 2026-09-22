import { useState } from 'react';
import Button from '../Button';

const getPath = (obj, path) => path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

const setPath = (obj, path, value) => {
  const keys = path.split('.');
  const next = { ...obj };
  let cursor = next;
  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] = { ...(cursor[key] || {}) };
      cursor = cursor[key];
    }
  });
  return next;
};

const EntityForm = ({ fields, initialValues = {}, onSubmit, submitting, submitLabel = 'Save' }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field, raw) => {
    const value = field.type === 'number' ? (raw === '' ? '' : Number(raw)) : raw;
    setValues((prev) => setPath(prev, field.name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = values;
    fields.forEach((field) => {
      if (field.type === 'tags') {
        const raw = getPath(payload, field.name);
        const arr = typeof raw === 'string' ? raw.split(',').map((s) => s.trim()).filter(Boolean) : raw || [];
        payload = setPath(payload, field.name, arr);
      }
    });
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const rawValue = getPath(values, field.name);
          const displayValue = field.type === 'tags' && Array.isArray(rawValue) ? rawValue.join(', ') : rawValue;
          const wrapperClass = field.fullWidth ? 'sm:col-span-2' : '';

          if (field.type === 'checkbox') {
            return (
              <label key={field.name} className={`flex items-center gap-2 text-sm text-charcoal-800 ${wrapperClass}`}>
                <input
                  type="checkbox"
                  checked={Boolean(rawValue)}
                  onChange={(e) => handleChange(field, e.target.checked)}
                  className="rounded border-backwater-200 text-backwater-700 focus:ring-backwater-500"
                />
                {field.label}
              </label>
            );
          }

          if (field.type === 'select') {
            return (
              <label key={field.name} className={wrapperClass}>
                <span className="mb-1 block text-sm font-medium text-backwater-900">{field.label}</span>
                <select
                  value={displayValue ?? ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.required}
                  aria-required={field.required}
                  className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (field.type === 'multiselect') {
            const selected = Array.isArray(rawValue) ? rawValue : [];
            const toggle = (val) => {
              const next = selected.includes(val) ? selected.filter((x) => x !== val) : [...selected, val];
              handleChange(field, next);
            };
            return (
              <div key={field.name} className={wrapperClass || 'sm:col-span-2'}>
                <span className="mb-1 block text-sm font-medium text-backwater-900">{field.label}</span>
                <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-lg border border-backwater-100 p-2">
                  {field.options.length === 0 && <p className="text-xs text-charcoal-800/50">No options available.</p>}
                  {field.options.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => toggle(opt.value)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        selected.includes(opt.value)
                          ? 'bg-backwater-700 text-white'
                          : 'border border-backwater-100 text-charcoal-800 hover:bg-backwater-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === 'textarea') {
            return (
              <label key={field.name} className={wrapperClass}>
                <span className="mb-1 block text-sm font-medium text-backwater-900">{field.label}</span>
                <textarea
                  rows={field.rows || 3}
                  value={displayValue ?? ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  aria-required={field.required}
                  className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
                />
              </label>
            );
          }

          return (
            <label key={field.name} className={wrapperClass}>
              <span className="mb-1 block text-sm font-medium text-backwater-900">{field.label}</span>
              <input
                type={field.type === 'number' ? 'number' : 'text'}
                value={displayValue ?? ''}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                aria-required={field.required}
                className="w-full rounded-lg border border-backwater-100 px-3 py-2.5 text-sm outline-none focus:border-backwater-500"
              />
            </label>
          );
        })}
      </div>

      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  );
};

export default EntityForm;
