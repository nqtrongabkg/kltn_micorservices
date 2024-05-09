import React from 'react';
import Sidebar from './productcomponents/Sidebar';
import Minimal from './productcomponents/Minimal';
// import Featured from './productcomponents/Featured';
// import Grid from './productcomponents/Grid';
import Sale from './productcomponents/Sale';

const Product = () => {
    return (
        <div className="product-container">
        <div className="container">
            <Sidebar></Sidebar>
            <div className="product-box">
                <Minimal></Minimal>
                {/* <Featured></Featured> */}
                {/* <Grid></Grid> */}
                <Sale></Sale>
            </div>
        </div>
        </div>

    );
};

export default Product;