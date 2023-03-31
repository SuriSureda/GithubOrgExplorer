import { useMemo } from 'react';
import { Organization } from '../../Domain/Organization';
import { useFetchOrganizationRepos } from '../../Hooks/useFetchOrganizationRepos';
import { OrganizationRepoCard } from '../OrganizationRepoCard';
import './index.css';

type Props = {
  organization?: Organization;
};

const reposCountInfo = ({ privateCount, publicCount }: { privateCount?: number; publicCount?: number }) => {
  if (!privateCount && !publicCount) return;

  const privateReposText = privateCount ? `🔒: ${privateCount}` : '';
  const publicReposText = publicCount ? `🌍: ${publicCount}` : '';

  return `${publicReposText} ${privateReposText}`;
};

export const OrganizationReposList: React.FC<Props> = ({ organization }) => {
  const { organizationRepos, loading } = useFetchOrganizationRepos(organization?.login);

  const sortedReposeBySize = useMemo(() => {
    if (!organizationRepos) return null;
    return organizationRepos.sort((repoA, repoB) => repoB.size - repoA.size);
  }, [organizationRepos]);

  const reposInfo = useMemo(() => {
    if (!organizationRepos) return {};
    const privateRepos = organizationRepos.filter((repo) => repo.private);

    return {
      privateCount: privateRepos.length,
      publicCount: organizationRepos.length - privateRepos.length,
    };
  }, [organizationRepos]);

  if (!organization) return null;

  if (loading || !sortedReposeBySize) {
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
        <span className='organization-repost-list-counter-info'>{reposCountInfo(reposInfo)}</span>
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
