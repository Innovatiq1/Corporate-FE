/* eslint-disable @typescript-eslint/no-explicit-any */

export let MENU_ITEMS: any[] = [];
export let MENU_LIST: any[] = [];
MENU_LIST = [
    {
        id: "dashboard",
        title: "Dashboard",
        selected: false,
        iconsrc: "/assets/announcement-icon.svg",
        icon: 'space_dashboard',
        children:
        [
            {
                id: "student-analytics",
                title: "Student Analytics",
                type: "none",
            },
            {
                id: "instructor-analytics",
                title: "Instructor Analytics",
                type: "none",
            },
            {
                id: "student-dashboard",
                title: "Student Dashboard",
                type: "none",
            },
            {
                id: "instructor-dashboard",
                title: "Instructor Dashboard",
                type: "none",
            },
            {
                id: "coursemanager-dashboard",
                title: "Coursemanager Dashboard",
                type: "none",
            },
            {
                id: "programmanager-dashboard",
                title: "Programmanager Dashboard",
                type: "none",
            },

            {
                id: "supervisor-dashboard",
                title: "Supervisor Dashboard",
                type: "none",
            },
            {
                id: "hod-dashboard",
                title: "Head Of Department Dashboard",
                type: "none",
            },
            {
                id: "trainingcoordinator-dashboard",
                title: "Training Coordinator Dashboard",
                type: "none",
            },
            {
                id: "trainingadministrator-dashboard",
                title: "Training Administrator Dashboard",
                type: "none",
            }
              ]
    },

//Etms
  {
        id: "admin/e-tms",
        title: "E-TMS",
        iconsrc: "/assets/course-icon.svg",
        icon: 'school',
        selected: true,
        children: [
            {
                id: "etms-dashboard",
                title: "E-TMS Dashboard",
                type: "none",
    
            },
            {
                id: "employee-status",
                title: "Employee Status",
                type: "none",
    
            },
            {
                id: "new-course-request",
                title: "New Course Request",
                type: "none",
    
            },
            {
                id: "course-request",
                title: "Course Request",
                type: "none"
            },
            {
                id: "all-requests",
                title: "All Requests",
                type:"none"
            },
            {
                id: "new-course-approval",
                title: "New Course Approval",
                type: "none"
            },
            {
                id: "overall-budget-list",
                title: "Overall Budget List ",
                type: "none"
            },
            {
                id: "department-budget-allocation",
                title: "Department Budget Allocation ",
                type: "none"
            },
            {
                id: "department-training-plan",
                title: "Department Training Plan ",
                type: "none"
            },
            {
                id: "budget-request",
                title: "Budget Request",
                type: "none"
            },
            {
                id: "dapartment-budget-request",
                title: "Department Budget Request",
                type: "none"
            },
            
        
        ]
    },
    {
        id:"admin/program",
        title: "Program",
        iconsrc:"/assets/fellowship-icon.svg",
        icon: 'bookmark',
        selected: false,
        children: [
            {
                id:"program-list",
                title:"All Program",
                type:""
            },
            {
                id:"schedule-class",
                title:"Schedule Class",
                type:""
            },
            {
                id:"program-approve-list",
                title:"Program Approve List",
                type:""
            },
            {
                id:"program-kit",
                title:"Program Kit",
                type:""
            },
            {
                id:"student-approve-list",
                title:"Student Approval List",
                type:""
            },
            {
                id:"program-completion-list",
                title:"Completion List",
                type:""
            }
        ]
    },



{
    id: "admin/courses",
    title: "Course",
    iconsrc: "/assets/course-icon.svg",
    icon: 'school',
    selected: true,
    children: [
        {
            id: "all-courses",
            title: "Course List",
            type: "none",

        },
        {
            id: "add-course",
            title: "Create Course",
            type: "none"
        },
        {
            id: "course-approval",
            title: "Course Approval",
            type:"none"
        },
        {
            id: "course-kit",
            title: "Course Kit",
            type: "none"
        },
        {
            id: "categories",
            title: "Categories",
            type: "none"
        },
        {
            id: "class-list",
            title:"Schedule Class",
            type: "selected",

        },
        {
            id: "approve-list",
            title:"Student Approve List",
            type: "none"
        },
        {
            id: "completion-list",
            title:"Completion List",
            type:"none"
        }


    ]
},
{
    id: "admin/users",
    title: "Users",
    selected: false,
    iconsrc: "/assets/users-icon.svg",
    icon: 'people',
    children:
    [
        // {
        //     id: "user-type",
        //     title: "User Type",
        //     type: "none",
        // },
        {
            id: "all-users",
            title: "All Users",
            type: "none",
        },
        {
            id: "all-instructors",
            title: "Instructors",
            type: "none",
        },
        {
            id: "all-students",
            title: "Students",
            type: "none",
        },
        {
            id: "all-staff",
            title: "Staff",
            type: "none",
        },



    ]
},
{
    id: "student/enrollment",
    title: "Enrollment",
    iconsrc: "/assets/course-icon.svg",
    icon:'school',
    selected: true,
    children: [
        {
            id: "programs",
            title: "Programs",
            type: "none"
        },
        {
            id: "courses",
            title: "Courses",
            type: "none"
        },

    ]
},

{
    id: "timetable",
    title: "Timetable",
    selected: false,
    iconsrc: "/assets/course-icon.svg",
    icon: 'fact_check',
    children:
    [
        {
            id: "program-timetable",
            title: "Program Timetable",
            type: "none"
        },
        {
            id: "course-timetable",
            title: "Course Timetable",
            type: "none"
        },
        {
            id: "program-exam",
            title: "Program Exam Schedule",
            type: "none",
        },
        {
            id: "course-exam",
            title: " Course Exam Schedule",
            type: "none",
        }
       ]
},
// {
//     id: "admin/exam",
//     title: "Exams",
//     selected: false,
//     iconsrc: "/assets/users-icon.svg",
//     icon: 'people',
//     children:
//     [

//     ]
// },
{
    id: "admin/payment",
    title: "Transactions",
    selected: false,
    iconsrc: "/assets/payment-icon.svg",
    icon: 'payment',
    children:
    [
        {
            id: "program-payments",
            title: "Program Payments",
            type: "none"
        },
        {
            id: "course-payments",
            title: "Course Payments",
            type: "none"
        },


    ]
},

{
    id: "admin/survey",
    title: "Survey",
    iconsrc:"/assets/survey-icon.svg",
    icon: 'school',
    selected: false,
    children:
    [
        {
            id: "survey-list",
            title: "Survey List",
            type:"none",
        },
        {
            id:"likert-chart",
            title:"Likert Chart",
            type:""
        }

    ]
},
{
    id: "admin/audit",
    title: "Logs",
    selected: false,
    iconsrc: "/assets/audit-icon.svg",
    icon: 'attach_money',
    children:
    [
        {
            id: "audit-list",
            title: "List",
            type:"none"
        },
        {
            id: "e-attendance",
            title: "E-Attendance",
            type:"none"
        }
    ]
},

// {
//     id: "admin/questions",
//     title: "Questions",
//     selected: false,
//     iconsrc: "/assets/users-icon.svg",
//     icon: 'people',
//     children:
//     [
//         {
//             id: "all-questions",
//             title: "All Questions",
//             type: "none",
//         },

//     ]
// },

// {
//     id: "admin/certificate",
//     title: "Certificate Builder",
//     selected: false,
//     iconsrc: "/assets/certificate-icon.svg",
//     icon: 'photo_album',
//     children:
//     [
//         // {
//         //     id: "certificates",
//         //     title: "Certificates",
//         //     type: "none",
//         // },
//         // {
//         //     id: "design",
//         //     title: "Design",
//         //     type: "none"
//         // },
//         {
//             id: "template",
//             title: "Certificate Template",
//             type: "none"
//         }
//     ]
// },
{
    id: "admin/email-configuration",
    title: "Email Configuration",
    selected: false,
    iconsrc:"/assets/email-icon.svg",
    icon: 'email',
    children:
    [
        {
            id: "forgot-password",
            title: "Forgot Password",
            type: "none"
        },
        {
            id: "welcome-mail",
            title: "Welcome E-mail",
            type: "none"
        },
        // {
        //     id: "instructor-request",
        //     title: "Instructor Request",
        //     type: "none"
        // },
        // {
        //     id: "invite-user-reject",
        //     title: "Invite User Reject",
        //     type: "none"
        // },
        // {
        //     id: "new-student-referred",
        //     title: "New Student Referred",
        //     type: "none"
        // },
        // {
        //     id: "course-referral-invite",
        //     title: "Course Referral Invite",
        //     type: "none"
        // },
        {
            id: "completed-course",
            title: "Completed Course",
            type: "none"
        },
        {
            id: "course-approval-email",
            title: "Course Approval",
            type: "none"
        },
        {
            id: "course-registered-email",
            title: "Course Registered Email",
            type: "none"
        },
        {
            id: "program-registration-email",
            title: "Program Registered Email",
            type: "none"
        },
        {
            id: "program-approval-email",
            title: "Program Approval",
            type: "none"
        },
        {
            id: "program-completion-email",
            title: "Completed Program",
            type: "none"
        },
        {
            id: "director-course-notification",
            title: "Director Course Notification",
            type: "none"
        },
        // {
        //     id: "admin-new-email",
        //     title: "Admin New Email",
        //     type: "none"
        // }
    ]
},
// {
//     id: "admin/banners",
//     title: "Banners",
//     selected: false,
//     iconsrc: "/assets/banner-icon.svg",
//     icon: 'art_track',
//     children:
//     [
//         {
//             id: "instructor-banner-list",
//             title: "Instructor Banners",
//             type: "none"
//         },
//         {
//             id: "create-instructor-banner",
//             title: "Add Instructor Banner",
//             type: "none"
//         },

//         {
//             id: "student-banner-list",
//             title: "Student Banners",
//             type: "none"
//         },
//         {
//             id: "create-student-banner",
//             title: "Add Student Banner",
//             type: "none"
//         }

//     ]
// },
// {
//     id: "admin/announcement",
//     title: "Announcement",
//     selected: false,
//     iconsrc: "/assets/announcement-icon.svg",
//     icon: 'announcement',
//     children:
//     [
//         {
//             id: "list",
//             title: "List",
//             type: "none",
//         }
//     ]
// },


{
    id: "student/exams",
    title: "Exams",
    iconsrc: "/assets/course-icon.svg",
    icon:'school',
    selected: true,
    children: [
        {
            id: "courses",
            title: "Courses",
            type: "none"
        },
        {
            id: "programs",
            title: "Programs",
            type: "none"
        }
    ]
},

// {
//     id: "student/timetable",
//     title: "Timetable",
//     iconsrc: "/assets/course-icon.svg",
//     icon:'fact_check',
//     selected: true,
//     children: [
//         // {
//         //     id: "homework",
//         //     title: "Homework",
//         //     selected: false,
//         //     iconsrc: "/assets/announcement-icon.svg",
//         // },
//         {
//             id: "course-timetable",
//             title: "Course",
//             selected: false,
//             iconsrc: "/assets/announcement-icon.svg",
//         },
//         {
//             id: "program-timetable",
//             title: "Program",
//             selected: false,
//             iconsrc: "/assets/announcement-icon.svg",
//         }

// ]
// },
{
    id: "student/feedback",
    title: "Feedback",
    iconsrc: "/assets/course-icon.svg",
    icon:'fact_check',
    selected: true,
    children: [
        {
            id: "courses",
            title: "Courses",
            selected: false,
            iconsrc: "/assets/announcement-icon.svg",
        },
        {
            id: "programs",
            title: "Programs",
            selected: false,
            iconsrc: "/assets/announcement-icon.svg",
        }
]
},
{
    id: "leave-request",
    title: "Leave Request",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon:'offline_pin',
    children:
    [
        {
            id: "instructor-leaves",
            title: "Instructor Leaves",
            type: "none"
        },
        {
            id: "student-leaves",
            title: "Student Leaves",
            type: "none"
        }
    ]

},
{
    id: "instructor",
    title: "Lectures",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'menu_book',
    children:
    [
        {
            id: "course-lectures",
            title: "Course Lectures",
            type: "none"
        },
        {
            id: "program-lectures",
            title: "Program Lectures",
            type: "none"
        },
        // {
        //     id: "exam-schedule",
        //     title: "Exam Schedule",
        //     type: "none"

        // },
            ]
},
{
    id: "email",
    title: "Internal Email",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'email',
    children:
    [
        {
            id: "inbox",
            title: "Inbox",
            type: "none"
        }
       ]
},


{
    id: "settings",
    title: "Settings",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'settings',
    children:
    [
        {
            id: "instructor-settings",
            title: "Instructor Profile",
            type: "none"
        },
        {
            id: "student-settings",
            title: "Student Profile",
            type: "none"
        },
        {
            id: "coursemanager-settings",
            title: "Course Manager Profile",
            type: "none"
        },
        {
            id: "programmanager-settings",
            title: "Program Manager Profile",
            type: "none"
        },
        {
            id: "headofdepartment-settings",
            title: "Head Of Department Profile",
            type: "none"
        },
        {
            id: "supervisor-settings",
            title: "Supervisor Profile",
            type: "none"
        },
        {
            id: "trainingcoordinator-settings",
            title: "Training Coordinator Profile",
            type: "none"
        },
        {
            id: "trainingadministrator-settings",
            title: "Training Administrator Profile",
            type: "none"
        }
    ]
},

{
  id: "apps",
  title: "Support",
  selected: false,
  iconsrc: "/assets/announcement-icon.svg",
  icon: 'chat',
  children:
  [
      {
          id: "support",
          title: "All Tickets",
          type: "none"
      }
  ]
},

]

MENU_ITEMS = [...MENU_LIST];
