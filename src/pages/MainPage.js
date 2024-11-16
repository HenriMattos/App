import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuMain from '../components/offcanvas-main.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../components/mainpage.css';
import MapboxExample from '../components/MapPage.js';

function MainPage() {

  const navigate = useNavigate();

  return (
    <div className='main-page'>
      <MenuMain />
      <Button onClick={() => navigate('/')} className='menu-main-button'>
        Voltar para a home
      </Button>
      <MapboxExample />
    </div>
  );
}

export default MainPage;