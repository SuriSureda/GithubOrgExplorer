import { useEffect } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { useAppState } from '../../Shared/Hooks/useAppState';
import { OrganizationRepo } from '../Domain/OrganizationRepo';

export const useFetchOrganizationRepos = (reposURL?: string) => {
  const { github } = useAppState();
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    if (!reposURL) return;
    fetch({
      url: reposURL,
      headers: {
        Authorization: github.token ? `Bearer ${github.token}` : '',
      },
    });
  }, [fetch, reposURL, github.token]);

  const organizationRepos = !reposURL ? undefined : (data as OrganizationRepo[]);

  return {
    loading,
    organizationRepos: organizationRepos,
  };
};
