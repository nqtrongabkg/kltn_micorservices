import React, { useEffect, useState } from 'react';
import BannerService from '../../../services/BannerService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageBanner } from '../../../config';

const BannerIndex = () => {
    const [banners, setBanners] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await BannerService.getAll();
                // Filter out users with status 2
                result = result.filter(user => user.status !== 2);
                // Sort users by createdAt in descending order
                const sortedData = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBanners(sortedData);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchData();
    }, [reload]);

    const HandTrash = async (id) => {
        await BannerService.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await BannerService.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };
    const handleDislay = async (id) => {
        await BannerService.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Danh sách banner</h1>
                <Link to="/admin/banner/add" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/banner/trash">Thùng rác</a>
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
                            <th>Ảnh</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>Trưng bày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners && banners.length > 0 &&
                            banners.map((banner, index) => {
                                return (
                                    <tr key={banner.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a href="menu_index.html">
                                                    {banner.name}
                                                </a>
                                            </div>
                                            <div className="function_style">
                                                    <button
                                                        onClick={() => handleStatus(banner.id, banner.status)}
                                                        className={
                                                            banner.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                        }>
                                                        {banner.status === 1 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                                    </button>
                                                    <Link to={"/admin/banner/edit/" + banner.id} className='px-1 text-primary'>
                                                        <FaEdit size={20}/>
                                                    </Link>
                                                    <button
                                                        onClick={() => HandTrash(banner.id)}
                                                        className="btn-none px-1 text-danger">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                        </td>
                                        <td>
                                            {banner.image ? (
                                                <img src={urlImageBanner + banner.image} className="img-fluid user-avatar" alt="HinhAnh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{banner.description}</td>
                                        <td>{banner.createdAt}</td>
                                        <td>
                                        <button
                                                        onClick={() => handleDislay(banner.id)}
                                                        className={
                                                            banner.status === 3 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                        }>
                                                        {banner.status === 3 ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                                    </button>
                                        </td>
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

export default BannerIndex;
