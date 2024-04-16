import { MenuItem } from './menu.model';

export const DOCTOR_MENU: MenuItem[] = [
  {
    id: 4000,
    label: 'MENUITEMS.TOP',
    icon: 'bx-home-circle',
    link: '/',
  },
  {
    id: 5000,
    label: 'MENUITEMS.DOCTOR.PATIENTS',
    icon: 'bx-user-circle',
    link: '/doctor/patients',
  },
  {
    id: 6000,
    label: 'MENUITEMS.DOCTOR.QUESTIONNAIRES',
    icon: 'bx-file',
    link: '/doctor/questionnaires',
  }
];

