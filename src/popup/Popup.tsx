import ReactDOM from 'react-dom';
import { DataProvider } from './providers/DataProvider';
import { NavigationProvider } from './providers';
import { Router } from './screens/Router';
import { useColorScheme } from './hooks';

// Global theme style

import '../styles/global.css';

if (process.env.BROWSER === 'firefox') {
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

ReactDOM.render(<Popup />, document.getElementById('main-container'));
