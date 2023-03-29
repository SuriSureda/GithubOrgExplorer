import { Card } from '../../../Shared/Components/Card';
import { Organization } from '../../Domain/Organization';
import './index.css';

type Props = {
  organization: Organization;
};

export const OrganizationCard: React.FC<Props> = ({ organization }) => {
  return (
    <Card>
      <div className='organization-card'>
        <a className='organization-link' href={organization.html_url} target='_blank' rel='noopener noreferrer'>
          <h4 className='organization-name'>{organization.login}</h4>
        </a>
        <img className='organization-avatar' src={organization.avatar_url} alt={`${organization.login} avatar`} />
      </div>
    </Card>
  );
};
