import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallaryService from '../../../services/ProductGallaryService';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave, FaTrash } from 'react-icons/fa';
import { urlImageProductGallary } from '../../../config';

const ProductGallaryIndex = () => {
    const { id } = useParams();

    const [gallaries, setGallaries] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ProductGallaryService.getByProductId(id);
                if (result !== null) {
                    console.log("gallaries get: ", result);
                }
                setGallaries(result);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const gallaryRequest = {
            productId: id,
        };

        const path = {
            path: "product-gallaries"
        };

        try {
            const result = await ProductGallaryService.create(gallaryRequest);
            console.log("gallary added: ", result);
            if (result) {
                if (image !== null) {
                    const imageString = await UserService.saveImage(result.id, path, image);
                    if (imageString !== null) {
                        const data = {
                            id: result.id,
                            image: imageString
                        };
                        console.log("string image:", data);
                        await ProductGallaryService.setImage(data);
                    }
                }
                toast.success("Thêm thành công");
                // Refresh the list after adding new image
                const updatedGallaries = await ProductGallaryService.getByProductId(id);
                setGallaries(updatedGallaries);
                // Reset image to null after successful submission
                setImage(null);
            }
        } catch (error) {
            toast.error("Thêm loại thất bại!");
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRemoveImage = async (gallaryId) => {
        try {
            const result = await ProductGallaryService.delete(gallaryId);
            if(result.image){
                const deleteImage = {
                    path: "product-gallaries",
                    filename: result.image
                };
                await UserService.deleteImage(deleteImage)
            }
            toast.success("Xóa hình ảnh thành công");
            // Refresh the list after deleting an image
            const updatedGallaries = await ProductGallaryService.getByProductId(id);
            setGallaries(updatedGallaries);
        } catch (error) {
            toast.error("Xóa hình ảnh thất bại");
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Quản lý danh sách ảnh sản phẩm</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/admin/product/index" className="ml-2">
                                <FaSave /> Về danh sách sản phẩm
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                {gallaries.map(gallary => (
                                    <div className="row" key={gallary.id}>
                                        <div className='col-md-8 mb-5'>
                                            <img src={urlImageProductGallary + gallary.image} alt="product" style={{ width: '300px', height: '300px' }} />
                                        </div>
                                        <div className='col-md-4 d-flex align-items-center'>
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveImage(gallary.id)}>
                                                <FaTrash /> Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div>
                            <input type="file" onChange={handleImageChange} accept="image/*" />
                            <Button type="submit" variant="success" size="sm" disabled={!image}>
                                <FaSave /> Lưu [Thêm]
                            </Button>
                        </div>
                            </div>
                        </div>
                        

                    </div>
                </section>
            </div>
        </form>
    );
}

export default ProductGallaryIndex;
