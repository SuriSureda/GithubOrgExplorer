import { ChangeEvent, useState } from 'react';
import { Card } from '../../../Shared/Components/Card';
import useDebounce from '../../../Shared/Hooks/useDebounce';
import { OrganizationSearcherResults } from './OrganizationsSearcherResult';
import './index.css';

const placeholder = 'Organization name';

const getInputWidth = (value: string) => {
  const lenght = value.length < placeholder.length ? placeholder.length : value.length;
  return `${lenght + 1}ch`;
};

export const OrganizationSearcher: React.FC = () => {
  const [name, setName] = useState('');
  const nameToSearch = useDebounce(name, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Card>
      <div id='org-searcher-search'>
        <h2>Organization Searcher</h2>
        <input
          id='org-searcher-input'
          style={{ width: getInputWidth(name), maxWidth: '100ch' }}
          type='search'
          onChange={handleChange}
          placeholder='Organization name'
        />
      </div>
      <div id='org-searcher-result'>{<OrganizationSearcherResults nameToSearch={nameToSearch} />}</div>
    </Card>
  );
};
