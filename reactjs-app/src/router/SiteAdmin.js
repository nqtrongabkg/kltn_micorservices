

import BrandAdd from "../pages/site-admin/brand/BrandAdd";
import BrandEdit from "../pages/site-admin/brand/BrandEdit";
import BrandIndex from "../pages/site-admin/brand/BrandIndex";
import BrandTrash from "../pages/site-admin/brand/BrandTrash";

import ProductAdd from "../pages/site-admin/product/ProductAdd";
import ProductEdit from "../pages/site-admin/product/ProductEdit";
import ProductIndex from "../pages/site-admin/product/ProductIndex";
import ProductTrash from "../pages/site-admin/product/ProductTrash";
import ProductSaleTrash from "../pages/site-admin/product/ProductSaleTrash";
import ProductSaleAdd from "../pages/site-admin/product/ProductSaleAdd";
import ProductSaleIndex from "../pages/site-admin/product/ProductSaleIndex";
import ProductSaleEdit from "../pages/site-admin/product/ProductSaleEdit";
import ProductOptionAdd from "../pages/site-admin/product/ProductOptionAdd";
import ProductOptionIndex from "../pages/site-admin/product/ProductOptionIndex";
import ProductOptionEdit from "../pages/site-admin/product/ProductOptionEdit";
import ProductOptionTrash from "../pages/site-admin/product/ProductOptionTrash";
import ProductGallaryIndex from "../pages/site-admin/product/ProductGallaryIndex";
import ProductStoreIndex from "../pages/site-admin/store/ProductStoreIndex";
import ProductStoreEdit from "../pages/site-admin/store/ProductStoreEdit";
import ProductImportAdd from "../pages/site-admin/store/ProductImportAdd";
import ProductImportIndex from "../pages/site-admin/store/ProductImportIndex";
import ProductImportEdit from "../pages/site-admin/store/ProductImportEdit";

import OrderItemIndex from "../pages/site-admin/orderItem/OrderItemIndex";
import OrderItemTrash from "../pages/site-admin/orderItem/OrderItemTrash";
import ProductExportIndex from "../pages/site-admin/store/ProductExportIndex";


const SiteAdmin = [
    //brand
    { path: '/site-admin/brand/index', component: BrandIndex },
    { path: '/site-admin/brand/trash', component: BrandTrash },
    { path: '/site-admin/brand/add', component: BrandAdd },
    { path: '/site-admin/brand/edit/:id', component: BrandEdit },
    //product
    { path: '/site-admin/product/index', component: ProductIndex },
    { path: '/site-admin/product/add', component: ProductAdd },
    { path: '/site-admin/product/edit/:id', component: ProductEdit },
    { path: '/site-admin/product/trash', component: ProductTrash },
    //product sale
    { path: '/site-admin/product/sale-index', component: ProductSaleIndex },
    { path: '/site-admin/product/sale-trash', component: ProductSaleTrash },
    { path: '/site-admin/product/sale-add/:id', component: ProductSaleAdd },
    { path: '/site-admin/product/sale-edit/:id', component: ProductSaleEdit },
    //product option
    { path: '/site-admin/product/option-index', component: ProductOptionIndex },
    { path: '/site-admin/product/option-edit/:id', component: ProductOptionEdit },
    { path: '/site-admin/product/option-add/:id', component: ProductOptionAdd },
    { path: '/site-admin/product/option-trash', component: ProductOptionTrash },
    //product gallary
    { path: '/site-admin/product/gallary-index/:id', component: ProductGallaryIndex },
    //product store
    { path: '/site-admin/product/store/index', component: ProductStoreIndex },
    { path: '/site-admin/product/import/index', component: ProductImportIndex },
    { path: '/site-admin/product/store/edit/:id', component: ProductStoreEdit },
    { path: '/site-admin/product/import/add/:id', component: ProductImportAdd },
    { path: '/site-admin/product/import/edit/:id', component: ProductImportEdit },
    //order-item
    { path: '/site-admin/order-item/index', component: OrderItemIndex },
    { path: '/site-admin/order-item/trash', component: OrderItemTrash },
    //order-export
    { path: '/site-admin/order/export', component: ProductExportIndex },
];
export default SiteAdmin;