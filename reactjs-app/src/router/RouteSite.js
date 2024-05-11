import Home from "../pages/site/Home";
import OrderDetail from "../pages/site/OrderDetail";
import ProductDetails from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/Cart";
import Login from "../layouts/LayoutSite/Login";

const RouteSite = [
    { path: '/', component: Home },

    { path: '/login', component: Login },

    { path: '/product-detail/:id', component: ProductDetails },

    { path: '/productfortune', component: Productfortune },

    { path: '/shopping-cart', component: ShoppingCart },

    { path: '/orderdetail/:id', component: OrderDetail },
];
export default RouteSite;