import React, { createContext, useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './siteAdmin.css';
import { FaProductHunt, FaClone, FaRegUser } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { ToastContainer } from 'react-toastify';
import UserService from '../../services/UserService';

const SiteAdminContext = createContext();

export const useSiteAdminContext = () => useContext(SiteAdminContext);

const SiteAdmin = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUserAdmin = sessionStorage.getItem('user');
        if (sessionUserAdmin !== null) {
            try {
                const parsedUser = JSON.parse(sessionUserAdmin);
                if (parsedUser && typeof parsedUser === 'object') {
                    UserService.getUserById(parsedUser.userId)
                        .then(userGet => {
                            if (userGet.role.role === 2) {
                                setUser(userGet);
                            } else {
                                setUser(null);
                                navigate("/");
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching user:', error);
                        });
                } else {
                    console.error('Stored user is not a valid JSON object.');
                }
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate("/");
    };

    function handleItemClick(item) {
        const hdlitem = document.getElementById(item);
        hdlitem.classList.toggle("active");
    };

    return (
        <>
            <ToastContainer />
            <SiteAdminContext.Provider value={{ user, logout }}>
                <section className="hdl-header sticky-top">
                    <div className="container-fluid">
                        <ul className="menutop">
                            <li>
                                <a href="#nqt">
                                    <FaClone />
                                    E COMMERCE
                                </a>
                            </li>
                            <li className="text-phai">
                                <a href="/">
                                    <MdExitToApp />
                                    Thoát
                                </a>
                            </li>
                            <li className="text-phai">
                                <a href="#nqt">
                                    <FaRegUser />
                                    Chào quản lý
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="hdl-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 bg-dark p-0 hdl-left">
                                <div className="hdl-left">
                                    <div className="dashboard-name">
                                        Bản điều khiển
                                    </div>
                                    <nav className="m-2 mainmenu">
                                        <ul className="main">
                                            <li className="hdlitem item-sub" id="item1" onClick={() => handleItemClick('item1')}>
                                                <FaProductHunt className="icon-left" />
                                                <a href="#nqt">Sản phẩm</a>
                                                <i className="fa-solid fa-plus icon-right"></i>
                                                <ul className="submenu">
                                                    <li>
                                                        <a href="/site-admin/product/index" className="margin-left-submenu">Tất cả sản phẩm</a>
                                                    </li>
                                                    <li>
                                                        <a href="/site-admin/product/store/index" className="margin-left-submenu">Kho hàng</a>
                                                    </li>
                                                    <li>
                                                        <a href="/site-admin/brand/index" className="margin-left-submenu">Thương hiệu</a>
                                                    </li>
                                                    <li>
                                                        <a href="/site-admin/product/sale-index" className="margin-left-submenu">Khuyễn mãi</a>
                                                    </li>
                                                    <li>
                                                        <a href="/site-admin/product/option-index" className="margin-left-submenu">Lựa chọn sản phẩm</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            
                                            <li className="hdlitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
                                                <SiSellfy className="icon-left" />
                                                {/* <i className="fa-brands fa-product-hunt icon-left"></i> */}
                                                <a href="#nqt">Quản lý bán hàng</a>
                                                <i className="fa-solid fa-plus icon-right"></i>
                                                <ul className="submenu">
                                                    <li>
                                                        <a href="/site-admin/order-item/index">Tất cả đơn hàng</a>
                                                    </li>
                                                    <li>
                                                        <a href="/site-admin/order/export">Xuất hàng</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="content">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </SiteAdminContext.Provider>
        </>
    );

};
export default SiteAdmin;