import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import ThemeEffect from './components/ThemeEffect';

function App() {
  return (
    <BrowserRouter>
      <ThemeEffect />
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
