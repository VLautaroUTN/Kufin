
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import {
  DashboardRounded,
  SwapHorizRounded,
  TimelineRounded,
  SecurityRounded,
} from '@mui/icons-material';

interface SidebarProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const DRAWER_WIDTH = 260;

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { text: 'Resumen', icon: <DashboardRounded />, desc: 'Indicadores y gráficos' },
    { text: 'Movimientos', icon: <SwapHorizRounded />, desc: 'Historial de transacciones' },
    { text: 'Reportes', icon: <TimelineRounded />, desc: 'Analíticas avanzadas' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: 'rgba(11, 15, 25, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          borderTop: 'none',
          pt: '90px', // Space below Navbar
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ px: 2 }}>
        <Typography
          variant="caption"
          sx={{
            px: 2,
            mb: 2,
            display: 'block',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.35)',
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          Menú de Control
        </Typography>
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {menuItems.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => setActiveTab(index)}
                  sx={{
                    borderRadius: '12px',
                    py: 1.5,
                    px: 2,
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.02) 100%)'
                      : 'transparent',
                    borderLeft: `3px solid ${isActive ? '#6366F1' : 'transparent'}`,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      color: '#FFFFFF',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderLeft: `3px solid ${isActive ? '#6366F1' : 'rgba(255, 255, 255, 0.2)'}`,
                    },
                  }}
                >
                  {/* Glowing light spot on active */}
                  {isActive && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '8px',
                        background: '#6366F1',
                        filter: 'blur(4px)',
                        opacity: 0.8,
                      }}
                    />
                  )}
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#6366F1' : 'rgba(255, 255, 255, 0.45)',
                      minWidth: 40,
                      transition: 'color 0.25s ease',
                      '& svg': { fontSize: 22 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: isActive ? 700 : 500, letterSpacing: '-0.1px' }}>
                        {item.text}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: isActive ? 'rgba(99, 102, 241, 0.65)' : 'rgba(255, 255, 255, 0.3)',
                          display: { xs: 'none', md: 'block' },
                          mt: 0.1,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Sidebar Footer */}
      <Box sx={{ p: 2, m: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
          <SecurityRounded sx={{ fontSize: 14, color: '#10B981' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            Protección Activa
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', fontSize: '0.65rem' }}>
          Conexión encriptada SSL
        </Typography>
      </Box>
    </Drawer>
  );
}
