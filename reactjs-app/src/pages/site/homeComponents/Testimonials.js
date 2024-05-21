import React from 'react';
import { IonIcon } from '@ionic/react';
import { boatOutline} from 'ionicons/icons';

const Testimonials = () => {
    return (
        <div>
            <div className="container">
                <div className="testimonials-box">
                    <div className="cta-container">
                        <img src={require("../../../assets/images/cta-banner.jpg")} alt="summer collection" className="cta-banner" />
                        <a href="#nqt" className="cta-content">
                            <p className="discount">25% Discount</p>
                            <h2 className="cta-title">Summer collection</h2>
                            <p className="cta-text">Starting @ $10</p>
                            <button className="cta-btn">Shop now</button>
                        </a>
                    </div>
                    <div className="service">
                        <h2 className="title">Our Services</h2>
                        <div className="service-container">
                            <a href="#nat" className="service-item">
                                <div className="service-icon">
                                    <IonIcon icon={boatOutline} />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">Worldwide Delivery</h3>
                                    <p className="service-desc">For Order Over $100</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Testimonials;