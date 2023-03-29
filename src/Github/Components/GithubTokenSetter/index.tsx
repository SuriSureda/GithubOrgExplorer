import { ChangeEvent, useState } from 'react';
import { Card } from '../../../Shared/Components/Card';
import { useAppState } from '../../../Shared/Hooks/useAppState';
import './index.css';

const placeholder = 'Your GITHUB token';

export const GithubTokenSetter = () => {
  const { github } = useAppState();
  const { updateToken, clearToken } = github;
  const [token, setToken] = useState(github.token ?? '');

  const handleChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleClearToken = () => {
    clearToken();
    setToken('');
  };

  const handleSaveToken = () => {
    updateToken(token);
  };

  return (
    <div id='github-token-setter-container'>
      <Card>
        In order to increase rate limit for Github API calls, provide your Github token here:
        <br />
        <input
          id='github-token-input'
          type='text'
          value={token}
          style={{ width: `${(token?.length < placeholder.length ? placeholder.length : token.length) + 1}ch` }}
          onChange={handleChangeToken}
          placeholder={placeholder}
        />
        <br />
        {github.token ? (
          <button onClick={handleClearToken}>Clear token</button>
        ) : (
          <button onClick={handleSaveToken} disabled={!token}>
            Save token
          </button>
        )}
      </Card>
    </div>
  );
};
