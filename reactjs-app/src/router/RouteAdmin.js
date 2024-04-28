

import UserIndex from "../pages/admin/user/UserIndex";
import UserAdd from "../pages/admin/user/UserAdd";
import UserEdit from "../pages/admin/user/UserEdit";
import UserTrash from "../pages/admin/user/UserTrash";

import RoleAdd from "../pages/admin/role/RoleAdd";
import RoleEdit from "../pages/admin/role/RoleEdit";
import RoleIndex from "../pages/admin/role/RoleIndex";
import RoleTrash from "../pages/admin/role/RoleTrash";

import StaffAdd from "../pages/admin/staff/StaffAdd";
import StaffIndex from "../pages/admin/staff/StaffIndex";
import StaffTrash from "../pages/admin/staff/StaffTrash";
import StaffEdit from "../pages/admin/staff/StaffEdit";

import NotificationIndex from "../pages/admin/notification/NotificationIndex";
import NotificationAdd from "../pages/admin/notification/NotificationAdd";
import NotificationEdit from "../pages/admin/notification/NotificationEdit";
import NotificationTrash from "../pages/admin/notification/NotificationTrash";

import BrandAdd from "../pages/admin/brand/BrandAdd";
import BrandEdit from "../pages/admin/brand/BrandEdit";
import BrandIndex from "../pages/admin/brand/BrandIndex";
import BrandTrash from "../pages/admin/brand/BrandTrash";

const RouteAdmin = [
    //user
    { path: '/admin/user/index', component: UserIndex },
    { path: '/admin/user/trash', component: UserTrash },
    { path: '/admin/user/add', component: UserAdd },
    { path: '/admin/user/edit/:id', component: UserEdit },
    //staff
    { path: '/admin/staff/index', component: StaffIndex },
    { path: '/admin/staff/trash', component: StaffTrash },
    { path: '/admin/staff/add', component: StaffAdd },
    { path: '/admin/staff/edit/:id', component: StaffEdit },
    //role
    { path: '/admin/role/index', component: RoleIndex },
    { path: '/admin/role/trash', component: RoleTrash },
    { path: '/admin/role/add', component: RoleAdd },
    { path: '/admin/role/edit/:id', component: RoleEdit },
    //notification
    { path: '/admin/notification/index', component: NotificationIndex },
    { path: '/admin/notification/trash', component: NotificationTrash },
    { path: '/admin/notification/add/:id', component: NotificationAdd },
    { path: '/admin/notification/edit/:id', component: NotificationEdit },
    //brand
    { path: '/admin/brand/index', component: BrandIndex },
    { path: '/admin/brand/trash', component: BrandTrash },
    { path: '/admin/brand/add', component: BrandAdd },
    { path: '/admin/brand/edit/:id', component: BrandEdit },
];
export default RouteAdmin;
