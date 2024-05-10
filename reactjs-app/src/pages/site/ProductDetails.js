import React from "react";
import '../../assets/styles/productdetails.css'
import Content from "./productDetails/Content";
import ProductGallery from "./productDetails/ProductGallery";

const ProductDetails = () => {
    return (
        <>
            <div>
                <ProductGallery></ProductGallery>
                <Content></Content>
            </div>
        </>
    );
};
export default ProductDetails;