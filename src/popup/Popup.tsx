import ReactDOM from 'react-dom';
import { DataProvider } from './providers/DataProvider';
import { RouterProvider } from './providers/RouterProvider';
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
      <RouterProvider>
        <Router />
      </RouterProvider>
    </DataProvider>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
