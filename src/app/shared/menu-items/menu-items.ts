import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  expanded?:boolean;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS_superadmin = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'superadmin',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
	  },
	  {
        main_state: 'superadmin',
        state: 'componies',
        name: 'Companies',
        type: 'link',
        icon: 'store',
	  },
	  {
        main_state: 'superadmin',
        state: 'users',
        name: 'Users',
        type: 'link',
        icon: 'people_alt',
	  },
    ],
  },

];

const MENUITEMS_siteadmin = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'siteadmin',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
    },
    {
      state: 'hr',
      name: 'Human Recource',
      type: 'sub',
      icon: 'supervisor_account',
      children: [
        {
          state: 'employee',
          name: 'Employee',
        },
        {
          state: 'designation',
          name: 'Designation',
        },
        {
          state: 'shift_management',
          name: 'Shift Management'
        },
    {
          state: 'attendance',
          name: 'Employee Attendance'
        },
      {
          state: 'leaves',
          name: 'Employee Leaves'
        },
      {
          state: 'loan_payment',
          name: 'Loan Requests'
        },
      {
          state: 'loan_reciepts',
          name: 'Loan Reciept'
        },
      {
          state: 'salary_management',
          name: 'Salary Management'
        },
      {
          state: 'salary_process',
          name: 'Salary Process'
        },
        /* {
          state: 'attendance_report',
          name: 'Employee Attendance Report'
        }, */
      ]
    },
    {
      state: 'campaign',
      name: 'Advertisements',
      type: 'sub',
      icon: 'campaign',
      children: [
        {
          state: 'news_letters',
          name: 'Advertisements',
        },
        {
          state: 'enquiries',
          name: 'Website Enquiries',
        },
        {
          state: 'news_letters_feedback',
          name: 'Feedback'
        },
        {
          state: 'qr_codes',
          name: 'QR Code Generator'
        },
      ]
    },
	  /* {
        main_state: 'siteadmin',
        state: 'goods_reciept',
        name: 'Orders Distribution',
        type: 'link',
        icon: 'local_shipping',
	  },
	  {
        main_state: 'siteadmin',
        state: 'customer_feedbacks',
        name: 'Customers Feedback',
        type: 'link',
        icon: 'feedback',
	  }, */
    ],
  },

];



const MENUITEMS_hr = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'hr',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
	  },
	  {
        main_state: 'hr',
        state: 'employee',
        name: 'Employees',
        type: 'link',
        icon: 'people_alt',
	  },
	  {
        main_state: 'hr',
        state: 'designation',
        name: 'Designation',
        type: 'link',
        icon: 'workspace_premium',
	  },
	  {
        main_state: 'hr',
        state: 'attendance',
        name: 'Employee Attendance',
        type: 'link',
        icon: 'alarm',
	  },
	  {
        main_state: 'hr',
        state: 'shift_management',
        name: 'Shift Management',
        type: 'link',
        icon: 'watch_later',
	  },
	  {
        main_state: 'hr',
        state: 'leaves',
        name: 'Employee Leaves',
        type: 'link',
        icon: 'beach_access',
	  },
	  {
        main_state: 'hr',
        state: 'loan_payment',
        name: 'Loan Requests',
        type: 'link',
        icon: 'account_balance',
	  },
	  {
        main_state: 'hr',
        state: 'loan_reciepts',
        name: 'Loan Reciept',
        type: 'link',
        icon: 'account_balance',
	  },
	  {
        main_state: 'hr',
        state: 'salary_management',
        name: 'Salary Management',
        type: 'link',
        icon: 'account_balance_wallet',
	  },
	  {
        main_state: 'hr',
        state: 'salary_process',
        name: 'Salary Process',
        type: 'link',
        icon: 'account_balance_wallet',
	  },
	 /*  {
        main_state: 'hr',
        state: 'attendance_report',
        name: 'Employee Attendance Report',
        type: 'link',
        icon: 'description',
	  }, */
    ],
  },

];



const MENUITEMS_manager = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'manager',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
	  },
	  {
        main_state: 'manager',
        state: 'employee',
        name: 'Employees',
        type: 'link',
        icon: 'people_alt',
	  },
	  
	  {
        main_state: 'manager',
        state: 'attendance',
        name: 'Employee Attendance',
        type: 'link',
        icon: 'alarm',
	  },
	  {
        main_state: 'manager',
        state: 'shift_management',
        name: 'Shift Management',
        type: 'link',
        icon: 'watch_later',
	  },
	  {
        main_state: 'manager',
        state: 'leaves',
        name: 'Employee Leaves',
        type: 'link',
        icon: 'beach_access',
	  },
	  {
        main_state: 'manager',
        state: 'loan_payment',
        name: 'Loan Requests',
        type: 'link',
        icon: 'account_balance',
	  },
	  {
        main_state: 'manager',
        state: 'loan_reciepts',
        name: 'Loan Reciept',
        type: 'link',
        icon: 'account_balance',
	  },
	  
	 
	 /*  {
        main_state: 'hr',
        state: 'attendance_report',
        name: 'Employee Attendance Report',
        type: 'link',
        icon: 'description',
	  }, */
    ],
  },

];

const MENUITEMS_staff = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'staff',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
	  },
	  {
        main_state: 'staff',
        state: 'attendance',
        name: 'My Attendance',
        type: 'link',
        icon: 'alarm',
	  },
	  {
        main_state: 'staff',
        state: 'leaves',
        name: 'My Leaves',
        type: 'link',
        icon: 'beach_access',
	  },
	  {
        main_state: 'staff',
        state: 'loan_payment',
        name: 'Loan Requests',
        type: 'link',
        icon: 'account_balance',
	  },
	  {
        main_state: 'staff',
        state: 'loan_reciepts',
        name: 'Loan Reciept',
        type: 'link',
        icon: 'account_balance',
	  },
	  
	 
	 /*  {
        main_state: 'hr',
        state: 'attendance_report',
        name: 'Employee Attendance Report',
        type: 'link',
        icon: 'description',
	  }, */
    ],
  },

];



const MENUITEMS_campaigns = [
  {
    label: 'Navigation',
    main: [
      {
        main_state: 'campaigns',
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
	  },
      {
        main_state: 'campaigns',
        state: 'enquiries',
        name: 'Website Enquiries',
        type: 'link',
        icon: 'info',
	  },
      {
        main_state: 'campaigns',
        state: 'news_letters',
        name: 'Advertisements',
        type: 'link',
        icon: 'featured_video',
	  },
      {
        main_state: 'campaigns',
        state: 'news_letters_feedback',
        name: 'Feedback',
        type: 'link',
        icon: 'feedback',
	  },
    ],
  },

];

/*
const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'superadmin',
        short_label: 'SA',
        name: 'Super Admin',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'dashboard',
            name: 'Dashboard'
          },
          {
            state: 'products',
            name: 'Products'
          },
		  {
            state: 'users',
            name: 'Users'
          },
		  {
            state: 'localtions',
            name: 'Locations'
          },
        ]
      },
      {
        state: 'hr',
        short_label: 'HR',
        name: 'HR',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'employees',
            name: 'Employees'
          },
          {
            state: 'attendance',
            name: 'Employee Attendance'
          },
		  {
            state: 'empoyee_expences',
            name: 'Employee Expences'
          },
		  {
            state: 'working_shifts',
            name: 'Working Shifts',
            
          },
        ]
      },
      {
        state: 'siteadmin',
        short_label: 'ST',
        name: 'Siteadmin',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'dashboard',
            name: 'Dashboard'
          },
          {
            state: 'roles',
            name: 'Roles'
          },
        ]
      },
    ],
  },

];*/

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return [];
  }

  getMenusAgainstUserRol(userRole): Menu[] {
    return eval('MENUITEMS_'+userRole);
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
