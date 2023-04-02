import ReactDOM from 'react-dom';
import { DataProvider } from './providers/DataProvider';
import { RouterProvider } from './providers/RouterProvider';
import { Router } from './screens/Router';
import { useColorScheme } from './hooks';

import '../styles/global.css';

// Global theme style
// TODO: theming
import '../styles/firefoxTheme.css';

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
