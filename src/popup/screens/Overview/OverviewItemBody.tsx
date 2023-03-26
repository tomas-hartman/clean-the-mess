import { FC } from 'react';
import { detailItemBodyText } from '../../components/DetailItem.css';
import { overviewItemBody } from './OverviewItem.css';

type OverviewItemBodyProps = {
  url?: string;
  displayedUrl: string;
  onDetailClick: () => void;
};

/* https://stackoverflow.com/questions/34349136/react-how-to-capture-only-parents-onclick-event-and-not-children/47155034 */
export const OverviewItemBody: FC<OverviewItemBodyProps> = ({ onDetailClick, url, displayedUrl }) => {
  return (
    <div className={overviewItemBody} onClick={onDetailClick} onKeyPress={onDetailClick} role="link" tabIndex={0}>
      <span className={detailItemBodyText} title={url}>
        {displayedUrl}
      </span>
    </div>
  );
};
