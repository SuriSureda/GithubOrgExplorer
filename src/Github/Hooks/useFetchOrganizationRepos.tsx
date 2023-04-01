import { useEffect, useState } from 'react';
import { OrganizationRepo } from '../Domain/OrganizationRepo';
import { useFetchGithub } from './useFetchGithub';

export const useFetchOrganizationRepos = (orgName?: string) => {
  const { data, fetch, response, loading: fetchLoading } = useFetchGithub();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [repos, setRepos] = useState<OrganizationRepo[]>();

  useEffect(() => {
    if (!orgName) {
      setPage(0);
      setRepos(undefined);
      setLoading(true);
      return;
    }
    setPage(1);
  }, [orgName]);

  useEffect(() => {
    if (fetchLoading || page === 0) return;
    fetch({
      path: `orgs/${orgName}/repos`,
      params: {
        type: 'all',
        page: page,
      },
    });
  }, [fetch, page, orgName, fetchLoading]);

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
