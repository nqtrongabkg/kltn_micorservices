import React, { useEffect, useState } from 'react';
import OrderService from '../../../services/OrderService';
import OrderItemService from '../../../services/OrderItemService';
import ProductService from '../../../services/ProductService';
import ProductOptionService from '../../../services/ProductOptionService';
import { FaToggleOn, FaTrash, FaToggleOff, FaCheckSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';
import ProductStoreService from '../../../services/ProductStoreService';
import NotificationService from '../../../services/NotificationService';
import Pagination from '../../site/homeComponents/productComponents/Pagination';

const OrderItemIndex = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [reload, setReload] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10; // Define the number of items per page

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const sessionUser = JSON.parse(sessionStorage.getItem('user'));
                const result = await OrderItemService.getAll();
                const itemsWithProduct = [];
                for (const item of result) {
                    const order = await OrderService.getById(item.orderId);
                    if (order.status !== 3 && order.status !== 2) { // status of order === 3 => cart
                        const product = await ProductService.getById(item.productId);
                        if (product.createdBy === sessionUser.userId) {
                            const optionValue = await ProductOptionService.getOptionValue(item.optionValueId);
                            const option = await ProductOptionService.getById(optionValue.optionId);
                            item.order = order;
                            item.product = product;
                            item.option = option;
                            item.optionValue = optionValue;
                            itemsWithProduct.push(item);
                        }
                    }
                }
                const itemsWithProductFill = itemsWithProduct.filter(item => item.status !== 2);
                const sorted = itemsWithProductFill.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                // Calculate pagination
                const totalItems = sorted.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                setTotalPages(totalPages);
                const paginatedItems = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                
                setOrderItems(paginatedItems);
            } catch (error) {
                console.error("Error fetching order items:", error);
            }
        };

        fetchOrderItems();
    }, [reload, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const HandTrash = async (id) => {
        await OrderItemService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handExport = async (item) => {
        try {
            await OrderItemService.export(item.id);

            const dataExport = {
                orderItemId: item.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.totalPrice,
                description: item.option.name + "/" + item.optionValue.value,
                createdBy: JSON.parse(sessionStorage.getItem('user'))?.userId
            };

            const exportAdd = await ProductStoreService.export(dataExport);

            if (exportAdd !== null) {
                const formattedDate = formatDateToLocalDate(exportAdd.createdAt);

                const dataNotification = {
                    user: {
                        id: item.order.userId,
                    },
                    description: `Thông báo cho đơn hàng có mã ${item.id}`,
                    detail: `Đơn hàng ${item.product.name} của bạn đã được xác nhận lúc ${formattedDate} và sẽ sớm được vận chuyển`,
                    statusOfSee: 0,
                    linkTo: `/order-item-detail/${item.id}`,
                    status: 1
                };
                await NotificationService.create(dataNotification);
                setReload(Date.now());
                toast.success("Xác nhận đơn hàng");
            }
        } catch (error) {
            console.error("Error export:", error);
        }
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

    const getRowClassName = (status) => {
        if (status < 3) {
            return "table-info";
        }
        return "";
    };

    function formatDateToLocalDate(datetimeString) {
        const date = new Date(datetimeString);

        // Get components of the date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Construct the formatted date string
        return `${hours}:${minutes}-${month}/${day}/${year}`;
    }

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý đơn đặt hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/site-admin/order-item/trash">Thùng rác</a>
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
                            <th>Người nhận</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems && orderItems.length > 0 &&
                            orderItems.map((item) => {
                                return (
                                    <tr key={item.id} className={`datarow ${getRowClassName(item.status)}`}>
                                        <td className="text-center">
                                            <input type="checkbox" />
                                        </td>
                                        <td>
                                            <div className='name'>
                                                {item.product ? item.product.name : "Tên sản phẩm không tồn tại"}
                                            </div>
                                            <div className="function_style">
                                                <button
                                                    onClick={() => handleStatus(item.id, item.status)}
                                                    className={
                                                        item.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                    }>
                                                    {item.status === 0 ? <FaToggleOff size={24} /> : <FaToggleOn size={24} />}
                                                </button>
                                                <button
                                                    onClick={() => HandTrash(item.id)}
                                                    className="btn-none px-1 text-danger">
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handExport(item)}
                                                    className="btn-none px-1 text-danger">
                                                    <FaCheckSquare size={24} />
                                                </button>
                                            </div>
                                        </td>
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
                                        <td>{formatDateToLocalDate(item.createdAt)}</td>
                                        <td>{item.order.deliveryName}</td>
                                        <td>{item.order.deliveryPhone}</td>
                                        <td>{item.order.deliveryAddress}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>
        </div>
    );
};

export default OrderItemIndex;
