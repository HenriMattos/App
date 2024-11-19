import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdPin } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';


import { getLoggedInUser } from '../data/accountsData';
import './offcanvas-main.css';

function MenuMain() {
    const [show, setShow] = useState(false);
    const [showModeratorModal, setShowModeratorModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [pinsAdded, setPinsAdded] = useState(0);
    const [pinsReviewed, setPinsReviewed] = useState(0);
    const [moderationReason, setModerationReason] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [cropper, setCropper] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        if (user) {
            setLoggedInUser(user);
            setPinsAdded(user.pinsAdded || 0);
            setPinsReviewed(user.pinsReviewed || 0);
        }

        const storedPicture = localStorage.getItem('profilePicture');
        if (storedPicture) {
            setProfilePicture(storedPicture);
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        alert('Você foi deslogado!');
        window.location.reload();
    };

    const handleProfilePictureChange = () => setShowProfileModal(true);
    const handleModerationRequest = () => setShowModeratorModal(true);

    const handleProfilePictureSubmit = () => {
        if (cropper) {
            const croppedImage = cropper.getCroppedCanvas().toDataURL();
            setProfilePicture(croppedImage);
            localStorage.setItem('profilePicture', croppedImage);
            setNewProfilePicture(null);
            setShowProfileModal(false);
            alert('Foto de perfil alterada com sucesso!');
        }
    };

    const handleModerationSubmit = () => {
        alert(`Pedido de moderação enviado:\n${moderationReason}`);
        setShowModeratorModal(false);
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setNewProfilePicture(event.target.files[0]);
        }
    };

    return (
        <>
            <IoMdSettings className="button" onClick={handleShow} size={30} />

            <Offcanvas show={show} onHide={handleClose} placement='end' className="offcanvas-show">
                <div className="offcanvas-header">
                    <div className="profile-header">
                        <img
                            src={profilePicture || require('../img/bruno-profile.png')}
                            alt="Foto de perfil"
                            className="profile-main"
                        />
                        <div className="username">
                            {loggedInUser ? loggedInUser.name : 'Admin Bruno'}
                        </div>
                    </div>
                    <button className="btn-close" onClick={handleClose} />
                </div>
                <AiOutlineLoading3Quarters className='xp-bar' />
                <div className='level'>Nv {loggedInUser ? 1 : 100}</div>

                <p className='information'>
                    <IoMdPin size={30} />
                    <div className='information-background'>
                        Pins adicionados: {loggedInUser ? pinsAdded : 100}
                    </div>
                </p>
                <p className='information'>
                    <FaStar size={30} />
                    <div className='information-background'>
                        Pins avaliados: {loggedInUser ? pinsReviewed : 100}
                    </div>
                </p>
                <p className='information'>
                    Reputação: <b className='user-status'>{loggedInUser ? 'Novo Usuário' : 'Super Confiável'}</b>
                </p>

                {loggedInUser && (
                    <>
                        <Button className="button-menu" onClick={handleProfilePictureChange}>
                            Foto de Perfil
                        </Button>
                        <Button className="button-menu moderator-button" onClick={handleModerationRequest}>
                            Fale Conosco
                        </Button>
                        <Button className="button-menu logout-button" onClick={handleLogout}>
                            Sair da Conta
                        </Button>
                    </>
                )}
            </Offcanvas>

            {/* Modal: Ser Moderador */}
            <Modal show={showModeratorModal} onHide={() => setShowModeratorModal(false)} centered>
                <div className="modal-card">
                    <div className="modal-card-header">Fale Conosco</div>
                    <div className="modal-card-body">
                        <textarea
                            rows={3}
                            value={moderationReason}
                            onChange={(e) => setModerationReason(e.target.value)}
                            placeholder="Explique aqui..."
                        />
                    </div>
                    <div className="modal-card-footer">
                        <Button variant="secondary" onClick={() => setShowModeratorModal(false)} className="button-menu">
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleModerationSubmit} className="button-menu">
                            Enviar
                        </Button>
                    </div>
                </div>
            </Modal>


            {/* Modal: Alterar Foto de Perfil */}
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
                <div className="modal-card">
                    <div className="modal-card-header">Mudar Foto de Perfil</div>
                    <div className="modal-card-body">
                        {!newProfilePicture ? (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        ) : (
                            <Cropper
                                style={{ height: 300, width: "100%" }}
                                src={URL.createObjectURL(newProfilePicture)}
                                aspectRatio={1}
                                viewMode={1}
                                guides={true}
                                cropBoxResizable={true}
                                autoCropArea={1}
                                background={false}
                                onInitialized={(instance) => setCropper(instance)}
                            />
                        )}
                    </div>
                    <div className="modal-card-footer">
                        <Button variant="secondary" onClick={() => setShowProfileModal(false)} className="button-menu">
                            Cancelar
                        </Button>
                        {newProfilePicture && cropper ? (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    const croppedImage = cropper.getCroppedCanvas().toDataURL();
                                    setProfilePicture(croppedImage);
                                    localStorage.setItem('profilePicture', croppedImage);
                                    setNewProfilePicture(null);
                                    setShowProfileModal(false);
                                    alert('Foto de perfil alterada com sucesso!');
                                }}
                                className="button-menu"
                            >
                                Confirmar
                            </Button>
                        ) : null}
                    </div>
                </div>
            </Modal>

        </>
    );
}

export default MenuMain;
