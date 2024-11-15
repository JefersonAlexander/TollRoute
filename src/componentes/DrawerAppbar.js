import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Elementos de navegación según el estado de autenticación
  const navItems = user
    ? user.is_superuser
      ? ['Home', 'AgregarRuta', 'AgregarPeaje']
      : ['Home']
    : ['Home','Register'];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={`/${item.toLowerCase()}`}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', color: '#2196f3'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#2196f3'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            TollRoute
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} component={Link} to={`/${item.toLowerCase()}`}>
                {item}
              </Button>
            ))}

            {user ? (
              <>
                <Typography variant="button" sx={{ ml: 2, color: '#fff' }}>
                  Bienvenido, {user.first_name}
                </Typography>
                <Button sx={{ color: '#fff' }} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button sx={{ color: '#fff' }} component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box sx={{ marginTop: '64px', flexGrow: 1 }}>
        {/* Aquí va el contenido principal de la aplicación */}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
