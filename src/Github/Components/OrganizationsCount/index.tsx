import { Card } from '../../../Shared/Components/Card';
import { useFetchOrganizationsCount } from '../../Hooks/useFetchOrganizationsCount';
import './index.css';
import { Counter } from './Counter';

const formatTimeNumber = (number: number) => {
  return `${number < 10 ? 0 : ''}${number}`;
};

const getTimeInfo = (timestamp: Date) => {
  const hours = formatTimeNumber(timestamp.getHours());
  const minutes = formatTimeNumber(timestamp.getMinutes());

  return `${hours}:${minutes}`;
};

export const OrganizationsCount: React.FC = () => {
  const { count, timestamp } = useFetchOrganizationsCount(60);

  const content =
    count === -1 || count == null ? (
      <div style={{ textAlign: 'center', width: '100%' }}>Loading ...</div>
    ) : (
      <div>
        <div id='counter-message'>
          Actually at GitHub there are
          <div id='counter-info'>
            <Counter count={count} />
            <div>organizations</div>
          </div>
        </div>
        <div id='counter-time'>Fetched at : {getTimeInfo(timestamp)}</div>
      </div>
    );

  return <Card>{content}</Card>;
};
