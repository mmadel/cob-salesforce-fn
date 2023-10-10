import { INavData } from '@coreui/angular-pro';

export const adminNavItems: INavData[] = [
  {
    name: 'Potential',
    url: '/administrator/potential',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Potential Doctors',
        url: 'potential/list'
      }
    ]
  },
];
