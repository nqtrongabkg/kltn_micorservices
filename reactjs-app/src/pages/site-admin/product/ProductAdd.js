import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';
import TagService from '../../../services/TagService';
import BrandService from '../../../services/BrandService';
import ProductService from '../../../services/ProductService';
import UserService from '../../../services/UserService';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const ProductAdd = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [description, setDescription] = useState("");
    const [detail, setDetail] = useState("");
    const [evaluate] = useState(1);
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const sessionUser = JSON.parse(sessionStorage.getItem('user'));
                const brandResponse = await BrandService.getByUserId(sessionUser.userId);
                const filteredBrands = brandResponse.filter(brand => brand.status === 1 || brand.status >= 3);
                setBrands(filteredBrands);
    
                const categoryResponse = await CategoryService.getAll();
                const filteredCategories = categoryResponse.filter(category => category.status === 1 || category.status === 3);
                setCategories(filteredCategories);

                const tagResponse = await TagService.getAll();
                const filteredTags = tagResponse.filter(tag => tag.status === 1 || tag.status === 3);
                setTags(filteredTags);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, []);
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validation check for price
        if (price < 1000) {
            toast.error("Giá bán phải lớn hơn hoặc bằng 1000!");
            return;
        }

        const productRequest = {
            name,
            price,
            description,
            detail,
            evaluate,
            createdBy: JSON.parse(sessionStorage.getItem('user'))?.userId,
            status,
            brandId: selectedBrandId,
            categoryIds: selectedCategoryIds,
            tagIds: selectedTagIds
        };

        const path = {
            path: "products"
        };

        try {
            const result = await ProductService.create(productRequest);
            if (result) {
                if (image !== null) {
                    const imageString = await UserService.saveImage(result.id, path, image);
                    if (imageString !== null) {
                        const data = {
                            id: result.id,
                            image: imageString
                        };
                        await ProductService.setImage(data);
                    }
                }
                for (const categoryId of selectedCategoryIds) {
                    try {
                        await ProductService.addQtyToCategory(categoryId);
                    } catch (incrementError) {
                        toast.error(`Failed to increment quantity for category ID ${categoryId}`);
                    }
                }
                toast.success("Thêm thành công");
                navigate("/site-admin/product/index", { replace: true });
            }
        } catch (error) {
            toast.error("Thêm loại thất bại!");
        }
    };

    // State for selected brand, categories, and tags
    const [selectedBrandId, setSelectedBrandId] = useState("");
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        const updatedSelectedCategoryIds = [...selectedCategoryIds];
        if (updatedSelectedCategoryIds.includes(categoryId)) {
            const index = updatedSelectedCategoryIds.indexOf(categoryId);
            updatedSelectedCategoryIds.splice(index, 1);
        } else {
            updatedSelectedCategoryIds.push(categoryId);
        }
        setSelectedCategoryIds(updatedSelectedCategoryIds);
    };

    // Handle tag change
    const handleTagChange = (tagId) => {
        const updatedSelectedTagIds = [...selectedTagIds];
        if (updatedSelectedTagIds.includes(tagId)) {
            const index = updatedSelectedTagIds.indexOf(tagId);
            updatedSelectedTagIds.splice(index, 1);
        } else {
            updatedSelectedTagIds.push(tagId);
        }
        setSelectedTagIds(updatedSelectedTagIds);
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm sản phẩm</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <Button variant="success" size="sm" href="/site-admin/product/index" className="ml-2">
                                <FaSave /> Về danh sách
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Tên(*)</strong></label>
                                <input type="text" name="name" className="form-control" placeholder="Tên sản phẩm" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <input type="text" name="description" className="form-control" placeholder="Mô tả sản phẩm" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Chi tiết</strong></label>
                                <input type="text" name="detail" className="form-control" placeholder="Chi tiết sản phẩm" value={detail} onChange={e => setDetail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Giá bán</strong></label>
                                <input type="number" name="price" className="form-control" placeholder="Giá bán" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label><strong>Ảnh</strong></label>
                                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Thương hiệu</strong></label>
                                {brands && brands.length > 0 && (
                                    <select
                                        name="brand"
                                        className="form-select"
                                        onChange={(e) => setSelectedBrandId(e.target.value)}
                                        value={selectedBrandId}
                                    >
                                        <option value="">Chọn thương hiệu</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
    
                            {/* Categories */}
                            <div className="mb-3">
                                <label><strong>Danh mục</strong></label>
                                {categories && categories.length > 0 && (
                                    <div>
                                        {categories.map((category) => (
                                            <div className="form-check" key={category.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`category-${category.id}`}
                                                    value={category.id}
                                                    checked={selectedCategoryIds.includes(category.id)}
                                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
    
                            {/* Tags */}
                            <div className="mb-3">
                                <label><strong>Tags</strong></label>
                                {tags && tags.length > 0 && (
                                    <div>
                                        {tags.map((tag) => (
                                            <div className="form-check" key={tag.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`tag-${tag.id}`}
                                                    value={tag.id}
                                                    checked={selectedTagIds.includes(tag.id)}
                                                    onChange={(e) => handleTagChange(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                                                    {tag.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
    
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" className="form-select" onChange={(e) => { setStatus(e.target.value) }} value={status}>
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
export default ProductAdd;