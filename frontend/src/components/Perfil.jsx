import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/Perfil.css';
import Edit from '../storage/img/Group 17.svg';
import profileImg from '../storage/img/perfile.png';
import Swal from 'sweetalert2';

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

  // Función para manejar la actualización
  const handleUpdate = async (field) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log('1. Datos del usuario en localStorage:', userData);
      
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
      
      console.log('2. Campo a actualizar:', field);
      console.log('3. Nombre del campo en backend:', fieldMapping[field]);
      console.log('4. Datos a enviar:', updateData);

      const response = await fetch(`${endpoints.updateUser}/${userData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      console.log('8. Datos de la respuesta:', data);

      if (response.ok) {
        // Actualizar el estado con los datos del usuario actualizados
        setUser(data.usuario);
        
        // Actualizar localStorage
        if (field === 'username') {
          const updatedUserData = {
            ...userData,
            username: data.usuario.nombre // Usar el nombre actualizado de la respuesta
          };
          console.log('9. Actualizando localStorage con:', updatedUserData);
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }

        // Mostrar notificación de éxito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Datos actualizados!",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });

        // Desactivar modo de edición
        setEditMode(prev => ({ ...prev, [field]: false }));
      } else {
        throw new Error(data.mensaje || 'Error al actualizar');
      }
    } catch (error) {
      console.error('10. Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron actualizar los datos'
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No se encontraron datos del usuario</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={user?.photo || '/src/storage/img/R.png'} 
          alt="Foto de perfil" 
          className="profile-photo"
        />
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
            <img src={Edit} alt="Editar" />
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
            <img src={Edit} alt="Editar" />
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
            <img src={Edit} alt="Editar" />
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
            <img src={Edit} alt="Editar" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;