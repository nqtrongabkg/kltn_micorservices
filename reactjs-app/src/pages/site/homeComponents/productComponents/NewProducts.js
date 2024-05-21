import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link, useNavigate } from 'react-router-dom';
import { star, starOutline, bagAddOutline, repeatOutline, eyeOutline, heartOutline } from 'ionicons/icons';
import ProductService from '../../../../services/ProductService';
import ProductSaleService from '../../../../services/ProductSaleService'; // Import the ProductSaleService
import FavoriteService from '../../../../services/FavoriteService';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../../config';

const NewProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await ProductService.getAll();
            // Sort the products by createdAt property from newest to oldest and take the first 12 products
            const sortedProducts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 12);
            // Map each product to include the sale price
            const productsWithSale = await Promise.all(sortedProducts.map(async (product) => {
                const saleInfoList = await ProductSaleService.getByProduct(product.id);
                if (saleInfoList && saleInfoList.length > 0) {
                    // Find the sale with the newest createdAt timestamp
                    const latestSaleInfo = saleInfoList.reduce((latestSale, currentSale) => {
                        return new Date(currentSale.createdAt) > new Date(latestSale.createdAt) ? currentSale : latestSale;
                    });
                    product.salePrice = latestSaleInfo.priceSale;
                }
                return product;
            }));
            setProducts(productsWithSale);
        })();
    }, []);

    return (
        <div className="product-main">
            <h2 className="title">Sản phẩm mới nhất</h2>
            <div className="product-grid">
                {products && products.length > 0 &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Handle null image property
    const productImage = product.image ? `${urlImageProduct}/${product.image}` : 'placeholder-image.jpg';

    const addProductToFavorite = async (productId) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/` } });
            return;
        } else {
            const favoriteAdd = {
                productId: productId,
                userId: user?.userId
            };
            const favoriteAdded = await FavoriteService.create(favoriteAdd);
            if (favoriteAdded !== null) {
                toast.success("Đã thêm sản phẩm vào yêu thích");
            }
        }
    }

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };


    return (
        <div className="showcase">
            <div className="showcase-banner">
                <img src={productImage} className="product-img default" alt='HinhAnh' />
                <img src={productImage} width={300} className="product-img hover" alt='HinhAnh' />
                {product.salePrice && (
                    <p className="showcase-badge angle black">sale :{((product.price - product.salePrice) / product.price * 100).toFixed(0)}%</p>
                )}
                <div className="showcase-actions">
                    <button className="btn-action" onClick={() => addProductToFavorite(product.id)}>
                        <IonIcon icon={heartOutline} />
                    </button>
                    <button className="btn-action">
                        <Link to={'/product-detail/' + product.id}>
                            <IonIcon icon={eyeOutline} />
                        </Link>
                    </button>
                    <button className="btn-action">
                        <IonIcon icon={repeatOutline} />
                    </button>
                    <button className="btn-action">
                        <IonIcon icon={bagAddOutline} />
                    </button>
                </div>
            </div>
            <div className="showcase-content">
                <a href="#nqt" className="showcase-category">{product.name}</a>
                <a href="#nqt">
                    <h3 className="showcase-title">{product.description}</h3>
                </a>
                <div className="showcase-rating">
                    {Array(product.evaluate)
                        .fill()
                        .map((_, index) => (
                            <IonIcon key={index} icon={star} />
                        ))}
                    {Array(5 - product.evaluate)
                        .fill()
                        .map((_, index) => (
                            <IonIcon key={product.evaluate + index} icon={starOutline} />
                        ))}
                </div>
                <div className="price-box">
                    {product.salePrice ? (
                        <>
                            <p className="price">{formatPrice(product.salePrice)}</p>
                            <del>{formatPrice(product.price)}</del>
                        </>
                    ) : (
                        <p className="price">{formatPrice(product.price)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
