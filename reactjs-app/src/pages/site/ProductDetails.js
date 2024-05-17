import React, { useEffect } from "react";
import '../../assets/styles/productdetails.css';
import Content from "./productDetails/Content";
import ProductGallery from "./productDetails/ProductGallery";

const ProductDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    }, []);

    return (
        <div>
            <ProductGallery />
            <Content />
        </div>
    );
};

export default ProductDetails;
