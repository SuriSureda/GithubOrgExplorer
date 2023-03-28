export const Header: React.FC = () => {
  return (
    <header className='app-header'>
      <div id='header-title-logo'>
        <img id='header-logo' src='/logo.svg' alt='header logo' />
        <h1 id='header-title'>Github Org Explorer</h1>
      </div>
    </header>
  );
};
