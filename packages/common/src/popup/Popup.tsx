import { DataProvider } from './providers/DataProvider';
import { NavigationProvider } from './providers';
import { Router } from './screens/Router';
import { useColorScheme } from './hooks';
import { createRoot } from 'react-dom/client';

// Global theme style

import '../styles/global.css';

if (process.env.BROWSER_NAME === 'firefox') {
  import('../styles/themesFirefox.css');
} else {
  import('../styles/themesChrome.css');
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
