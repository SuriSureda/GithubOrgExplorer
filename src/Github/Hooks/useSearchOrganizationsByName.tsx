import { useEffect, useMemo, useState } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { Organization } from '../Domain/Organization';
import { useAppState } from '../../Shared/Hooks/useAppState';

type SearchResult = {
  totalCount: number;
  organizations: Organization[];
};

const getPagesRemaining = (response: Response | null) => {
  if (!response) return false;

  const linkHeader = response.headers.get('Link');

  return Boolean(linkHeader && linkHeader.includes(`rel="next"`));
};

export const useSearchOrganizationsByName = (nameToSearch: string) => {
  const [page, setPage] = useState(1);
  const { data, loading, fetch, response } = useFetch();

  const { githubToken } = useAppState();

  const searchResult: SearchResult = {
    totalCount: data?.total_count ?? -1,
    organizations: data?.items ?? [],
  };

  const url = useMemo(() => {
    if (!nameToSearch) {
      return '';
    }
    return `https://api.github.com/search/users?q=${nameToSearch} in:login type:org&page=${page}`;
  }, [page, nameToSearch]);

  //on change name -> init page
  useEffect(() => {
    setPage(1);
  }, [nameToSearch]);

  // on update url -> search
  useEffect(() => {
    if (url) {
      fetch({
        url,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: githubToken ? `Bearer ${githubToken}` : '',
        },
      });
    }
  }, [url, fetch, githubToken]);

  const pagesRemaining = getPagesRemaining(response);

  const prevPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  const nextPage = () => {
    if (!pagesRemaining) return;
    setPage((page) => page + 1);
  };

  const nextButton = (
    <button className='org-search-button' onClick={nextPage} disabled={!pagesRemaining}>
      Next
    </button>
  );

  const prevButton = (
    <button className='org-search-button' onClick={prevPage} disabled={page === 1}>
      Prev
    </button>
  );

  return {
    result: searchResult,
    page,
    nextButton,
    prevButton,
    loading,
  };
};
