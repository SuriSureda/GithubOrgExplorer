import { ReactNode, useMemo } from 'react';
import { useSearchOrganizationsByName } from '../../Hooks/useSearchOrganizationsByName';
import { OrganizationCard } from '../OrganizationCard';
import './index.css';

type Props = {
  nameToSearch: string;
};

const OrganizationSearcherResultsHeader: React.FC<{ count: number; children: ReactNode }> = ({ count, children }) => {
  if (count === -1) return null;
  return (
    <div id='org-searcher-results-header'>
      <h3>Found {count} results </h3>
      {children}
    </div>
  );
};

export const OrganizationSearcherResults: React.FC<Props> = ({ nameToSearch }) => {
  const { result, loading, prevButton, nextButton, page } = useSearchOrganizationsByName(nameToSearch);
  const { totalCount, organizations } = result;

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / 30);
  }, [totalCount]);

  const header = (
    <OrganizationSearcherResultsHeader count={!nameToSearch ? -1 : totalCount}>
      <div id='org-searcher-results-buttons'>
        {prevButton}
        <span id='org-searcher-results-pagination'>
          <span id='org-searcher-results-page'>{totalCount === 0 ? 0 : page}</span>/{totalPages}
        </span>
        {nextButton}
      </div>
    </OrganizationSearcherResultsHeader>
  );

  const content = (() => {
    if (loading) {
      return <div id='org-searcher-loading-results'>Loading results...</div>;
    }

    if (totalCount === -1) {
      return <div id='org-searcher-no-results'>Please enter the organization name to search</div>;
    }

    return (
      <div id='org-searcher-grid'>
        {organizations.map((org) => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>
    );
  })();

  return (
    <div>
      {header}
      {content}
    </div>
  );
};
