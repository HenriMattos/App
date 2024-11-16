import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TiThMenu } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdPin } from "react-icons/io";
import { FaStar } from "react-icons/fa";

import './offcanvas-main.css';

function MenuMain() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <TiThMenu className="button" onClick={handleShow} size={30} />

            <Offcanvas show={show} onHide={handleClose} placement='end' className="offcanvas-show">
                <div className="offcanvas-header">
                    <div className="profile-header">
                        <img src={require('../img/bruno-profile.png')} alt="Foto de perfil" className="profile-main" />
                        <div className="username">Bruno da Silva</div>
                    </div>
                    <button className="btn-close" onClick={handleClose} />
                </div>
                <Offcanvas.Body>
                    <AiOutlineLoading3Quarters className='xp-bar' />
                    <div className='level'>Nv 10</div>

                    <p className='information'>
                        <IoMdPin size={30} /> 
                        <div className='information-background'>Pins adicionados: 13</div>
                    </p>
                    <p className='information'>
                        <FaStar size={30} /> 
                        <div className='information-background'>Pins avaliados: 22</div>
                    </p>
                    <p className='information'>
                        Reputação: <b className='user-status'>Confiável</b>
                    </p>

                    <Button className="button-menu">Configurações</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MenuMain;
