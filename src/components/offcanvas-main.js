import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TiThMenu } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdPin } from "react-icons/io";
import { FaStar } from "react-icons/fa";

import { getLoggedInUser } from '../data/accountsData'; // Função para obter o usuário logado
import './offcanvas-main.css';

function MenuMain() {
    const [show, setShow] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [pinsAdded, setPinsAdded] = useState(0);
    const [pinsReviewed, setPinsReviewed] = useState(0);

    // Carregar o usuário logado ao montar o componente
    useEffect(() => {
        const user = getLoggedInUser();
        if (user) {
            setLoggedInUser(user);
            // Configurar valores iniciais para pins adicionados e avaliados
            setPinsAdded(user.pinsAdded || 0);
            setPinsReviewed(user.pinsReviewed || 0);
        }

        // Verificar se há uma foto de perfil salva
        const storedPicture = localStorage.getItem('profilePicture');
        if (storedPicture) {
            setProfilePicture(storedPicture);
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Função para deslogar
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        alert('Você foi deslogado!');
        window.location.reload(); // Recarrega a página para resetar o estado
    };

    // Função para mudar a foto de perfil
    const handleProfilePictureChange = () => {
        const newPicture = prompt('Insira o URL da nova foto de perfil:');
        if (newPicture) {
            setProfilePicture(newPicture);
            localStorage.setItem('profilePicture', newPicture); // Salva no Local Storage
            alert('Foto de perfil alterada com sucesso!');
        }
    };

    // Função para o botão "Ser Moderador"
    const handleModerationRequest = () => {
        alert('Aguarde a implementação da funcionalidade de moderação. Obrigado por se voluntariar!');
    };

    return (
        <>
            <TiThMenu className="button" onClick={handleShow} size={30} />

            <Offcanvas show={show} onHide={handleClose} placement='end' className="offcanvas-show">
                <div className="offcanvas-header">
                    <div className="profile-header">
                        <img
                            src={profilePicture || require('../img/bruno-profile.png')} // Mostra a foto padrão se não houver uma personalizada
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

                {/* Botões de Configuração apenas para usuários logados */}
                {loggedInUser && (
                    <>
                        <Button className="button-menu" onClick={handleProfilePictureChange}>
                            Mudar Foto de Perfil
                        </Button>
                        <Button className="button-menu moderator-button" onClick={handleModerationRequest}>
                            Ser Moderador
                        </Button>
                        <Button className="button-menu logout-button" onClick={handleLogout}>
                            Deslogar
                        </Button>
                    </>
                )}
            </Offcanvas>
        </>
    );
}

export default MenuMain;
