import '../styles/main.scss';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa' }}>
      <a href="/">Home</a>
      <div>
        <a href="/about">About</a>
        <a href="/contact" style={{ marginLeft: '20px' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
