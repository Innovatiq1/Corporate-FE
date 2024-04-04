import { MenuItem, RouteInfo } from './sidebar.metadata';
export const ROUTES: any[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    children: [],
  },

  // Admin Modules

  {
    path: '',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/dashboard/main',
        title: 'Student Analytics',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/dashboard/dashboard2',
        title: 'Instructor Analytics',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      // {
      //   path: '/admin/dashboard/teacher-dashboard',
      //   title: 'MENUITEMS.DASHBOARD.LIST.TEACHER-DASHBOARD',
      //   iconType: 'material-icons-two-tone',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      // {
      //   path: '/admin/dashboard/student-dashboard',
      //   title: 'MENUITEMS.DASHBOARD.LIST.STUDENT-DASHBOARD',
      //   iconType: 'material-icons-two-tone',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
    ],
  },

  {
    path: '',
    title: 'Course',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/courses/all-courses',
        title: 'MENUITEMS.COURSE.LIST.ALL-COURSES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/courses/add-course',
        title: 'MENUITEMS.COURSE.LIST.CREATE-COURSE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/courses/course-approval',
        title: 'MENUITEMS.COURSE.LIST.COURSE-APPROVAL',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/courses/course-kit',
        title: 'MENUITEMS.COURSE.LIST.COURSE-KIT',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/courses/categories',
        title: 'MENUITEMS.COURSE.LIST.CATEGORIES',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'Schedule Class',
    iconType: 'material-icons-two-tone',
    icon: 'class',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/schedule/class-list',
        title: 'MENUITEMS.SCHEDULECLASS.LIST.ALL-CLASS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/schedule/create-class',
        title: 'MENUITEMS.SCHEDULECLASS.LIST.CREATE-CLASS',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/schedule/approve-list',
        title: 'MENUITEMS.SCHEDULECLASS.LIST.APPROVE-LIST',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/schedule/completion-list',
        title: 'MENUITEMS.SCHEDULECLASS.LIST.COMPLETION-LIST',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.PROGRAM.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'bookmark',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/program/program-list',
        title: 'MENUITEMS.PROGRAM.LIST.ALL-PROGRAM',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/program/schedule-class',
        title: 'MENUITEMS.PROGRAM.LIST.SCHEDULE-CLASS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      // {
      //   path: '/admin/program/create-course',
      //   title: 'MENUITEMS.PROGRAM.LIST.CREATE-COURSE',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      {
        path: '/admin/program/program-approve-list',
        title: 'MENUITEMS.PROGRAM.LIST.APPROVE-LIST',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/program/program-kit',
        title: 'MENUITEMS.PROGRAM.LIST.PROGRAM-KIT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
          path: '/admin/program/student-approve-list',
          title: 'MENUITEMS.PROGRAM.LIST.STUDENT-APPROVAL',
          iconType: '',
          icon: '',
          class: 'ml-menu',
          groupTitle: false,
          badge: '',
          badgeClass: '',
          role: [''],
          children: [],
        },
        {
          path: '/admin/program/program-completion-list',
          title: 'MENUITEMS.PROGRAM.LIST.COMPLETION-LIST',
          iconType: '',
          icon: '',
          class: 'ml-menu',
          groupTitle: false,
          badge: '',
          badgeClass: '',
          role: [''],
          children: [],
        },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.SURVEY.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/survey/survey-list',
        title: 'MENUITEMS.SURVEY.LIST.ALL-SURVEY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/survey/likert-chart',
        title: 'MENUITEMS.SURVEY.LIST.LIKERT-CHART',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'Audit',
    iconType: 'material-icons-two-tone',
    icon: 'attach_money',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/audit/audit-list',
        title: 'List',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/audit/e-attendance',
        title: 'E - Attendance',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'Users',
    iconType: 'material-icons-two-tone',
    icon: 'people',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/users/user-type',
        title: 'User Type',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/users/all-users',
        title: 'All User',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'Certificate Builder',
    iconType: 'material-icons-two-tone',
    icon: 'photo_album',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/certificate/certificates',
        title: 'Certificates',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/certificate/design',
        title: 'Design',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'Email Configuration',
    iconType: 'material-icons-two-tone',
    icon: 'email',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/email-configuration/forgot-password',
        title: 'Forgot Password',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/welcome-mail',
        title: 'Welcome E-mail',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/instructor-request',
        title: 'Instructor Request',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/invite-user-reject',
        title: 'Invite User Reject',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/new-student-referred',
        title: 'New Student Referred',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/course-referral-invite',
        title: 'Course Referral Invite',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/completed-course',
        title: 'Completed Course',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/instructor-course-invite',
        title: 'Instructor Course Invite',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/instructor-accept-course-invite',
        title: 'Instructor Accept Course Invite Status',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/send-course-invoice',
        title: 'Send Course Invoice',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/email-configuration/admin-new-email',
        title: 'Admin New Email',
        iconType: 'material-icons-two-tone',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.BANNER.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'art_track',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/banners/instructor-banner-list',
        title: 'MENUITEMS.BANNER.LIST.INSTRUCTOR',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/banners/create-instructor-banner',
        title: 'MENUITEMS.BANNER.LIST.INSTRUCTOR-BANNER',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/banners/student-banner-list',
        title: 'MENUITEMS.BANNER.LIST.STUDENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },

      {
        path: '/admin/banners/create-student-banner',
        title: 'MENUITEMS.BANNER.LIST.STUDENT-BANNER',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },

  {
    path: '',
    title: 'Announcement',
    iconType: 'material-icons-two-tone',
    icon: 'announcement',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/announcement/list',
        title: 'List',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  // {
  //   path: '',
  //   title: 'Testimonials',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'find_in_page',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admim'],
  //   children: [
  //     {
  //       path: '',
  //       title: 'Instructors',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },
  //     {
  //       path: '',
  //       title: 'Students',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },

  //   ],
  // },
  {
    path: '',
    title: 'Instructors',
    iconType: 'material-icons-two-tone',
    icon: 'person',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/teachers/all-teachers',
        title: 'All Instructors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/teachers/add-teacher',
        title: 'Add Instructor',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      // {
      //   path: '/admin/teachers/edit-teacher',
      //   title: 'Edit Instructor',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      // {
      //   path: '/admin/teachers/about-teacher',
      //   title: 'About Instructor',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      // {
      //   path: '/admin/teachers/video-resource',
      //   title: 'Video Resources',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      {
        path: '/admin/teachers/article',
        title: 'Articles',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/teachers/agreement-t-c',
        title: 'Agreement T & C',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.STUDENTS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/students/all-students',
        title: 'MENUITEMS.STUDENTS.LIST.ALL-STUDENTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/students/add-student',
        title: 'MENUITEMS.STUDENTS.LIST.ADD-STUDENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      // {
      //   path: '/admin/students/edit-student',
      //   title: 'MENUITEMS.STUDENTS.LIST.EDIT-STUDENT',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      // {
      //   path: '/admin/students/about-student',
      //   title: 'MENUITEMS.STUDENTS.LIST.ABOUT-STUDENT',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   role: [''],
      //   children: [],
      // },
      {
        path: '/admin/students/student-attendance',
        title: 'MENUITEMS.STUDENTS.LIST.STUDENT-ATTENDANCE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  // {
  //   path: '',
  //   title: 'MENUITEMS.COURSES.TEXT',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'school',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ['Admin'],
  //   children: [
  //     {
  //       path: '/admin/courses/all-courses',
  //       title: 'MENUITEMS.COURSES.LIST.ALL-COURSES',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },
  //     {
  //       path: '/admin/courses/add-course',
  //       title: 'MENUITEMS.COURSES.LIST.ADD-COURSE',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },
  //     {
  //       path: '/admin/courses/edit-course',
  //       title: 'MENUITEMS.COURSES.LIST.EDIT-COURSE',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },
  //     {
  //       path: '/admin/courses/about-course',
  //       title: 'MENUITEMS.COURSES.LIST.ABOUT-COURSE',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       role: [''],
  //       children: [],
  //     },
  //   ],
  // },
  {
    path: '',
    title: 'MENUITEMS.LIBRARY.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'local_library',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/library/all-assets',
        title: 'MENUITEMS.LIBRARY.LIST.ALL-LIBRARY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/library/add-asset',
        title: 'MENUITEMS.LIBRARY.LIST.ADD-LIBRARY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/library/edit-asset',
        title: 'MENUITEMS.LIBRARY.LIST.EDIT-LIBRARY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.DEPARTMENTS.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'business',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/departments/all-departments',
        title: 'MENUITEMS.DEPARTMENTS.LIST.ALL-DEPARTMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/departments/add-department',
        title: 'MENUITEMS.DEPARTMENTS.LIST.ADD-DEPARTMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/departments/edit-department',
        title: 'MENUITEMS.DEPARTMENTS.LIST.EDIT-DEPARTMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.STAFF.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'face',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/staff/all-staff',
        title: 'MENUITEMS.STAFF.LIST.ALL-STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/staff/add-staff',
        title: 'MENUITEMS.STAFF.LIST.ADD-STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/staff/edit-staff',
        title: 'MENUITEMS.STAFF.LIST.EDIT-STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/staff/about-staff',
        title: 'MENUITEMS.STAFF.LIST.ABOUT-STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.HOLIDAY.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'airline_seat_individual_suite',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/holidays/all-holidays',
        title: 'MENUITEMS.HOLIDAY.LIST.ALL-HOLIDAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/holidays/add-holiday',
        title: 'MENUITEMS.HOLIDAY.LIST.ADD-HOLIDAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/holidays/edit-holiday',
        title: 'MENUITEMS.HOLIDAY.LIST.EDIT-HOLIDAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.FEES.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'monetization_on',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/fees/all-fees',
        title: 'MENUITEMS.FEES.LIST.ALL-FEES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/fees/add-fees',
        title: 'MENUITEMS.FEES.LIST.ADD-FEES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/fees/edit-fees',
        title: 'MENUITEMS.FEES.LIST.EDIT-FEES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
      {
        path: '/admin/fees/fee-receipt',
        title: 'MENUITEMS.FEES.LIST.FEE-RECEIPT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        children: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.ATTENDANCE.TEXT',
    iconType: 'material-icons-two-tone',
    icon: 'history_edu',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    children: [
      {
        path: '/admin/attendance/staff',
        title: 'MENUITEMS.ATTENDANCE.LIST.STAFF',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        children: [],
      },
      {
        path: '/admin/attendance/details',
        title: 'MENUITEMS.ATTENDANCE.LIST.DETAILS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        children: [],
      },
      {
        path: '/admin/attendance/attendance-sheet',
        title: 'MENUITEMS.ATTENDANCE.LIST.SHEET',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        children: [],
      },
    ],
  },

  // Teacher Modules

  {
    path: '/instructor/dashboard',
    title: 'MENUITEMS.TEACHER.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Instructor'],
    children: [],
  },
  {
    path: '/instructor/lectures',
    title: 'MENUITEMS.TEACHER.LIST.LECTURES',
    iconType: 'material-icons-two-tone',
    icon: 'menu_book',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Instructor'],
    children: [],
  },
  {
    path: '/instructor/leave-request',
    title: 'MENUITEMS.TEACHER.LIST.LEAVE-REQUEST',
    iconType: 'material-icons-two-tone',
    icon: 'offline_pin',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Instructor'],
    children: [],
  },
  {
    path: '/instructor/exam-schedule',
    title: 'MENUITEMS.TEACHER.LIST.EXAM-SCHEDULE',
    iconType: 'material-icons-two-tone',
    icon: 'history_edu',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Instructor'],
    children: [],
  },
  {
    path: '/instructor/settings',
    title: 'MENUITEMS.TEACHER.LIST.SETTINGS',
    iconType: 'material-icons-two-tone',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Instructor'],
    children: [],
  },

  // Student Modules

  //
  {
    path: '/trainingadministrator/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Training Administrators'],
    children: [],
  },
  {
    path: '/supervisor/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Supervisors'],
    children: [],
  },
  {
    path: '/hod/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Head of Department'],
    children: [],
  },
  {
    path: '/trainingcoordinator/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Training Coordinators'],
    children: [],
  },
  {
    path: '/coursemanager/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Course Managers'],
    children: [],
  },

  {
    path: '/approver/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Approver'],
    children: [],
  },

  {
    path: '/trainingcoordinatordministrator/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Training Coordinator Administrator'],
    children: [],
  },


  {
    path: '/student/dashboard',
    title: 'MENUITEMS.STUDENT.LIST.DASHBOARD',
    iconType: 'material-icons-two-tone',
    icon: 'space_dashboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  {
    path: '/student/course',
    title: 'Courses',
    iconType: 'material-icons-two-tone',
    icon: 'article',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  {
    path: '/student/program',
    title: 'Programs',
    iconType: 'material-icons-two-tone',
    icon: 'article',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },

  {
    path: '/student/homework',
    title: 'Assignments',
    iconType: 'material-icons-two-tone',
    icon: 'article',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  {
    path: '/student/leave-request',
    title: 'MENUITEMS.STUDENT.LIST.LEAVE-REQUEST',
    iconType: 'material-icons-two-tone',
    icon: 'offline_pin',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  {
    path: '/student/timetable',
    title: 'Calender',
    iconType: 'material-icons-two-tone',
    icon: 'table_chart',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  {
    path: '/student/settings',
    title: 'MENUITEMS.STUDENT.LIST.SETTINGS',
    iconType: 'material-icons-two-tone',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Student'],
    children: [],
  },
  // Common Module

  {
    path: '',
    title: 'MENUITEMS.APPS.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    children: [],
  }


];

export const SettingsMenu: MenuItem[] = [
  {
    path:'student/settings/users',
    title:'Manage Users',
    id:'users',
    iconType:'img',
    icon:'assets/images/settings/role.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children: [
      {
        iconsrc:'',
        path: 'student/settings/all-users',
        title: 'All Users',
        iconType: '',
        icon: '',
        id:'all-users',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        open:false,

        children: [],
      },
      {
        iconsrc:'',
        path: 'student/settings/all-students',
        title: 'Students',
        iconType: '',
        icon: '',
        id:'all-students',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        open:false,

        children: [],
      },
      {
        iconsrc:'',
        path: 'student/settings/all-instructors',
        title: 'Instructors',
        iconType: '',
        icon: '',
        id:'all-instructors',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        open:false,

        children: [],
      },
      {
        iconsrc:'',
        path: 'student/settings/all-staff',
        title: 'Staff',
        iconType: '',
        icon: '',
        id:'all-staff',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        open:false,

        children: [],
      },





    ],

    
  },
  {
    path:'student/settings/integration',
    title:'Integration',
    id:'integration',
    iconType:'img',
    icon:'assets/images/settings/integrate.jpg',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  },
  {
    path:'student/settings/security-settings',
    title:'Security',
    id:'security-settings',
    iconType:'img',
    icon:'assets/images/settings/security1.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  },
  {
    path:'student/settings/customization',
    title:'Customization',
    id:'customization',
    iconType:'img',
    icon:'assets/images/settings/custom.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  },
  {
    path:'student/settings/automation',
    title:'Automation',
    id:'automation',
    iconType:'img',
    icon:'assets/images/settings/automate1.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  },
  {
    path:'student/settings/LMS-TAE',
    title:'LMS-TAE',
    id:'LMS-TAE',
    iconType:'img',
    icon:'assets/images/settings/lms.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  },
  {
    path:'student/settings/configuration',
    title:'Configuration',
    id:'configuration',
    iconType:'img',
    icon:'assets/images/settings/system-configuration1.png',
    class:'',
    badge:'',
    iconsrc:'',
    badgeClass:'',
    groupTitle:false,
    open:false,
    role:[],
    children:[]
  }
]
