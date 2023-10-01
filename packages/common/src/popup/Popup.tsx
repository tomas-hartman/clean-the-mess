import { DataProvider } from './providers/DataProvider';
import { NavigationProvider } from './providers';
import { Router } from './screens/Router';
import { useColorScheme } from './hooks';
import { createRoot } from 'react-dom/client';
import { isChrome } from './utils';

// Global theme style
import '../styles/global.css';

if (isChrome()) {
  import('../styles/themesChrome.css');
} else {
  import('../styles/themesFirefox.css');
}

export default function Popup() {
  useColorScheme();

  return (
    <DataProvider>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </DataProvider>
  );
}

const container = document.getElementById('main-container');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
