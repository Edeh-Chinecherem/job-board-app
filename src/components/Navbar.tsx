import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Bookmark, Home, Dashboard, Login, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Board
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <Home sx={{ mr: 1 }} /> Home
        </Button>
        <Button color="inherit" component={Link} to="/bookmarks">
          <Badge badgeContent={user?.bookmarks.length} color="secondary">
            <Bookmark sx={{ mr: 1 }} /> Bookmarks
          </Badge>
        </Button>
        {user?.isAdmin && (
          <Button color="inherit" component={Link} to="/admin">
            <Dashboard sx={{ mr: 1 }} /> Admin
          </Button>
        )}
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} /> Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            <Login sx={{ mr: 1 }} /> Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};