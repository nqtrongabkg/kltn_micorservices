import React from "react";
import Slider from "./homecomponents/Slider";
import Category from "./homecomponents/Category";
import Product from "./homecomponents/Product";
// import Testimonials from "./homecomponents/Testimonials";
// import Blog from "./homecomponents/Blog";

const Home = () => {
    return (
        <>
        <Slider></Slider>
        <Category></Category>
        <Product></Product>
        {/* <Testimonials></Testimonials>    */}
        {/* <Blog></Blog>   */}
        </>
    );
};
export default Home;