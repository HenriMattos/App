import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import { IoMdSettings } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";  
import { getLoggedInUser } from '../data/accountsData';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // Ensure this line is also present
import './offcanvas-main.css';

function MenuMain() {
    const [show, setShow] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userName, setUserName] = useState('');
    const [pinsAdded, setPinsAdded] = useState(0);
    const [newUserName, setNewUserName] = useState('');
    const [cropper, setCropper] = useState(null);

    // Função para gerar o ID do usuário conforme as regras fornecidas
    const generateUserID = (name) => {
        const firstThreeLettersReversed = name.substring(0, 3).split('').reverse().join('');
        const currentDate = new Date();
        const day = currentDate.getDate();  // Pega o número do dia
        const hour = currentDate.getHours();  // Pega a hora (sem minutos ou segundos)
        
        // Concatenando as partes para gerar o ID
        return `@user_${firstThreeLettersReversed}${day}${hour}`;
    };

    const getLevel = (pins) => {
        let level = 1;
        let requiredPins = 1;
        while (pins >= requiredPins) {
            level++;
            pins -= requiredPins;
            requiredPins = level * level;
        }
        return level;
    };

    const getBadge = (level) => {
        const badges = ['bronze', 'prata', 'ouro', 'saphira', 'esmeralda', 'ruby', 'diamante', 'mistico'];
        const index = Math.floor(level / 10);
        return badges[index] || 'Lendário';
    };

    const badgeIcons = {
        bronze: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.1)" />,  
        prata: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.2)" />,
        ouro: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.2)" />,
        saphira: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.4)" />,
        esmeralda: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.6)" />,
        ruby: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.7)" />,
        diamante: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.8)" />,
        mistico: <BsFillStarFill size={30} color="rgba(0, 123, 255, 0.9)" />,
        lendario: <BsFillStarFill size={30} color="rgba(0, 123, 255, 1)" />
    };

    useEffect(() => {
        const user = getLoggedInUser();
        if (user) {
            setLoggedInUser(user);
            setPinsAdded(user.pinsAdded || 0);
            setUserName(user.name || 'Usuário');
        }

        const storedPicture = localStorage.getItem('profilePicture');
        if (storedPicture) {
            setProfilePicture(storedPicture);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser && loggedInUser.name) {
            const generatedUserID = generateUserID(loggedInUser.name);
            setLoggedInUser((prevUser) => ({
                ...prevUser,
                id: generatedUserID
            }));
        }
    }, [loggedInUser]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        alert('Você foi deslogado!');
        window.location.reload();
    };

    const handleProfileModal = () => setShowProfileModal(true);

    const handleBackToMenu = () => {
        setShow(false);  // Fecha o menu de configurações (offcanvas)
    };

    const handleProfileSubmit = () => {
        const croppedImage = cropper?.getCroppedCanvas()?.toDataURL();
        if (newUserName.trim()) setUserName(newUserName);
        if (croppedImage) {
            setProfilePicture(croppedImage);
            localStorage.setItem('profilePicture', croppedImage);
        }
        setNewUserName('');
        setShowProfileModal(false);
        alert('Conta atualizada com sucesso!');
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setNewProfilePicture(event.target.files[0]);
        }
    };

    const userLevel = getLevel(pinsAdded);
    const userBadge = getBadge(userLevel);

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
                        <div className="username">{userName}</div>
                        <div className="user-id" style={{ color: '#6c757d', fontSize: '14px' }}>
                            ID: {loggedInUser ? loggedInUser.id : '0000'}
                        </div>
                    </div>
                </div>
                <AiOutlineLoading3Quarters className='xp-bar' />
                <div className='level'>Nv {userLevel}</div>

                <div className='badge-container' style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '5px', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: '5px', 
                    }}>
                    {Object.keys(badgeIcons).map((badge, index) => (
                        <div
                            key={index}
                            style={{
                                width: '50px',
                                height: '50px',
                                marginBottom: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '5px',
                                backgroundColor: badge === userBadge ? 'transparent' : '#ebf1f7',
                                border: '1px solid #ccc',
                            }}
                        >
                            {badgeIcons[badge]}
                        </div>
                    ))}
                </div>

                <p className='information'>
                    <div className='information-background'>
                        Insígnia atual: <b>{userBadge}</b>
                    </div>
                </p>

                <p className='information'>
                    <div className='information-background'>
                        Pins adicionados: {pinsAdded}
                    </div>
                </p>

                {loggedInUser && (
                    <>
                        <Button className="button-menu" onClick={handleProfileModal}>
                            Editar Conta
                        </Button>
                        <Button className="button-menu logout-button" onClick={handleLogout}>
                            Sair da Conta
                        </Button>
                        <Button className="button-menu back-button" onClick={handleBackToMenu}>
                            <i className="fa fa-arrow-left"></i> Voltar
                        </Button>
                    </>
                )}
            </Offcanvas>

            {/* Modal: Editar Conta */}
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
                <div className="modal-card">
                    <div className="modal-card-header">Editar Conta</div>
                    <div className="modal-card-body">
                        <input
                            type="text"
                            placeholder="Novo Nome de Usuário"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                        {!newProfilePicture ? (
                            <input type="file" accept="image/*" onChange={handleFileChange} />
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
                        <Button
                            variant="primary"
                            onClick={handleProfileSubmit}
                            className="button-menu"
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default MenuMain;
