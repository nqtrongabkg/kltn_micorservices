import React, { useEffect, useState } from 'react';
import OrderService from '../../../services/OrderService';
import OrderItemService from '../../../services/OrderItemService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';

const OrderIndex = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const result = await OrderItemService.getAll();
                const itemsWithProduct = [];
                for (const item of result) {
                    const order = await OrderService.getById(item.orderId);
                    if (order.status !== 3) {
                        const product = await ProductService.getById(item.productId);
                        const optionValue = await ProductOptionService.getOptionValue(item.optionValueId);
                        const option = await ProductOptionService.getById(optionValue.optionId);
                        item.product = product; // Thêm thông tin sản phẩm vào mỗi item
                        item.option = option; // Thêm thông tin loại lựa chọn vào mỗi item
                        item.optionValue = optionValue; // Thêm thông tin giá trị loại lựa chọn vào mỗi item
                        itemsWithProduct.push(item);
                    }
                }
                setOrderItems(itemsWithProduct);
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        };
    
        fetchOrderItems();
    }, [reload]);    

    const HandTrash = async (id) => {
        await OrderItemService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleDislay = async (id) => {
        await OrderItemService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await OrderItemService.sitchStatus(id);
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
                <h1 className="d-inline">Quản lý đơn đặt hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/order/trash">Thùng rác</a>
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
                            <th>Sản phẩm</th>
                            <th>Ảnh</th>
                            <th>Loại lựa chọn</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems && orderItems.length > 0 &&
                            orderItems.map((item) => {
                                return (
                                    <tr key={item.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" />
                                        </td>
                                        <td>{item.product ? item.product.name : "Tên sản phẩm không tồn tại"}</td>
                                        <td>
                                            {item.product ? (
                                                <img src={urlImageProduct + item.product.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{item.option ? `${item.option.name} / ${item.optionValue.value}` : "Loại lựa chọn không tồn tại"}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.createdAt}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default OrderIndex;
