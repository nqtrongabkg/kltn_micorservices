import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';
import { urlImageCategory } from '../../../config';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [reload] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.filter(category => category.status === 3);
                const finalCategories = sortedCategories.sort((a, b) => b.productQuantity - a.productQuantity);
                setCategories(finalCategories);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchCategories();
    }, [reload]);

    if (!categories) {
        return <div>Loading...</div>;
    }

    return (
        <div className="category">
            <div className="container">
                <div className="category-item-container has-scrollbar">
                    {categories && categories.length > 0 &&
                        categories.map((category, index) => {
                            return (
                                <div className="category-item" key={category.id} >
                                    <div className="category-img-box">
                                        {category.image ? (
                                            <img src={urlImageCategory + category.image} width={40}  alt="Hinh anh" />
                                        ) : (
                                            <p>Không có ảnh</p>
                                        )}
                                    </div>
                                    <div className="category-content-box">
                                        <div className="category-content-flex">
                                            <h3 className="category-item-title">{category.name}</h3>
                                            <p className="category-item-amount">({category.productQuantity})</p>
                                        </div>
                                        {/* Replace <a> with <Link> */}
                                        <Link to={'/product-of-category/' + category.id} className="category-btn">Show all</Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Category;