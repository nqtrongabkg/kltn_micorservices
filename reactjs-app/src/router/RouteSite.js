import Home from "../pages/site/Home";
import OrderItemDetail from "../pages/site/OrderItemDetail";
import ProductDetails from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/Cart";
import Login from "../layouts/LayoutSite/Login";
import MyUser from "../pages/site/MyUser";

const RouteSite = [
    { path: '/', component: Home },

    { path: '/my-user', component: MyUser },

    { path: '/login', component: Login },

    { path: '/product-detail/:id', component: ProductDetails },

    { path: '/productfortune', component: Productfortune },

    { path: '/shopping-cart', component: ShoppingCart },

    { path: '/order-item-detail/:id', component: OrderItemDetail },
];
export default RouteSite;