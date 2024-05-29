import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { star, starOutline, bagAddOutline, repeatOutline, eyeOutline, heartOutline } from 'ionicons/icons';
import ProductService from '../../../services/ProductService';
import ProductSaleService from '../../../services/ProductSaleService';
import FavoriteService from '../../../services/FavoriteService';
import ProductCategoryService from '../../../services/ProductCategory';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';

const ProductSimilar = () => {
    const {id} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("Product ID of ProductSimilar = ", id);
            if (id) {
                const getProductCategory = await ProductCategoryService.getByProductId(id);
                if (getProductCategory) {
                    console.log("Product categories:", getProductCategory);
                    const categories = await Promise.all(getProductCategory.map(async (item) => {
                        return ProductCategoryService.getByCategoryId(item.categoryId);
                    }));
                    if (categories) {
                        console.log("Categories: ", categories);
                        const fetchedProducts = await Promise.all(categories.flat().map(async (categoryItem) => {
                            return ProductService.getById(categoryItem.productId);
                        }));
                        const filteredProducts = fetchedProducts.filter(product => product.id !== id);
                        console.log("Filtered Products: ", filteredProducts);

                        const productsWithSale = await Promise.all(filteredProducts.map(async (product) => {
                            const saleInfoList = await ProductSaleService.getByProduct(product.id);
                            if (saleInfoList && saleInfoList.length > 0) {
                                const latestSaleInfo = saleInfoList.reduce((latestSale, currentSale) => {
                                    return new Date(currentSale.createdAt) > new Date(latestSale.createdAt) ? currentSale : latestSale;
                                });
                                product.salePrice = latestSaleInfo.priceSale; // Assuming 'priceSale' is the discounted price
                            }
                            return product;
                        }));

                        console.log("Products with Sale: ", productsWithSale);
                        setProducts(productsWithSale);
                    }
                }
            }
        })();
    }, [id]);

    return (
        <div className="product-main">
            <h2 className="title text-center" style={{ fontSize: '30px', marginTop: '10px' }}>Sản phẩm liên quan</h2>
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

export default ProductSimilar;
