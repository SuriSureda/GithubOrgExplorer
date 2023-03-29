import { Card } from '../../../Shared/Components/Card';
import { Organization } from '../../Domain/Organization';
import './index.css';

type Props = {
  organization: Organization;
};

export const OrganizationCard: React.FC<Props> = ({ organization }) => {
  return (
    <Card>
      <h4 className='organization-name'>{organization.login}</h4>
      <img className='organization-avatar' src={organization.avatar_url} alt={`${organization.login} avatar`} />
    </Card>
  );
};
