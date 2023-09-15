import { FC } from 'react';
import { detailItemBodyText } from '../../components/DetailItem.css';
import { overviewItemBody } from './OverviewItem.css';

type OverviewItemBodyProps = {
  url?: string;
  displayedUrl: string;
};

export const OverviewItemBody: FC<OverviewItemBodyProps> = ({ url, displayedUrl }) => (
  <div className={overviewItemBody}>
    <span className={detailItemBodyText} title={url}>
      {displayedUrl}
    </span>
  </div>
);
