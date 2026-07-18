import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  LogoutRounded,
  PersonRounded,
  SettingsRounded,
  KeyboardArrowDownRounded,
  LoginRounded,
} from '@mui/icons-material';

interface NavbarProps {
  username: string | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export function Navbar({ username, onLoginClick, onLogoutClick }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    onLogoutClick();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(11, 15, 25, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        height: '70px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: '100%', px: { xs: 2, sm: 3 } }}>
        {/* LOGO SECTION (Top Left) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(-5deg) scale(1.05)',
                boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
              },
            }}
          >
            {/* Elegant SVG Logo of a growing chart + K */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 20V10M12 20V4M6 20V14"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '1px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'linear-gradient(90deg, #FFFFFF 30%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            KUFIN
          </Typography>
        </Box>

        {/* USER SECTION (Top Right) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {username ? (
            <>
              {/* Premium Badge */}
              <Chip
                label="PREMIUM"
                size="small"
                sx={{
                  background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#A78BFA',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '1px',
                  display: { xs: 'none', sm: 'inline-flex' },
                }}
              />
              {/* User Dropdown Button */}
              <Button
                onClick={handleUserClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '12px',
                  color: '#F9FAFB',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    bgcolor: '#6366F1',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                  {username}
                </Typography>
                <KeyboardArrowDownRounded
                  sx={{
                    fontSize: 18,
                    color: 'rgba(255, 255, 255, 0.5)',
                    transform: openMenu ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Button>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      background: 'rgba(21, 28, 44, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                      p: 0.5,
                      width: 200,
                      '& .MuiMenuItem-root': {
                        borderRadius: '8px',
                        mx: 0.5,
                        my: 0.25,
                        py: 1,
                        px: 1.5,
                        color: 'rgba(255, 255, 255, 0.75)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: '#FFFFFF',
                        },
                      },
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                    {username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.45)', display: 'block' }}>
                    Usuario Premium
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', minWidth: 32 }}>
                    <PersonRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2">Mi Perfil</Typography>} />
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', minWidth: 32 }}>
                    <SettingsRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2">Configuración</Typography>} />
                </MenuItem>
                <Divider sx={{ my: 0.5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />
                <MenuItem onClick={handleLogout} sx={{ '&:hover': { background: 'rgba(239, 68, 68, 0.12) !important', color: '#F87171 !important' } }}>
                  <ListItemIcon sx={{ color: '#F87171', minWidth: 32 }}>
                    <LogoutRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>Cerrar Sesión</Typography>} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            /* Logged Out State Button */
            <Button
              variant="outlined"
              onClick={onLoginClick}
              startIcon={<LoginRounded fontSize="small" />}
              sx={{
                borderRadius: '12px',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                px: 2.5,
                py: 0.75,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  border: '1px solid #6366F1',
                  background: 'rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.15)',
                },
              }}
            >
              Iniciar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
