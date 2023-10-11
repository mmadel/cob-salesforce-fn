import { INavData } from '@coreui/angular-pro';

export const adminNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/administrator/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Potential',
    url: '/administrator/potential',
    iconComponent: { name: 'cil-lineWeight' },
    children: [
      {
        name: 'Potential Doctors',
        url: 'potential/list'
      }
    ]
  },
];
