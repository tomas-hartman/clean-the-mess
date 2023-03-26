import { FC } from 'react';
import { DetailItemType } from './DetailItem';
import { detailItemBody, detailItemBodyExtraText, detailItemBodyText } from './DetailItem.css';

type DetailItemBodyProps = {
  id?: number;
  title?: string;
  decodedUrl: string;
  date: string;
  type: DetailItemType;
  goToTab: (id?: number) => void;
};

export const DetailItemBody: FC<DetailItemBodyProps> = ({ id, title, goToTab, date, decodedUrl, type }) => (
  <div className={detailItemBody} onClick={() => goToTab(id)} onKeyPress={() => goToTab(id)} role="link" tabIndex={0}>
    <span className={detailItemBodyText} title={title}>
      {title}
    </span>
    {type === 'url' && (
      <span className={detailItemBodyExtraText} title={decodedUrl}>
        {decodedUrl}
      </span>
    )}
    {date && type === 'lastDisplayed' && (
      <span className={detailItemBodyExtraText} title={date}>
        {date}
      </span>
    )}
  </div>
);
