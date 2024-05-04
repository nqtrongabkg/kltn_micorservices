import React, { useEffect, useState } from 'react';
import ProductSaleService from '../../../services/ProductSaleService';
import ProductService from '../../../services/ProductService';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';
import { LocalDateTime, DateTimeFormatter } from 'js-joda';

const ProductSaleIndex = () => {
    const [sales, setSales] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            const result = await ProductSaleService.getAll();
            // Filter out sales with status 2
            const filteredSales = result.filter(sale => sale.status !== 2);
            // Sort the filtered sales array by createdAt property from newest to oldest
            filteredSales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setSales(filteredSales);
        })();
    }, [reload]);

    const HandTrash = async (id) => {
        await ProductSaleService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await ProductSaleService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Giảm giá</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/product/sale-trash">Thùng rác</a>
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
                            <th>Giá giảm</th>
                            <th>Số lượng</th>
                            <th>Mô tả</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales.length > 0 &&
                            sales.map((sale, index) => (
                                <ProductSaleTableRow key={sale.id} sale={sale} HandTrash={HandTrash} handleStatus={handleStatus} />
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const ProductSaleTableRow = ({ sale, HandTrash, handleStatus }) => {
    const [product, setProduct] = useState(null);

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

    const formatDate = (date) => {
        const dateTime = LocalDateTime.parse(date);
        const formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        return dateTime.format(formatter);
    };

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
                    <button
                        onClick={() => handleStatus(sale.id, sale.status)}
                        className={sale.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}>
                        {sale.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <Link to={`/admin/product/sale-edit/${sale.id}`} className='px-1 text-primary'>
                        <FaEdit />
                    </Link>
                    <button
                        onClick={() => HandTrash(sale.id)}
                        className="btn-none px-1 text-danger">
                        <FaTrash />
                    </button>
                </div>
            </td>
            <td>
                {product ? (
                    <img src={`${urlImageProduct}/${product.image}`} className="img-fluid user-avatar" alt="Hinh anh" />
                ) : (
                    <p>Không có ảnh</p>
                )}
            </td>
            <td>{sale.priceSale}</td>
            <td>{sale.quantity}</td>
            <td>{sale.description}</td>
            <td>{formatDate(sale.dateBegin)}</td>
            <td>{formatDate(sale.dateEnd)}</td>
        </tr>
    );
};

export default ProductSaleIndex;
