
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

    ]
},
{
    id: "admin/schedule",
    title: "Schedule Class",
    iconsrc: "/assets/schedule-icon.svg",
    icon: 'class',
    selected: false,
    children:
    [
        {
            id: "class-list",
            title:"Class List",
            type: "selected",

        },
        {
            id: "create-class",
            title:"Create Class",
            type:"none"
        },
        {
            id: "approve-list",
            title:"Approve List",
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
    title: "Audit",
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
//     id: "home_content",
//     title: "Home Content",
//     iconsrc: "/assets/home-content-icon.svg",
//     selected: false,
//     children:
//     [

//     ]
// },
{
    id: "admin/users",
    title: "Users",
    selected: false,
    iconsrc: "/assets/users-icon.svg",
    icon: 'people',
    children:
    [
        {
            id: "user-type",
            title: "User Type",
            type: "none",
        },
        {
            id: "all-users",
            title: "All User",
            type: "none",
        }
    ]
},
// {
//     id: "survey_builder",
//     title: "Survey Builder",
//     selected: false,
//     iconsrc: "/assets/survey-builder-icon.svg",
//     children:
//     [
//         {
//             id: "surveys",
//             title: "Surveys",
//             type: "none",
//             actions: ["add", "edit", "view", "delete"]
//         },
//         {
//             id: "survey_add",
//             title: "Add",
//             type: "none"
//         }
//     ]
// },
{
    id: "admin/certificate",
    title: "Certificate Builder",
    selected: false,
    iconsrc: "/assets/certificate-icon.svg",
    icon: 'photo_album',
    children:
    [
        {
            id: "certificates",
            title: "Certificates",
            type: "none",
        },
        {
            id: "design",
            title: "Design",
            type: "none"
        }
    ]
},
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
        {
            id: "instructor-request",
            title: "Instructor Request",
            type: "none"
        },
        {
            id: "invite-user-reject",
            title: "Invite User Reject",
            type: "none"
        },
        {
            id: "new-student-referred",
            title: "New Student Referred",
            type: "none"
        },
        {
            id: "course-referral-invite",
            title: "Course Referral Invite",
            type: "none"
        },
        {
            id: "completed-course",
            title: "Completed Course",
            type: "none"
        },
        {
            id: "instructor-course-invite",
            title: "Instructor Course Invite",
            type: "none"
        },
        {
            id: "instructor-accept-course-invite",
            title: "Instructor Accept Course Invite Status",
            type: "none"
        },
        {
            id: "send-course-invoice",
            title: "Send Course Invoice",
            type: "none"
        },
        {
            id: "admin-new-email",
            title: "Admin New Email",
            type: "none"
        }
    ]
},
{
    id: "admin/banners",
    title: "Banners",
    selected: false,
    iconsrc: "/assets/banner-icon.svg",
    icon: 'art_track',
    children:
    [
        {
            id: "instructor-banner-list",
            title: "Instructor Banners",
            type: "none"
        },
        {
            id: "create-instructor-banner",
            title: "Add Instructor Banner",
            type: "none"
        },

        {
            id: "student-banner-list",
            title: "Student Banners",
            type: "none"
        },
        {
            id: "create-student-banner",
            title: "Add Student Banner",
            type: "none"
        }

    ]
},
{
    id: "admin/announcement",
    title: "Announcement",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'announcement',
    children:
    [
        {
            id: "list",
            title: "List",
            type: "none",
        }
    ]
},
{
    id: "admin/instructors",
    title: "Instructors",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'find_in_page',
    children:
    [
        {
            id: "all-instructors",
            title: "All Instructors",
            type: "none",
        },
        {
            id: "add-instructor",
            title: "Add Instructor",
            type: "none",
        },
        {
            id: "article",
            title: "Articles",
            type: "none",
        },
        {
            id: "agreement-t-c",
            title: "Agreement T & C",
            type: "none",
        }
    ]
},
{
    id: "admin/students",
    title: "Students",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'people_alt',
    children:
    [
        {
            id: "all-students",
            title: "All Students",
            type: "none",
        },
        {
            id: "add-student",
            title: "Add Student",
            type: "none",
        },
        {
            id: "student-attendance",
            title: "Student Attendance",
            type: "none",
        },
    ]
},
{
    id: "admin/departments",
    title: "Departments",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'business',
    children:
    [
        {
            id: "all-departments",
            title: "All Departments",
            type: "none",
        },
        {
            id: "add-department",
            title: "Add Department",
            type: "none",
        }
    ]
},
{
    id: "admin/staff",
    title: "Staff",
    selected: false,
    iconsrc: "/assets/announcement-icon.svg",
    icon: 'face',
    children:
    [
        {
            id: "all-staff",
            title: "All Staff",
            type: "none",
        },
        {
            id: "add-staff",
            title: "Add Staff",
            type: "none",
        },
    ]
},

{
    id: "admin/testimonials",
    title: "Testimonials",
    selected: false,
    iconsrc: "/assets/testimonials-icon.svg",
    icon: 'find_in_page',
    children:
    [
        {
            id: "testimonials-instructor",
            title: "Instructor",
            type: "none"
        },
        {
            id: "testimonials-student",
            title: "Student",
            type: "none"
        }
    ]
},
{
    id: "student/enrollment",
    title: "Enrollment",
    iconsrc: "/assets/course-icon.svg",
    icon:'Homework',
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
{
    id: "student/schedule",
    title: "Schedule",
    iconsrc: "/assets/course-icon.svg",
    icon:'fact_check',
    selected: true,
    children: [
        {
            id: "homework",
            title: "Homework",
            selected: false,
            iconsrc: "/assets/announcement-icon.svg",
        },
        {
            id: "timetable",
            title: "Time Table",
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
            id: "lectures",
            title: "All Lectures",
            type: "none"
        },
        {
            id: "exam-schedule",
            title: "Exam Schedule",
            type: "none"

        },
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
        }
    ]
},

]

MENU_ITEMS = [...MENU_LIST];
