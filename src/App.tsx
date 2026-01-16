import './App.css'
import AdvancedTable from './components/advanced-filter-examples'
import {useContext} from 'react';
import { ThemeContext } from './components/theme-provider';
import { Moon, SunMedium } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ position: 'absolute', top: 16, right: 16 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon /> : <SunMedium />}
    </button>
  );
}

function App() {
  return (
    <div>
      <ThemeToggle />
      <AdvancedTable />
    </div>
  )
}

export default App
