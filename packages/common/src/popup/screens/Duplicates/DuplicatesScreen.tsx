import { FC, useEffect } from 'react';
import { useData } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { DetailsHeader } from '../Details/DetailsHeader';
import { DuplicateListItem } from '../../components';
import { useNavigate } from '../../providers';
import { SCREEN } from '../../types';

type DuplicatesScreenProps = {
  isActive: boolean;
};

export const DuplicatesScreen: FC<DuplicatesScreenProps> = ({ isActive }) => {
  const { duplicates } = useData();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (isActive && duplicates.length === 0) {
      navigate(SCREEN.OVERVIEW);
    }
  }, [duplicates, navigate, isActive]);

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
