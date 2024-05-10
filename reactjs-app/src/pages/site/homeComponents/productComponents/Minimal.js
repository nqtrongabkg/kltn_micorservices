import React, { useEffect, useState } from 'react';

import TagService from '../../../../services/TagService';
import ProductTagService from '../../../../services/ProductTagService';
import ProductService from '../../../../services/ProductService';
import { urlImageProduct } from '../../../../config';

const Minimal = () => {
    const [tagsWithProducts, setTagsWithProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let tags = await TagService.getAll();
                
                tags = tags.filter(tag => tag.status === 3)
                           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                           .slice(0, 3);

                const tagsWithProductData = await Promise.all(tags.map(async tag => {
                    const productTags = await ProductTagService.getByTagId(tag.id);
                    const products = await Promise.all(
                        productTags.slice(0, 5).map(productTag =>  // Only fetch the first 5 product tags
                            ProductService.getById(productTag.productId)
                        )
                    );
                    return { tag, products };
                }));

                setTagsWithProducts(tagsWithProductData);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-minimal">
            {tagsWithProducts.map(({ tag, products }, index) => (
                <div key={index} className="product-showcase">
                    <h2 className="title">{tag.name}</h2>
                    <div className="showcase-wrapper has-scrollbar">
                        <div className="showcase-container">
                            {products.map((product, idx) => (
                                <div key={idx} className="showcase">
                                    <a href="#nqt" className="showcase-img-box">
                                        <img src={urlImageProduct + product.image} alt={product.name} width={70} className="showcase-img" />
                                    </a>
                                    <div className="showcase-content">
                                        <a href="#nqt">
                                            <h4 className="showcase-title">{product.name}</h4>
                                        </a>
                                        <a href="#nqt" className="showcase-category">{product.category}</a>
                                        <div className="price-box">
                                            <p className="price">${product.price.toFixed(2)}</p>
                                            {product.originalPrice && <del>${product.originalPrice.toFixed(2)}</del>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Minimal;
