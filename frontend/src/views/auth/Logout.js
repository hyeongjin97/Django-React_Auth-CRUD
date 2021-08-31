import {Button, Modal, ModalBody} from "reactstrap"
import React from 'react';
import {ModalFooter} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const Logout = (props) => {
    const {toggle} = props
    const history = useHistory()

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push('/')
        toggle()
    };

    return (
        <div>
            <Modal isOpen={true}>

                <ModalBody className="logout-body">
                    로그아웃 하시겠습니까?
                </ModalBody>
                <ModalFooter className="logout-footer">
                    <Button onClick={handleLogout}>확인</Button>
                    <Button onClick={toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Logout;