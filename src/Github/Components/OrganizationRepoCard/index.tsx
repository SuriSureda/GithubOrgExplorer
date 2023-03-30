import { Card } from '../../../Shared/Components/Card';
import { OrganizationRepo } from '../../Domain/OrganizationRepo';
import './index.css';

type Props = {
  repository: OrganizationRepo;
};

const formatSize = (kilobytes: number) => {
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = units.findIndex((_, index) => kilobytes < Math.pow(1024, index + 1));
  const value = kilobytes / Math.pow(1024, index);
  return `${value.toFixed(2)} ${units[index]}`;
};

export const OrganizationRepoCard: React.FC<Props> = ({ repository }) => {
  const { size } = repository;

  const formattedSize = formatSize(size);

  return (
    <Card>
      <div className='organization-repo-card'>
        <h3 className='organization-repo-name'>{repository.name}</h3>
        <span className='organization-repo-description'>{repository.description}</span>
        <br />
        <div className='organization-repo-footer'>
          <span className='organization-repo-size'>🗃️ {formattedSize}</span>
          <a className='organization-repo-link' href={repository.html_url} target='_blank' rel='noreferrer'>
            🚀 Go to repo
          </a>
        </div>
      </div>
    </Card>
  );
};
