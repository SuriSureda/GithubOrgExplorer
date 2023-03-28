import './App.css';
import { OrganizationsCount } from './Github/Components/OrganizationsCount';
import { Header } from './Shared/Components/Header';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app-content'>
        <OrganizationsCount />
      </div>
    </div>
  );
}

export default App;
