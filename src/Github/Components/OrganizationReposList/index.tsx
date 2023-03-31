import { useMemo } from 'react';
import { Organization } from '../../Domain/Organization';
import { useFetchOrganizationRepos } from '../../Hooks/useFetchOrganizationRepos';
import { OrganizationRepoCard } from '../OrganizationRepoCard';
import './index.css';

type Props = {
  organization?: Organization;
};

export const OrganizationReposList: React.FC<Props> = ({ organization }) => {
  const { organizationRepos, loading } = useFetchOrganizationRepos(organization?.login);

  const sortedReposeBySize = useMemo(() => {
    if (!organizationRepos) return null;
    return organizationRepos.sort((repoA, repoB) => repoB.size - repoA.size);
  }, [organizationRepos]);

  if (!organization || !sortedReposeBySize) return null;

  if (loading) {
    return (
      <div>
        <h4>Loading organization repositories...</h4>
      </div>
    );
  }

  return (
    <div className='organization-repos-list-wrapper'>
      <div className='organization-repos-list-header'>
        <h4>
          Repositories List <span className='organization-repos-list-header-explanation'>(sorted by size)</span>
        </h4>
        <span className='organization-repost-list-counter'>
          Found: <strong>{sortedReposeBySize.length} repositories</strong>
        </span>
      </div>
      <ul className='organization-repos-list'>
        {sortedReposeBySize.map((orgRepo) => (
          <li key={orgRepo.id} className='organization-repo'>
            <OrganizationRepoCard repository={orgRepo} />
          </li>
        ))}
      </ul>
    </div>
  );
};
