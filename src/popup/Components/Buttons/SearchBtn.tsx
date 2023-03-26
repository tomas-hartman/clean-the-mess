import { FC } from 'react';
import { Button } from './Button';

interface SearchBtnProps {
  onClick: () => void;
}

export const SearchBtn: FC<SearchBtnProps> = ({ onClick }) => {
  return <Button title="Search" onClick={onClick} icon="Search24" size="large" />;
};
