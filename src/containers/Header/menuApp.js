export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage",
    menus: [
      // subMenus: [
      //   {
      //     name: "menu.system.system-administrator.user-manage",
      //     link: "/system/user-manage",
      //   },
      //   {
      //     name: "menu.system.system-administrator.product-manage",
      //     link: "/system/user-redux",
      //   },
      // ],
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-manage-doctor",
      },
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quan ly phong kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/user-manage",
      },
    ],
  },
  {
    //quan ly specialty
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quan ly cam nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const doctorMenu = [
  {
    //quan ly nguoi dung
    name: "menu.doctor.manage",
    menus: [
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
