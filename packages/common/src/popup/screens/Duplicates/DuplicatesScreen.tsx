import { FC } from 'react';
import { useData } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { DetailsHeader } from '../Details/DetailsHeader';
import { DuplicateListItem } from '../../components';

export const DuplicatesScreen: FC = () => {
  const { duplicates } = useData();

  return (
    <>
      <DetailsHeader title="Duplicates" />
      <ul className={screenList}>
        {duplicates.map(item => (
          <DuplicateListItem data={item} key={item.url} />
        ))}
      </ul>
    </>
  );
};
