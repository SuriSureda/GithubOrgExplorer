import './App.css';
import { GithubTokenSetter } from './Github/Components/GithubTokenSetter';
import { OrganizationSearcher } from './Github/Components/OrganizationSearcher';
import { OrganizationsCount } from './Github/Components/OrganizationsCount';
import { Header } from './Shared/Components/Header';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app-content'>
        <GithubTokenSetter />
        <OrganizationsCount />
        <OrganizationSearcher />
      </div>
    </div>
  );
}

export default App;
