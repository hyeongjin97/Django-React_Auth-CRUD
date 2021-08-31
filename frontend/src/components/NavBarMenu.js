import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button,Navbar} from 'react-bootstrap'
import {NavLink,} from 'react-router-dom';

import Logout from '../views/auth/Logout';
const NavBarMenu = () => {
    const [logoutModal, setlogoutModal] = useState(false)
    const [username,setUserName] = useState("")

    const handleLogoutModal = () => {
        setlogoutModal(!logoutModal)
    }

    const toggle = () => {
        setlogoutModal(!logoutModal)
    }

    const getUserName = async() =>{
        await axios({
            method: 'get',
            url:'http://127.0.0.1:8000/api/v1/users/auth/user/',
            headers:{Authorization: `Token ${localStorage.getItem('token')}`}
        }).then(res=>{
            setUserName(res.data.username);
            
        })
    }
    useEffect(() => {
        getUserName();
    }, [])

    return (
        <div>
            <Navbar bg="light" expand="lg">
                
                    {
                        localStorage.getItem('token')
                            ? <NavLink className="show-products-nav" to="/showProducts">Products</NavLink>
                            : ""
                    }
                    {
                        localStorage.getItem('token')
                            ? <NavLink className="add-product-nav" to="/addProduct">Add Products</NavLink>
                            : ""
                    }
                     {
                        localStorage.getItem('token')
                            ? <NavLink className="myposts-nav" to="/myPosts">My Products</NavLink>
                            : ""
                    }
                    {
                        localStorage.getItem('token')
                            ?
                                <h6 className="welcome-user">반갑습니다 {username}님</h6>
                            :""
                    }
                    {
                        localStorage.getItem('token')
                            ? 
                                
                                <Button
                                    className="logout-btn"
                                    variant="danger"
                                    size="sm"
                                    onClick={handleLogoutModal}>Logout</Button>
                                    
                            : ""
                    }
                    {
                        localStorage.getItem('token')
                            ? ""
                            : <NavLink className="add-product-nav" to="/">Login</NavLink>
                    }
                    {
                        localStorage.getItem('token')
                            ? ""
                            : <NavLink className="add-product-nav" to="/signup">Sign-Up</NavLink>
                    }
                   
                    

                
            </Navbar>
            {
                logoutModal
                    ? <Logout toggle={toggle}></Logout>
                    : ""
            }
        </div>
    );
};

export default NavBarMenu;