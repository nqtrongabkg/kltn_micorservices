import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import logo from '../../../assets/images/logo/logo.svg';
import Menu from '../../../pages/site/header/menu';
import '../../../assets/styles/searchResult.css';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import { urlImageProduct } from '../../../config';

export default function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleGoToMyUserClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/my-user` } });
            return;
        } else {
            console.log(JSON.parse(sessionStorage.getItem('user')));
            navigate("/my-user");
        }
    };

    const handleGoToCartClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/shopping-cart` } });
            return;
        } else {
            console.log(JSON.parse(sessionStorage.getItem('user')));
            navigate("/shopping-cart");
        }
    };

    const handleGoToFavoriteClick = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/favorite` } });
            return;
        } else {
            console.log(JSON.parse(sessionStorage.getItem('user')));
            navigate("/favorite");
        }
    };

    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (value.trim() !== "") {
            ProductService.search(value).then(setSearchResults).catch(console.error);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchItemClick = (productId) => {
        navigate(`/product-detail/${productId}`);
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <>
            <header>
                <div className="header-main">
                    <div className="container">
                        <a href="/" className="header-logo">
                            <img src={logo} alt="Anon's logo" width="120" height="36" />
                        </a>

                        <div className="header-search-container">
                            <input
                                type="search"
                                name="search"
                                className="search-field"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                            <button className="search-btn">
                                <IonIcon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></IonIcon>
                            </button>

                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.slice(0, 8).map((product) => (
                                        <div
                                            key={product.id}
                                            className="search-result-item"
                                            onClick={() => handleSearchItemClick(product.id)}
                                        >
                                            <img src={urlImageProduct + product.image} alt='HinhAnh'/>
                                            <div>
                                                <h5>{product.name}</h5>
                                                <p>{product.description}</p>
                                            </div>
                                            <div className="product-price">
                                                <span>{product.price} VND</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="header-user-actions">
                            <button className="action-btn" onClick={handleGoToMyUserClick}>
                                <IonIcon name="person-outline" role="img" className="md hydrated" aria-label="person outline"></IonIcon>
                            </button>

                            <button className="action-btn" onClick={handleGoToFavoriteClick}>
                                <IonIcon name="heart-outline" role="img" className="md hydrated" aria-label="heart outline"></IonIcon>
                                <span className="count">0</span>
                            </button>

                            <button className="action-btn" onClick={handleGoToCartClick}>
                                <IonIcon name="bag-handle-outline" role="img" className="md hydrated" aria-label="bag handle outline"></IonIcon>
                                <span className="count">0</span>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="desktop-navigation-menu">
                    <div className="container">
                        <Menu />
                    </div>
                </nav>
            </header>
        </>
    );
}
