import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import {Fragment} from 'react';
const ShowProducts = () => {
    const [products, setProducts] = useState([])
    const [detailModal, setDetailModal] = useState(false)
    const [product, setProduct] = useState("")

    const [username, setUserName] = useState("")
    const [loading, setLoading] = useState(true)

    const handleDetail = (product) => {
        setDetailModal(!detailModal)
        setProduct(product)
    }

    const toggle = () => {
        setDetailModal(!detailModal)
    }

    const getProducts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/')
        setProducts(response.data)
    }
    const deleteProduct = async (id) => {

        const data = await axios.delete(`http://127.0.0.1:8000/api/${id}`)
        getProducts();
        toggle()

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
    const renderProducts = () => {
        return products.map((product, index) => (
            <Card
                className="m-2 rounded shadow-lg"
                key={index}
                style={{
                    width: '22rem'

                }}>{
                    product.image
                        ? (<Card.Img variant="top" src={product.image} height="150"/>)
                        : " "
                }
                <Card.Body>
                    <Card.Text>
                        작성자: {product.writer}
                    </Card.Text>
                    <Card.Title>상품명: {product.name}</Card.Title>
                    <Card.Text className="products-price-info">
                        가격: ${product.price}
                    </Card.Text>

                    <Card.Text>
                        카테고리: {product.category}
                    </Card.Text>
                    <Button className="btn btn-primary" onClick={() => handleDetail(product)}>자세히 보기</Button>

                </Card.Body>
            </Card>
        ))
    }
    useEffect(() => {
        getProducts();
        getUserName();
    }, [])
    const productDetail = () => {
        return <div>
            {
                detailModal
                    ? <Modal className="detail-modal" isOpen={true}>
                            <ModalHeader toggle={toggle}>
                                <h1>Product Detail</h1>

                            </ModalHeader>
                            <ModalBody>

                                <div className="single-product-info"></div>
                                <p>작성자:{product.writer}</p>
                                <p>상품명:{product.name}</p>
                                {
                                    product.image
                                        ? <img className="detail-image" src={product.image} height="200" width="300"></img>
                                        : ""
                                }
                                <p>상품가격:${product.price}</p>
                                <p>상세 설명:{product.description}</p>
                                <p>카테고리:{product.category}</p>
                            </ModalBody>
                            <ModalFooter>
                                {
                                    product.writer === username
                                        ? <Link className="btn btn-primary m-2" to={`/${product.id}/update`}>Update</Link>
                                        : ""
                                }
                                {
                                    product.writer === username
                                        ? <Link className="btn btn-danger m-2" onClick={() => deleteProduct(product.id)}>Delete</Link>
                                        : ""
                                }

                            </ModalFooter>
                        </Modal>
                    : ""
            }
        </div>
    }

    return (
        <div className="products-card-info">
            {
                loading === false
                    ? (
                        <Fragment>
                            {renderProducts()}
                            {productDetail()}
                        </Fragment>
                    )
                    : <h1>로그인 후 이용가능합니다.</h1>
            }

        </div>
    );
};

export default ShowProducts;