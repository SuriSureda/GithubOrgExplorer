import { Card } from '../../../Shared/Components/Card';
import { useAppState } from '../../../Shared/Hooks/useAppState';
import './index.css';

export const GithubTokenSetter = () => {
  const { updateToken, clearToken } = useAppState();

  return (
    <div id='github-token-setter-container'>
      <Card>hola</Card>
    </div>
  );
};
