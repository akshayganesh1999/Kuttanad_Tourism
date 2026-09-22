import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const ThemeEffect = () => {
  const theme = useSelector((s) => s.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  return null;
};

export default ThemeEffect;
