import Home from "../pages/site/Home";
import OrderDetail from "../pages/site/OrderDetail";
import productdetail from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/ShoppingCart";


const RouteSite = [
    { path: '/', component: Home },

    { path: '/productdetail/:id', component: productdetail },

    { path: '/productfortune', component: Productfortune },

    { path: '/shoppingcart/:id', component: ShoppingCart },

    { path: '/orderdetail/:id', component: OrderDetail },
    
];
export default RouteSite;