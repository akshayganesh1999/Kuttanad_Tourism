import { Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/uiSlice';

const ThemeToggle = ({ className = '' }) => {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-backwater-100 bg-white text-backwater-700 transition hover:bg-backwater-50 dark:border-white/10 dark:bg-white/5 dark:text-gold-400 dark:hover:bg-white/10 ${className}`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
};

export default ThemeToggle;
