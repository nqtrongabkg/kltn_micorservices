import React, { useEffect, useState } from 'react';
import Sliderervice from '../../../services/SliderService';
import { FaToggleOn, FaTrash, FaEdit, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { urlImageSlider } from '../../../config';

const SliderIndex = () => {
    const [sliders, setSliders] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await Sliderervice.getAll();
                // Filter out users with status 2
                result = result.filter(user => user.status !== 2);
                // Sort users by createdAt in descending order
                const sortedUsers = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSliders(sortedUsers);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchData();
    }, [reload]);

    const HandTrash = async (id) => {
        await Sliderervice.trash(id);
        setReload(Date.now());
        toast.success("Chuyển vào thùng rác");
    };

    const handleStatus = async (id, currentStatus) => {
        try {
            await Sliderervice.sitchStatus(id);
            setReload(Date.now());
            toast.success("Thành công");
        } catch (error) {
            console.error('Error switching status:', error);
            toast.error("Đã xảy ra lỗi khi thay đổi trạng thái.");
        }
    };
    const handleDislay = async (id) => {
        await Sliderervice.display(id);
        setReload(Date.now());
        toast.success("Đã chuyển đổi trưng bày");
    };
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Danh sách người dùng</h1>
                <Link to="/admin/slider/add" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning">
                            <a href="/admin/slider/trash">Thùng rác</a>
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
                        {sliders && sliders.length > 0 &&
                            sliders.map((slider, index) => {
                                return (
                                    <tr key={slider.id} className="datarow">
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${index}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a href="menu_index.html">
                                                    {slider.name}
                                                </a>
                                            </div>
                                            <div className="function_style">
                                                <button
                                                    onClick={() => handleStatus(slider.id, slider.status)}
                                                    className={
                                                        slider.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                    }>
                                                    {slider.status === 1 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                                </button>
                                                <Link to={"/admin/slider/edit/" + slider.id} className='px-1 text-primary'>
                                                    <FaEdit size={20} />
                                                </Link>
                                                <button
                                                    onClick={() => HandTrash(slider.id)}
                                                    className="btn-none px-1 text-danger">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {slider.image ? (
                                                <img src={urlImageSlider + slider.image} className="img-fluid user-avatar" alt="HinhAnh" />
                                            ) : (
                                                <p>Không có ảnh</p>
                                            )}
                                        </td>
                                        <td>{slider.description}</td>
                                        <td>{slider.createdAt}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDislay(slider.id)}
                                                className={
                                                    slider.status === 3 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                                                }>
                                                {slider.status === 3 ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
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

export default SliderIndex;
