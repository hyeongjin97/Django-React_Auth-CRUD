import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Fragment} from 'react';
import {useHistory} from 'react-router-dom';

const AddProduct = () => {
    const [image, setImage] = useState("")
    const [imgBase64, setImgBase64] = useState("")
    const [writer, setWriter] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")

    const [username, setUserName] = useState("")
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    const handleChangeFile = (event) => {
        console.log(event.target.files)
        setImage(event.target.files);
        setImgBase64([]);
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64)
                    if (base64) {
                        var base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [
                            ...imgBase64,
                            base64Sub
                        ]);
                    }
                }
            }
        }

    }
    const AddProductInfo = async (e) => {
        let formField = new FormData()
        Object
            .values(image)
            .forEach((file => formField.append("image", file)))
        formField.append('writer', username)
        if (name) {
            formField.append('name', name)
        } else {
            alert('상품명을 입력해주세요')
            return false
        }
        if (price) {
            formField.append('price', price)
            
        } else {
            alert('상품 가격을 입력해주세요')
            return false
        }
        if (description) {
            formField.append('description', description)
            
        }else{
            alert('상품 상세 설명을 입력해주세요')
            return false
        }

        formField.append('category', category)

        await axios(
            {method: 'post', url: 'http://127.0.0.1:8000/api/', data: formField}
        ).then((response) => {

            console.log(response.data);
            history.push('/showProducts')
        })

    }
    const getUserName = async () => {
        await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/v1/users/auth/user/',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setUserName(res.data.username);

            setLoading(false)
        })
    }
    useEffect(() => {
        getUserName();
    }, [])

    return (
        <div>
            {
                loading === false
                    ? (
                        <Fragment>
                            <h1>Add Product</h1>
                            <div className="container">
                                <div className="form-group">

                                    <div className="form-group">

                                        {
                                            imgBase64
                                                ? imgBase64.map((item) => {

                                                    return (
                                                        <img className="upload-image-previw" src={item}></img>
                                                    )
                                                })
                                                : ""
                                        }

                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Product Name"
                                            src={image}
                                            name="image"
                                            onChange={handleChangeFile}/>

                                    </div>
                                    <div></div>
                                    <div className="form-group">
                                        <label className="add-label">작성자</label>
                                        <br/>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="writer"
                                            value={username}
                                            onChange={() => setWriter(username)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="add-label">상품명</label>
                                        <br/>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Product Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="add-label">상품가격</label>
                                        <br/>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Product Price"
                                            name="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="add-label">상품 상세 내용</label>
                                        <br/>
                                        <textarea
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Product Description"
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="add-label">카테고리</label>
                                        <br/>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter Product Category"
                                            name="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}/>
                                    </div>
                                    <button className="btn btn-success" onClick={AddProductInfo}>Add Product</button>
                                </div>

                            </div>
                        </Fragment>
                    )
                    : <h1>로그인 후 이용 가능합니다</h1>
            }
        </div>
    );
};

export default AddProduct;