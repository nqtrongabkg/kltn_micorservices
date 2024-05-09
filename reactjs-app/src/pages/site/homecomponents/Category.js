import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Good use of Link for SPA navigation
import CategoryService from '../../../services/CategoryService';
import { urlImageCategory } from '../../../config';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                let result = await CategoryService.getAll();
                const sortedCategories = result.filter(category => category.status === 3);
                setCategories(sortedCategories);
            } catch (error) {
                console.error("Error fetching:", error);
                setError("Failed to fetch categories.");
            }
            setLoading(false);
        };

        fetchCategories();
    }, []); // Dependency array to prevent re-run

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error to the user
    }

    return (
        <div className="category">
            <div className="container">
                <div className="category-item-container has-scrollbar">
                    {categories.map((category) => (
                        <div className="category-item" key={category.id}>
                            <div className="category-img-box">
                                {category.image ? (
                                    <img src={urlImageCategory + category.image} className="img-fluid user-avatar" alt="Hình ảnh" />
                                ) : (
                                    <p>Không có ảnh</p>
                                )}
                            </div>
                            <div className="category-content-box">
                                <div className="category-content-flex">
                                    <h3>{category.name}</h3>
                                    <p className="category-item-amount">({category.productQuantity})</p>
                                </div>
                                <Link to={`/productdetail/${category.id}`}>Show all</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
