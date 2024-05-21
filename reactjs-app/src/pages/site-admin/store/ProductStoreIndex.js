import React, { useEffect, useState } from 'react';
import ProductStoreService from '../../../services/ProductStoreService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import { FaEdit, FaDollyFlatbed } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { urlImageProduct } from '../../../config';

const ProductStoreIndex = () => {
    const [stores, setStores] = useState([]);
    const [reload] = useState(0);

    useEffect(() => {
        (async () => {
            const sessionUser = JSON.parse(sessionStorage.getItem('user'));
            const result = await ProductStoreService.getbyUserId(sessionUser.userId);
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setStores(result);
            // console.log("stores is:", result);
        })();
    }, [reload]);

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý kho hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/site-admin/product/import/index">Lịch sử nhập hàng</a>
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Đã bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores && stores.length > 0 &&
                            stores.map((store, index) => (
                                <ProductTableRow key={store.id} store={store} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductTableRow = ({ store }) => {
    const [product, setProduct] = useState(null);
    const [optionValue, setOptionValue] = useState(null);
    const [option, setOption] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // console.log("store:", store);
                const fetchedProduct = await ProductService.getById(store.productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        const fetchOptionValue = async () => {
            try {
                const fetched = await ProductOptionService.getOptionValue(store.optionValueId);

                if (fetched !== null) {
                    const option = await ProductOptionService.getById(fetched.optionId);
                    setOption(option);
                    // console.log("option: ", option);
                    // console.log("value: ", fetched);
                }
                setOptionValue(fetched);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchOptionValue();
        fetchProduct();
    }, [store]);

    return (
        <tr className="datarow">
            <td className="text-center">
                <input type="checkbox" id="checkId" />
            </td>
            <td>
                <div className="name">
                    {product ? (
                        <Link to={`#nqt`}>{product.name}</Link>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
                <div className="function_style">

                    <Link to={`/site-admin/product/store/edit/${store.id}`} className='px-1 text-primary'>
                        <FaEdit size={24}/>
                    </Link>
                    <Link to={`/site-admin/product/import/add/${store.id}`} className="px-1">
                        <FaDollyFlatbed size={24} />
                    </Link>
                </div>
            </td>
            <td>
                {product ? (
                    <img src={`${urlImageProduct}/${product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                ) : (
                    <p>Không có ảnh</p>
                )}
            </td>
            <td>{option ? `${option.name} / ${optionValue ? optionValue.value : ''}` : 'Loading...'}</td>
            <td>{store.price}</td>
            <td>{store.quantity}</td>
            <td>{store.soldQuantity}</td>
        </tr>
    );
};

export default ProductStoreIndex;
