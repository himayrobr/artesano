import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { endpoints } from '../apiConfig';

const TallerDetail = () => {
  const { id } = useParams();
  const [taller, setTaller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTallerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getTaller(id));
        
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del taller');
        }

        const data = await response.json();
        setTaller(data);
      } catch (err) {
        console.error('Error al cargar el taller:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTallerDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando información del taller...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!taller) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No se encontró información del taller</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-6">
            {taller.foto && (
              <img 
                src={taller.foto} 
                alt={taller.nombre}
                className="w-32 h-32 rounded-lg object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{taller.nombre}</h1>
              <p className="text-gray-600">{taller.ubicacion}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {taller.descripcion && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{taller.descripcion}</p>
            </div>
          )}
          
          {taller.contacto && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Información de contacto</h2>
              <div className="space-y-2">
                {taller.contacto.telefono && (
                  <p className="text-gray-700">
                    <span className="font-medium">Teléfono:</span> {taller.contacto.telefono}
                  </p>
                )}
                {taller.contacto.email && (
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {taller.contacto.email}
                  </p>
                )}
              </div>
            </div>
          )}

          {taller.horario && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Horario de atención</h2>
              <p className="text-gray-700">{taller.horario}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TallerDetail;