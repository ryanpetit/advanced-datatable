import './App.css'
import AdvancedTable from './components/datatable/advanced-filter-examples'
import { useContext } from 'react';
import { ThemeContext } from './components/theme-provider';
import { Moon, SunMedium } from 'lucide-react';
import { Button } from './components/ui/button';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Button
      variant="outline" size="sm" className="ml-auto cursor-pointer bg-transparent"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ position: 'absolute', top: 16, right: 16 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon /> : <SunMedium />}
    </Button>
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
