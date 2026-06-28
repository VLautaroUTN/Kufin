// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import logo from 'assets/images/logo.png';


// ==============================|| LOGO SVG ||============================== //

export default function Logo() {
  return (
    <img src={logo} alt="Kufin" width="100" />
  );
}
