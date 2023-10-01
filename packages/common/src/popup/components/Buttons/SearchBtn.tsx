import { FC } from 'react';
import { Button } from './Button';

interface SearchBtnProps {
  onClick: () => void;
  isOverview?: boolean;
}

export const SearchBtn: FC<SearchBtnProps> = ({ onClick, isOverview }) => {
  return <Button title="Search" onClick={onClick} icon="Search24" size="large" isOverview={isOverview} />;
};
