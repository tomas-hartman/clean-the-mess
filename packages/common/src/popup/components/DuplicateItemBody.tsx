import { FC } from 'react';
import { detailItemBody, detailItemBodyExtraText, detailItemBodyText } from './DetailItem.css';

type DetailItemBodyProps = {
  url: string;
  title?: string;
};

export const DuplicateItemBody: FC<DetailItemBodyProps> = ({ url, title }) => (
  <div className={detailItemBody}>
    <span className={detailItemBodyText} title={url}>
      {url}
    </span>
    {title && (
      <span className={detailItemBodyExtraText} title={title}>
        {title}
      </span>
    )}
    {/* {type === 'url' && (
        {decodedUrl}
    )}
    {date && type === 'lastDisplayed' && (
      <span className={detailItemBodyExtraText} title={date}>
        {date}
      </span>
    )} */}
  </div>
);
