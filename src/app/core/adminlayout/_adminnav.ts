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
  {
    name: 'Completed Tasks',
    url: '/administrator/target',
    iconComponent: { name: 'cil-task' },
    children: [
      {
        name: 'Potential Doctors',
        url: 'target/visited'
      }, {
        name: 'First Visit Doctors',
        url: 'target/first'
      }
    ]
  },
  {
    name: 'Follow Up',
    url: '/administrator/followup',
    iconComponent: { name: 'cilAppsSettings' }, 
    children: [
      {
        name: 'Followup Doctors',
        url: 'followup/list'
      }, {
        name: 'Followup Configurations',
        url: 'followup/configure'
      }
    ]
  },
  {
    name: 'Administration',
    url:'/administrator/administration',
    iconComponent: { name: 'cilChart' }, 
    children:[
      {
        name: 'FirstTime Configuration',
        url: 'administration/configure'
      },
      {
        name: 'Clinic List',
        url: 'administration/list/clinic'
      },
      {
        name: 'User List',
        url: 'administration/list/user'
      }

    ]
  }
];
