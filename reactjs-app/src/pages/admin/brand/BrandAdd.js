import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const BrandAdd = () => {

    // const sessionUserAdmin = sessionStorage.getItem('useradmin');
    // let createdBy = null;
    // if (sessionUserAdmin !== null) {
    //     const parsedUser = JSON.parse(sessionUserAdmin);
    //     createdBy = parsedUser.userId;
    // }

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const brandRequest = {
            name,
            description,
            createdBy: JSON.parse(sessionStorage.getItem('useradmin'))?.userId,
            status,
        };
    
        try {
            const response = await BrandService.create(brandRequest);
            console.log("Server response:", response);  // Check what the response structure looks like
    
            const createdBrand = response;  // Directly use the response if it contains the brand data at the top level
    
            if (createdBrand && createdBrand.id) {
                if (image) {
                    console.log("br id = ", createdBrand.id)
                    await BrandService.uploadImage(createdBrand.id, image);
                }
                toast.success("Brand successfully added!");
                navigate("/admin/brand/index", { replace: true });
            } else {
                toast.error("Failed to retrieve brand ID from server.");
            }
        } catch (error) {
            console.error("Error adding brand:", error);
            toast.error(`Failed to add brand: ${error.message}`);
        }
    };
    
    

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm thương hiệu</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/admin/brand/index" className="ml-2">
                                <FaSave /> Về danh sách
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Tên thương hiệu(*)</strong></label>
                                <input type="text" name="name" className="form-control" placeholder="Tên thương hiệu" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <input type="text" name="description" className="form-control" placeholder="Mô tả thương hiệu" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                            <div className="mb-3">
                                <label><strong>Ảnh đại diện</strong></label>
                                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
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
                    </div>
                </section>
                <section className="content-header my-2">
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <button type="submit" className="btn btn-success btn-sm mr-2" name="THEM">
                                <i className="fa fa-save"></i> Lưu [Thêm]
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}
export default BrandAdd;