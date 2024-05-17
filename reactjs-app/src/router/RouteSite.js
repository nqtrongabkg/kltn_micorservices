import Home from "../pages/site/Home";
import OrderItemDetail from "../pages/site/OrderItemDetail";
import ProductDetails from "../pages/site/ProductDetails";
import Productfortune from "../pages/site/Productfortune";
import ShoppingCart from "../pages/site/Cart";
import Login from "../layouts/LayoutSite/Login";
import MyUser from "../pages/site/MyUser";
import RegisterUser from "../layouts/LayoutSite/RegisterUser";
import UserManager from "../pages/site/UserManager";
import RegisterStore from "../pages/site/RegisterStore";
import FavoriteProduct from "../pages/site/FavoriteProduct";
import CreateFeedback from "../pages/site/CreateFeedback";

const RouteSite = [
    { path: '/', component: Home },

    { path: '/my-user', component: MyUser },

    { path: '/my-user-manager', component: UserManager },

    { path: '/login', component: Login },

    { path: '/register', component: RegisterUser },

    { path: '/register-store/:id', component: RegisterStore },

    { path: '/product-detail/:id', component: ProductDetails },

    { path: '/productfortune', component: Productfortune },

    { path: '/shopping-cart', component: ShoppingCart },

    { path: '/favorite', component: FavoriteProduct },

    { path: '/order-item-detail/:id', component: OrderItemDetail },

    { path: '/create-feedback', component: CreateFeedback },
];
export default RouteSite;