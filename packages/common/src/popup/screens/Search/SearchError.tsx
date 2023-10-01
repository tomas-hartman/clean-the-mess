import { searchError } from './SearchError.css';

export const SearchError = () => (
  <li className={searchError}>
    <div className="item-container">
      Nothing to display. Either nothing was found or the search hasn&apos;t started yet.
    </div>
  </li>
);
