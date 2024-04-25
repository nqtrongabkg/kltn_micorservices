
// import BrandEdit from "../pages/backend/brand/BrandEdit";
// import BrandIndex from "../pages/backend/brand/BrandIndex";
// import BrandTrash from "../pages/backend/brand/BrandTrash";

import UserIndex from "../pages/admin/user/UserIndex";
import UserAdd from "../pages/admin/user/UserAdd";
import UserEdit from "../pages/admin/user/UserEdit";
import UserTrash from "../pages/admin/user/UserTrash";

import RoleAdd from "../pages/admin/role/RoleAdd";
import RoleEdit from "../pages/admin/role/RoleEdit";
import RoleIndex from "../pages/admin/role/RoleIndex";
import RoleTrash from "../pages/admin/role/RoleTrash";

const RouteAdmin = [
    //brand
    // { path: '/admin/brand/index', component: BrandIndex },
    // { path: '/admin/brand/edit/:id', component: BrandEdit },
    // { path: '/admin/brand/trash', component: BrandTrash },
    //user
    { path: '/admin/user/index', component: UserIndex },
    { path: '/admin/user/trash', component: UserTrash },
    { path: '/admin/user/add', component: UserAdd },
    { path: '/admin/user/edit/:id', component: UserEdit },
    // { path: '/admin/staff/index', component: StaffIndex },
    // { path: '/admin/staff/trash', component: StaffTrash },
    // { path: '/admin/staff/add', component: StaffAdd },
    // { path: '/admin/staff/edit/:id', component: StaffEdit },
    //role
    { path: '/admin/role/index', component: RoleIndex },
    { path: '/admin/role/trash', component: RoleTrash },
    { path: '/admin/role/add', component: RoleAdd },
    { path: '/admin/role/edit/:id', component: RoleEdit },
];
export default RouteAdmin;
