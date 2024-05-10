import React, { useState, useEffect } from 'react';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const categoriesResult = await CategoryService.getAll();
                const brandsResult = await BrandService.getAll();

                const filteredCategories = categoriesResult.filter(category => category.status === 3);
                const filteredBrands = brandsResult.filter(brand => brand.status === 3);

                setCategories(filteredCategories);
                setBrands(filteredBrands);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const renderCategories = () => {
        const numberOfItemsPerColumn = 3;
        const columns = [];

        for (let i = 0; i < categories.length; i += numberOfItemsPerColumn) {
            const columnItems = categories.slice(i, i + numberOfItemsPerColumn);
            columns.push(
                <ul key={i} className="dropdown-panel-list">
                    {columnItems.map(category => (
                        <li key={category.id} className="panel-list-item">
                            <a href="#tag">{category.name}</a>
                        </li>
                    ))}
                </ul>
            );
        }

        return columns;
    };

    const renderBrands = () => {
        return brands.map(brand => (
            <li key={brand.id} className="dropdown-item">
                <a href="#tag" className="menu-title">{brand.name}</a>
            </li>
        ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ul className="desktop-menu-category-list">
            <li className="menu-category">
                <a href="/" className="menu-title">Trang chủ</a>
            </li>
            <li className="menu-category">
                <a href="#tag" className="menu-title">Danh mục</a>
                <div className="dropdown-panel">
                    {renderCategories()}
                </div>
            </li>
            <li className="menu-category">
                <a href="#tag" className="menu-title">Thương hiệu nổi bật</a>
                <ul className="dropdown-list">
                    {renderBrands()}
                </ul>
            </li>
        </ul>
    );
};

export default Menu;
