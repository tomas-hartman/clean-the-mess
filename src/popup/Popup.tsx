import ReactDOM from 'react-dom';
import { DataProvider } from './providers/DataProvider';
import { RouterProvider } from './providers/RouterProvider';
import { Router } from './screens/Router';

import './Popup.css';

export default function Popup() {
  return (
    <DataProvider>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </DataProvider>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
