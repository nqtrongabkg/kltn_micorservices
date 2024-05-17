import React, { useEffect, useState } from 'react';
import FeedbackService from '../../../services/FeedbackService';
import { useParams } from 'react-router-dom';
import { urlImageFeedback } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ImageModal from './ImageModal'; // Import the ImageModal component
import '../../../assets/styles/content.css';

const Content = () => {
    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const getFeedbacks = async (id) => {
            const result = await FeedbackService.getByProductId(id);
            if (result) {
                console.log("feedbacks:", result);
                setFeedbacks(result);
            }
        };
        getFeedbacks(id);
    }, [id]);

    const handleImageClick = (imageUrl) => {
        setCurrentImage(imageUrl);
        setShowModal(true);
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

    return (
        <section className="bg-light border-top py-4">
            <div className="container">
                <div className="row gx-4">
                    <div className="col-lg-8 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Đánh giá sản phẩm</h5>
                                {feedbacks.map(feedback => (
                                    <div key={feedback.id} className="d-flex mb-4 feedback-item">
                                        <div className="me-3" onClick={() => handleImageClick(`${urlImageFeedback}${feedback.image}`)}>
                                            <img src={`${urlImageFeedback}${feedback.image}`} style={{ width: 96, height: 96, cursor: 'pointer' }} className="img-md img-thumbnail" alt="Hình ảnh đánh giá" />
                                        </div>
                                        <div className="info">
                                            <div className="nav-link mb-1">
                                                <div>Đánh giá: {renderStars(feedback.evaluate)}</div>
                                                <strong className="text-dark">{feedback.description}</strong>
                                                <div>{feedback.detail}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="px-0 border rounded-2 shadow-0">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Sản phẩm tương tự</h5>
                                    <div className="d-flex mb-3">
                                        <a href="#!" className="me-3">
                                            <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/8.webp" style={{ minWidth: 96, height: 96 }} className="img-md img-thumbnail" alt="HinhAnh" />
                                        </a>
                                        <div className="info">
                                            <a href="#!" className="nav-link mb-1">
                                                Rucksack Backpack Large <br />
                                                Line Mounts
                                            </a>
                                            <strong className="text-dark">$38.90</strong>
                                        </div>
                                    </div>
                                    {/* Add more similar products here */}
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
