// src/menu-items/finanzas.js
import { IconReceipt2 } from '@tabler/icons-react';

const icons = { IconReceipt2 };

const finanzas = {
  id: 'finanzas',
  title: 'Gestión Financiera',
  type: 'group',
  children: [
    {
      id: 'gastos',
      title: 'Mis Gastos',
      type: 'item',
      url: '/gastos',
      icon: icons.IconReceipt2,
      breadcrumbs: false
    }
  ]
};

export default finanzas;