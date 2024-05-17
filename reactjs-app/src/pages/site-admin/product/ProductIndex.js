import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import BrandService from '../../../services/BrandService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff, FaTag, FaHandLizard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageProduct } from '../../../config';
import { MdOutlineCollections } from "react-icons/md";

const ProductIndex = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(0);
    const [brandNames, setBrandNames] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const sessionUser = JSON.parse(sessionStorage.getItem('user'));
                let result = await ProductService.getByUser(sessionUser.userId);
                result = result.filter(product => product.status !== 2);
                const sortedProducts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchProducts();
    }, [reload]);

    useEffect(() => {
        const fetchBrandNames = async () => {
            const names = {};
            for (const product of products) {
                try {
                    if(product.brandId !== null){
                        const brand = await BrandService.getById(product.brandId);
                        names[product.brandId] = brand !== null ? brand.name : "N/A";
                    }else{
                        names[product.brandId] = "N/A";
                    } 
                } catch (error) {
                    console.error("Error fetching brand:", error);
                    names[product.brandId] = "N/A";
                }
            }
            setBrandNames(names);
        };
        fetchBrandNames();
    }, [products]);

    const HandTrash = async (id) => {
        await ProductService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await ProductService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };

    function formatDateToLocalDate(datetimeString) {
        const date = new Date(datetimeString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }
    

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý sản phẩm</h1>
                <Link to="/site-admin/product/add" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/site-admin/product/trash">Thùng rác</a>
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
                            <th>Tên</th>
                            <th>Thương hiệu</th>
                            <th>Ảnh</th>
                            <th>Mô tả</th>
                            <th>Đánh giá</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 &&
                            products.map((product, index) => {
                                return (
                                    <tr key={product.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a href="menu_index.html">
                                                    {product.name}
                                                </a>
                                            </div>
                                            <div className="function_style">
                                                    <button
                                                        onClick={() => handleStatus(product.id, product.status)}
                                                        className={
                                                            product.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                        }>
                                                        {product.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                                    </button>
                                                    <Link to={"/site-admin/product/edit/" + product.id} className='px-1 text-primary'>
                                                        <FaEdit size={23}/>
                                                    </Link>
                                                    <Link to={'/site-admin/product/sale-add/' + product.id} className="px-1 text-info">
                                                        <FaTag size={23}/>
                                                    </Link>
                                                    <Link to={'/site-admin/product/option-add/' + product.id} className="px-1">
                                                        <FaHandLizard size={24}/>
                                                    </Link>
                                                    <Link to={'/site-admin/product/gallary-index/' + product.id} className="px-1">
                                                        <MdOutlineCollections size={24}/>
                                                    </Link>
                                                    
                                                    <button
                                                        onClick={() => HandTrash(product.id)}
                                                        className="btn-none px-1 text-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                        </td>
                                        <td>{brandNames[product.brandId]}</td>
                                        <td>
                                            {product.image ? (
                                                <img src={urlImageProduct + product.image} className="img-fluid user-avatar" alt="Hinh anh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{product.description}</td>
                                        <td>{product.evaluate}</td>
                                        <td>{formatDateToLocalDate(product.createdAt)}</td>
                                        
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

export default ProductIndex;
