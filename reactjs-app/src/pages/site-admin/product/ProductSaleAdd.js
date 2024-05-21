import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService";
import ProductService from "../../../services/ProductService";
import { toast } from 'react-toastify';
import { LocalDate } from 'js-joda';

const ProductSaleAdd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [priceSale, setPriceSale] = useState(1);
    const [quantity, setQty] = useState(1);
    const [dateBegin, setBegin] = useState("");
    const [dateEnd, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ProductService.getById(id);
                if(result){
                    setPriceSale(result.price);
                }
            } catch (error) {
                console.error('Error fetching product sale:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert date strings to LocalDate objects
        const formattedBegin = LocalDate.parse(dateBegin);
        const formattedEnd = LocalDate.parse(dateEnd);
        const today = LocalDate.now();

        // Validation checks
        if (today.isAfter(formattedBegin) || !formattedBegin.isBefore(formattedEnd) || quantity <= 0 || priceSale < 1000) {
            toast.error("Vui lòng kiểm tra lại thông tin về thời gian.");
            return;
        }

        const begin = formattedBegin.atStartOfDay();
        const end = formattedEnd.atStartOfDay();
        const productSale = {
            productId: id,
            quantity,
            priceSale,
            description,
            dateBegin: begin,
            dateEnd: end,
            createdBy: JSON.parse(sessionStorage.getItem('user'))?.userId,
            status,
        };

        (async function () {
            console.log("Sale : ", productSale);

            const result = await ProductSaleService.create(productSale);
            if (result !== null) {
                toast.success("Tạo giảm giá thành công");
                navigate('/site-admin/product/index', { replace: true });
            }
        })();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Tạo giảm giá sản phẩm</h1>
                    <div className="mt-1 text-end">
                        <Link to="/site-admin/product/index" className="btn btn-sm btn-info mx-1">
                            <FaArrowLeft /> Về danh sách
                        </Link>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label><strong>Giá giảm (*)</strong></label>
                                <input type="number"
                                    value={priceSale}
                                    onChange={(e) => setPriceSale(e.target.value)}
                                    placeholder="Nhập giá giảm" className="form-control" min="1000" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Số lượng sản phẩm giảm (*)</strong></label>
                                <input type="number" value={quantity}
                                    onChange={(e) => setQty(e.target.value)}
                                    placeholder="Nhập số lượng" className="form-control" min="1" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <input type="text" name="description" className="form-control" placeholder="Mô tả" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Ngày bắt đầu</strong></label>
                                <input type="date"
                                    value={dateBegin}
                                    onChange={(e) => setBegin(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Ngày kết thúc</strong></label>
                                <input type="date"
                                    value={dateEnd}
                                    onChange={(e) => setEnd(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" className="form-select" onChange={(e) => { setStatus(e.target.value) }}
                                    value={status}>
                                    <option value="1">Hoạt động</option>
                                    <option value="2">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-footer text-end px-2 py-2">
                                <button type="submit" className="btn btn-sm btn-success" name="THEM">
                                    <FaSave /> Lưu[Thêm]
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}

export default ProductSaleAdd;
