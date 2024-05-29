import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link, useNavigate } from 'react-router-dom';
import { star, starOutline, bagAddOutline, repeatOutline, eyeOutline, heartOutline } from 'ionicons/icons';
import ProductSaleService from '../../../../services/ProductSaleService';
import { urlImageProduct } from '../../../../config';
import ProductService from '../../../../services/ProductService';
import FavoriteService from '../../../../services/FavoriteService';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const Sale = () => {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        (async () => {
            const result = await ProductSaleService.getAll();
            const filteredSales = result.filter(sale => sale.status !== 2);
            filteredSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setSales(filteredSales);
        })();
    }, []);

    const totalPages = Math.ceil(sales.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sales.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className="product-main border-top border-4 border-dark">
            <h2 className="title text-center" style={{ fontSize: '30px', marginTop: '10px' }}>Sản phẩm giảm giá</h2>
            <div className="product-grid">
                {currentProducts && currentProducts.length > 0 &&
                    currentProducts.map((sale, index) => (
                        <ProductSaleTableRow key={sale.id} sale={sale} />
                    ))
                }
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

const ProductSaleTableRow = ({ sale }) => {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await ProductService.getById(sale.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [sale.productId]);

    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    // Handle null image property
    const productImage = product.image ? `${urlImageProduct}/${product.image}` : 'placeholder-image.jpg';

    // Calculate discount percentage
    const discountPercentage = ((product.price - sale.priceSale) / product.price) * 100;

    const addProductToFavorite = async (productId) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            navigate("/login", { state: { redirectTo: `/` } });
            return;
        }
        else {
            const favoriteAdd = {
                productId: productId,
                userId: JSON.parse(sessionStorage.getItem('user'))?.userId
            };
            const favoriteaAdded = await FavoriteService.create(favoriteAdd);
            if (favoriteaAdded !== null) {
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
                <img src={urlImageProduct + product.image} width={300} className="product-img hover" alt='HinhAnh' />
                <p className="showcase-badge angle black">sale :{discountPercentage.toFixed(0)}%</p>
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
                {/* Display product rating */}
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
                {/* Display product price */}
                <div className="price-box">
                    <p className="price">{formatPrice(sale.priceSale)}</p>
                    <del>{formatPrice(product.price)}</del>
                </div>
            </div>
        </div>
    );
};

export default Sale;