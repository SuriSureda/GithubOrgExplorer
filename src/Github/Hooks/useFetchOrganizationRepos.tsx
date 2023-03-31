import { useEffect, useState } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { useAppState } from '../../Shared/Hooks/useAppState';
import { OrganizationRepo } from '../Domain/OrganizationRepo';

export const useFetchOrganizationRepos = (orgName?: string) => {
  const { github } = useAppState();
  const { data, fetch, response, loading: fetchLoading } = useFetch();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [repos, setRepos] = useState<OrganizationRepo[]>();

  useEffect(() => {
    if (!orgName) {
      setPage(0);
      setRepos(undefined);
      return;
    }
    setLoading(true);
    setPage(1);
  }, [orgName]);

  useEffect(() => {
    if (fetchLoading || page === 0) return;
    fetch({
      url: `https://api.github.com/orgs/${orgName}/repos?page=${page}`,
      headers: {
        Authorization: github.token ? `Bearer ${github.token}` : '',
      },
    });
  }, [github.token, fetch, page, orgName, fetchLoading]);

  useEffect(() => {
    if (data) {
      setRepos((prev) => {
        return [...(prev ?? []), ...data];
      });
    }
  }, [data]);

  useEffect(() => {
    if (!response) return;

    const linkHeader = response.headers.get('Link');

    if (!linkHeader || !linkHeader.includes(`rel="next"`)) {
      setLoading(false);
      setPage(0);
      return;
    }

    setPage((page) => page + 1);
  }, [response]);

  return {
    loading,
    organizationRepos: repos,
  };
};
