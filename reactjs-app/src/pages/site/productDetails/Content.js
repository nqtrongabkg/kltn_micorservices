import React, { useEffect, useState } from 'react';
import FeedbackService from '../../../services/FeedbackService';
import ProductService from '../../../services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';
import { urlImageFeedback, urlImageProduct } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ImageModal from './ImageModal';
import '../../../assets/styles/content.css';

const Content = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbacksPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async (id) => {
            const result = await FeedbackService.getByProductId(id);
            if (result) {
                setFeedbacks(result);
            }

            const getProduct = await ProductService.getById(id);
            if (getProduct) {
                const getProducts = await ProductService.getByUser(getProduct.createdBy, 0, 5);
                if (getProducts && getProducts.content) {
                    setProducts(getProducts.content);
                }
            }
        };
        getData(id);
    }, [id]);

    const handleImageClick = (imageUrl) => {
        setCurrentImage(imageUrl);
        setShowModal(true);
    };

    const handleProductClick = (productId) => {
        navigate(`/product-detail/${productId}`);
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <FontAwesomeIcon 
                key={i} 
                icon={faStar} 
                className={i < count ? 'text-warning' : 'text-muted'} 
            />
        ));
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    // Pagination Controls
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="bg-light border-top py-4">
            <div className="container">
                <div className="row gx-4">
                    <div className="col-lg-8 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Đánh giá sản phẩm</h5>
                                {currentFeedbacks.length > 0 ? (
                                    currentFeedbacks.map(feedback => (
                                        <div key={feedback.id} className="d-flex mb-4 feedback-item">
                                            <div className="me-3" onClick={() => handleImageClick(`${urlImageFeedback}${feedback.image}`)}>
                                                <img src={`${urlImageFeedback}${feedback.image}`} style={{ width: 96, height: 96, cursor: 'pointer' }} className="img-md img-thumbnail" alt="Hình ảnh đánh giá" />
                                            </div>
                                            <div className="info">
                                                <div className="nav-link mb-1">
                                                    <div>Đánh giá: {renderStars(feedback.evaluate)}</div>
                                                    <div >{feedback.description}</div>
                                                    <strong className="text-dark">{feedback.detail}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Chưa có đánh giá</p>
                                )}
                                {/* Pagination */}
                                <nav>
                                    <ul className='pagination'>
                                        {Array.from({ length: Math.ceil(feedbacks.length / feedbacksPerPage) }, (_, i) => (
                                            <li key={i} className='page-item'>
                                                <p onClick={() => paginate(i + 1)} className='page-link'>
                                                    {i + 1}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="px-0 border rounded-2 shadow-0">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Các sản phẩm khác của shop</h5>
                                    {products.map(product => (
                                        <div 
                                            key={product.id} 
                                            className="d-flex mb-3 product-card" 
                                            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }} 
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            <div className="me-3">
                                                <img src={`${urlImageProduct}/${product.image}`} style={{ minWidth: 96, height: 96 }} className="img-md img-thumbnail" alt={product.name} />
                                            </div>
                                            <div className="info">
                                                <div className="nav-link mb-1">
                                                    {product.name}
                                                </div>
                                                <strong className="text-dark">{formatPrice(product.price)} VND</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImageModal show={showModal} handleClose={() => setShowModal(false)} imageUrl={currentImage} />
        </section>
    );
};

export default Content;
