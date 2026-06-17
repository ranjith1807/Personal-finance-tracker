import { auth, signOut } from '../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';

function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <h1>Financly.</h1>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'white' }}>Welcome, {user.displayName || 'User'}</span>
          <Button type="text" onClick={handleLogout} style={{ color: 'white' }}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;