import { ReactNode } from 'react';
import './index.css';

export const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='card'>{children}</div>;
};
