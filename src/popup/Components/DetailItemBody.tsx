import { FC } from 'react';
import { DetailItemType } from './DetailItem';
import { detailItemBody, detailItemBodyExtraText, detailItemBodyText } from './DetailItem.css';

type DetailItemBodyProps = {
  title?: string;
  decodedUrl: string;
  date: string;
  type: DetailItemType;
};

export const DetailItemBody: FC<DetailItemBodyProps> = ({ title, date, decodedUrl, type }) => (
  <div className={detailItemBody}>
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
