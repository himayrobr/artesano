import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/Perfil.css';
import Edit from '../storage/img/Group 17.svg';
import SearchBar from './SearchBar';
import Swal from 'sweetalert2';
import Footer from './Footer';

// Importar imágenes del header y footer
import menuImg from '../storage/img/menu.svg';
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';
import BaseProfileImg from '../storage/img/R.png';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    phone: false,
    address: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        console.log('A. userData en localStorage:', userDataString);
        
        const userData = JSON.parse(userDataString);
        console.log('B. userData parseado:', userData);

        if (!userData?.userId) {
          console.log('C. No hay userId en userData');
          navigate('/login');
          return;
        }

        const url = `${endpoints.getUserById}/${userData.userId}`;
        console.log('D. URL para obtener usuario:', url);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('E. Respuesta del servidor:', response);
        
        const data = await response.json();
        console.log('F. Datos del usuario recibidos:', data);
        
        if (response.ok) {
          setUser(data.usuario);
          console.log('G. Usuario establecido en el estado:', data.usuario);
        } else {
          throw new Error(data.mensaje || 'Error al cargar datos');
        }
      } catch (error) {
        console.error('H. Error completo:', error);
        console.error('I. Stack del error:', error.stack);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos del usuario'
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleUpdate = async (field) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const fieldMapping = {
        username: 'nombre',
        email: 'email',
        phone: 'telefono',
        address: 'direccion',
        photo: 'fotoPerfil'
      };

      const updateData = {
        [fieldMapping[field]]: user[field]
      };

      const response = await fetch(`${endpoints.updateUser}/${userData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.usuario);
        
        if (field === 'username') {
          const updatedUserData = {
            ...userData,
            username: data.usuario.nombre
          };
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Datos actualizados!",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });

        setEditMode(prev => ({ ...prev, [field]: false }));
      } else {
        throw new Error(data.mensaje || 'Error al actualizar');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar los datos'
      });
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handlePhotoUpload(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, sube solo imágenes'
      });
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoUpload = async (file) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const formData = new FormData();
      formData.append('fotoPerfil', file);

      console.log('Subiendo foto para usuario:', userData.userId);

      const response = await fetch(`${endpoints.updateUser}/${userData.userId}/photo`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        body: formData
      });

      console.log('Respuesta del servidor:', response);
      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (response.ok) {
        setUser(prev => ({
          ...prev,
          photo: data.usuario.photo
        }));

        const updatedUserData = {
          ...userData,
          userPhoto: data.usuario.photo
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Foto actualizada!",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      } else {
        throw new Error(data.mensaje || 'Error al actualizar la foto');
      }
    } catch (error) {
      console.error('Error completo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la foto'
      });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate('/', { replace: true });
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No se encontraron datos del usuario</div>;

  return (
    <div>
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
            <img src={menuImg} id='checkbox' alt="Menú" onClick={toggleMenu}/>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Contenido principal del perfil */}
      <main className="main-perfil">
        <div className="profile-container">
          <div className="profile-header">
            <div 
              className={`profile-photo-container ${isDragging ? 'dragging' : ''}`}
              ref={dropZoneRef}
              onClick={handlePhotoClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <img 
                src={user?.photo || '/src/storage/img/R.png'} 
                alt="Foto de perfil" 
                className="profile-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/src/storage/img/R.png';
                }}
              />
              <div className="photo-overlay">
                <span>{isDragging ? 'Suelta la imagen' : 'Arrastra una foto o haz clic'}</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handlePhotoUpload(e.target.files[0])}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="profile-info">
            {/* Username */}
            <div className="profile-field">
              <label>Nombre de usuario:</label>
              <input
                type="text"
                value={user?.username || ''}
                disabled={!editMode.username}
                onChange={(e) => setUser(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
              />
              <button 
                onClick={() => {
                  if (editMode.username) {
                    handleUpdate('username');
                  }
                  setEditMode(prev => ({ ...prev, username: !editMode.username }));
                }}
              >
                <img src={Edit} className="Editar" />
              </button>
            </div>

            {/* Email */}
            <div className="profile-field">
              <label>Email:</label>
              <input
                type="email"
                value={user.email || ''}
                disabled={!editMode.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
              <button 
                onClick={() => {
                  if (editMode.email) {
                    handleUpdate('email');
                  }
                  setEditMode({...editMode, email: !editMode.email});
                }}
              >
                <img src={Edit} className="Editar" />
              </button>
            </div>

            {/* Teléfono */}
            <div className="profile-field">
              <label>Teléfono:</label>
              <input
                type="tel"
                value={user.phone || ''}
                disabled={!editMode.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
              />
              <button 
                onClick={() => {
                  if (editMode.phone) {
                    handleUpdate('phone');
                  }
                  setEditMode({...editMode, phone: !editMode.phone});
                }}
              >
                <img src={Edit} className="Editar" />
              </button>
            </div>

            {/* Dirección */}
            <div className="profile-field">
              <label>Dirección:</label>
              <input
                type="text"
                value={user.address || ''}
                disabled={!editMode.address}
                onChange={(e) => setUser({...user, address: e.target.value})}
              />
              <button 
                onClick={() => {
                  if (editMode.address) {
                    handleUpdate('address');
                  }
                  setEditMode({...editMode, address: !editMode.address});
                }}
              >
                <img src={Edit} className="Editar" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Menú de navegación lateral */}
      <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="mobile-top-bar">
          <span className="mobile-nav-toggle close" onClick={toggleMenu}>
            <img 
              src={user?.photo || BaseProfileImg} 
              alt="Foto de perfil"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = BaseProfileImg;
              }}
            />
            <h3>{user?.username || 'Usuario'}</h3>
          </span>
        </div>
        
          <div className="main-navigation">
            <ul className="navigation__option">
              <li>
                <Link to="/Home">
                  <img src={favoritesImg} alt="Lista de favoritos" />
                  <strong>Lista de favoritos</strong>
                </Link>
              </li>
              <li>
                <Link to="/Home">
                  <img src={shoppingImg} alt="Compras" />
                  <strong>Compras</strong>
                </Link>
              </li>
              <li>
                <Link to="/TallerEducativo">
                  <img src={workshopImg} alt="Talleres" />
                  <strong>Talleres</strong>
                </Link>
              </li>
              <li>
                <Link to="/CanjearCupon">
                  <img src={redeemCouponsImg} alt="Canjear cupón" />
                  <strong>Canjear cupón</strong>
                </Link>
              </li>
            </ul>
            <div className="navigation__division"></div>
            <ul className="navigation__option">
              <li>
                <Link to="/Ajustes">
                  <img src={settingsImg} alt="Ajustes" />
                  <strong>Ajustes</strong>
                </Link>
              </li>
              <li>
                <Link to="/Comentarios">
                  <img src={commentsImg} alt="Comentarios" />
                  <strong>Comentarios</strong>
                </Link>
              </li>
              <li>
                <Link to="/AtencionCliente">
                  <img src={customerServiceImg} alt="Atención al cliente" />
                  <strong>Atención al cliente</strong>
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}

export default Perfil;