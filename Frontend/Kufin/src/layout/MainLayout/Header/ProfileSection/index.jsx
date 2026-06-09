import { useEffect, useRef, useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useConfig from 'hooks/useConfig';

// assets
import User1 from 'assets/images/users/user-round.svg';
import { IconLogout } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

export default function ProfileSection() {
  const theme = useTheme();
  const {
    state: { borderRadius }
  } = useConfig();

  const [open, setOpen] = useState(false);

  // Estado del usuario logueado
  const [usuario, setUsuario] = useState(() => {
    const id = localStorage.getItem('kufin_usuario_id');
    const email = localStorage.getItem('kufin_usuario_email');
    const nombre = localStorage.getItem('kufin_usuario_nombre');
    const foto = localStorage.getItem('kufin_usuario_foto');
    if (id) return { id, email, nombre, foto };
    return null;
  });

  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('kufin_usuario_id');
    localStorage.removeItem('kufin_usuario_email');
    localStorage.removeItem('kufin_usuario_nombre');
    localStorage.removeItem('kufin_usuario_foto');
    setUsuario(null);
    setOpen(false);
  };

  const handleLoginExitoso = async (respuestaGoogle) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/google', {
        token: respuestaGoogle.credential
      });

      const { usuarioId, email, nombre, foto } = response.data;

      localStorage.setItem('kufin_usuario_id', usuarioId);
      localStorage.setItem('kufin_usuario_email', email);
      localStorage.setItem('kufin_usuario_nombre', nombre || '');
      localStorage.setItem('kufin_usuario_foto', foto || '');

      setUsuario({ id: usuarioId, email, nombre, foto });
      setOpen(false);
    } catch (error) {
      console.error('Error al autenticar con el servidor:', error);
      alert('Error al iniciar sesión con el servidor');
    }
  };

  const handleLoginError = () => {
    console.error('Hubo un error al intentar iniciar sesión con Google.');
    alert('Hubo un error al intentar iniciar sesión con Google.');
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const avatarSrc = usuario?.foto || User1;

  return (
    <>
      <Chip
        slotProps={{ label: { sx: { lineHeight: 0 } } }}
        sx={{ ml: 2, height: '48px', alignItems: 'center', borderRadius: '27px' }}
        icon={
          <Avatar
            src={avatarSrc}
            alt="user-images"
            sx={{ typography: 'mediumAvatar', margin: '8px 0 8px 8px !important', cursor: 'pointer' }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
            imgProps={{ referrerPolicy: 'no-referrer' }}
          />
        }
        label={
          usuario ? (
            <Typography variant="subtitle2" sx={{ fontWeight: 600, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {usuario.nombre || usuario.email}
            </Typography>
          ) : (
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Iniciar sesión
            </Typography>
          )
        }
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
        aria-label="user-account"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 2, minWidth: 220 }}>
                      {usuario ? (
                        <>
                          {/* Info del usuario */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Avatar
                              src={usuario.foto || User1}
                              alt={usuario.nombre}
                              sx={{ width: 40, height: 40 }}
                              imgProps={{ referrerPolicy: 'no-referrer' }}
                            />
                            <Box>
                              {usuario.nombre && (
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                  {usuario.nombre}
                                </Typography>
                              )}
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                {usuario.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider sx={{ mb: 1 }} />
                          {/* Botón de logout */}
                          <List component="nav" sx={{ width: '100%', borderRadius: `${borderRadius}px`, p: 0 }}>
                            <ListItemButton sx={{ borderRadius: `${borderRadius}px` }} onClick={handleLogout}>
                              <ListItemIcon>
                                <IconLogout stroke={1.5} size="20px" />
                              </ListItemIcon>
                              <ListItemText primary={<Typography variant="body2">Cerrar sesión</Typography>} />
                            </ListItemButton>
                          </List>
                        </>
                      ) : (
                        <>
                          {/* Botón de Google Login */}
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, textAlign: 'center' }}>
                            Iniciar sesión
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <GoogleLogin
                              onSuccess={handleLoginExitoso}
                              onError={handleLoginError}
                            />
                          </Box>
                        </>
                      )}
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
