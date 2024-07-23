import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ActividadCulturalAdmin.css';
import { apiUrl } from '../../../../constants/Api';

export default function ActividadCulturalAdmin() {
  const [actividades, setActividades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newActividad, setNewActividad] = useState({
    nombre_actividad_cultural: '',
    descripcion_actividad_cultural: '',
    imagen_actividad_cultural: '',
  });

  const itemsPerPage = 4;

  useEffect(() => {
    fetchActividades();
  }, []);

  const fetchActividades = async () => {
    try {
      const response = await fetch(`${apiUrl}actividades_culturales`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      toast.error('Error al cargar actividades culturales');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActividad((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewActividad((prev) => ({
      ...prev,
      imagen_actividad_cultural: file,
    }));
  };
  

  const addActividadCultural = async () => {
    const formData = new FormData();
    formData.append('nombre_actividad_cultural', newActividad.nombre_actividad_cultural);
    formData.append('descripcion_actividad_cultural', newActividad.descripcion_actividad_cultural);
    formData.append('imagen_actividad_cultural', newActividad.imagen_actividad_cultural);

    try {
      const response = await fetch(`${apiUrl}actividades_culturales/insert`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchActividades();
      setIsModalOpen(false);
      setNewActividad({
        nombre_actividad_cultural: '',
        descripcion_actividad_cultural: '',
        imagen_actividad_cultural: '',
      });
      toast.success('Actividad cultural agregada exitosamente');
    } catch (error) {
      toast.error('Error al agregar actividad cultural');
    }
  };

  const updateActividadCultural = async (id) => {
    const formData = new FormData();
    formData.append('nombre_actividad_cultural', newActividad.nombre_actividad_cultural);
    formData.append('descripcion_actividad_cultural', newActividad.descripcion_actividad_cultural);
    if (newActividad.imagen_actividad_cultural) {
      formData.append('imagen_actividad_cultural', newActividad.imagen_actividad_cultural);
    }

    try {
      const response = await fetch(`${apiUrl}actividades_culturales/update/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchActividades();
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentId(null);
      setNewActividad({
        nombre_actividad_cultural: '',
        descripcion_actividad_cultural: '',
        imagen_actividad_cultural: '',
      });
      toast.success('Actividad cultural actualizada exitosamente');
    } catch (error) {
      toast.error('Error al actualizar actividad cultural');
    }
  };

  const deleteActividadCultural = async (id) => {
    try {
      const response = await fetch(`${apiUrl}actividades_culturales/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchActividades();
      toast.success('Actividad cultural eliminada exitosamente');
    } catch (error) {
      toast.error('Error al eliminar actividad cultural');
    }
  };

  const openEditModal = (actividad) => {
    setNewActividad({
      nombre_actividad_cultural: actividad.nombre_actividad_cultural,
      descripcion_actividad_cultural: actividad.descripcion_actividad_cultural,
      imagen_actividad_cultural: actividad.imagen_actividad_cultural,
    });
    setCurrentId(actividad.id_actividad_cultural);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(actividades.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedActividades = actividades.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="actividad-noticias-container">
      <ToastContainer />
      <button className="add-button" onClick={() => {
        setIsEditing(false);
        setIsModalOpen(true);
      }}>
        Agregar Actividad Cultural
      </button>
      <table className="actividad-noticias-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {selectedActividades.length > 0 ? (
            selectedActividades.map((actividad) => (
              <tr key={actividad.id_actividad_cultural}>
                <td>{actividad.nombre_actividad_cultural}</td>
                <td>{actividad.descripcion_actividad_cultural}</td>
                <td>
                  {actividad.imagen_actividad_cultural && (
                    <img
                      src={`data:image/png;base64,${actividad.imagen_actividad_cultural}`}
                      alt={actividad.nombre_actividad_cultural}
                      className="actividad-noticias-imagen"
                    />
                  )}
                </td>
                <td>
                  <button className="edit-button" onClick={() => openEditModal(actividad)}>Editar</button>
                  <button className="delete-button" onClick={() => deleteActividadCultural(actividad.id_actividad_cultural)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay actividades culturales disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {Math.ceil(actividades.length / itemsPerPage)}</span>
        <button onClick={() => handlePageChange('next')} disabled={currentPage === Math.ceil(actividades.length / itemsPerPage)}>Siguiente</button>
      </div>

      {isModalOpen && (
        <div className="register-modal-overlay">
          <div className="register-modal-content">
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? updateActividadCultural(currentId) : addActividadCultural();
              }}
            >
              <h3>{isEditing ? 'Editar' : 'Agregar'} Actividad Cultural</h3>
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre_actividad_cultural"
                  value={newActividad.nombre_actividad_cultural}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Imagen:
                <input
                  type="file"
                  name="imagen_actividad_cultural"
                  onChange={handleImageChange}
                  required={!isEditing}
                />
              </label>
              <label>
                Descripción:
                <textarea
                  name="descripcion_actividad_cultural"
                  value={newActividad.descripcion_actividad_cultural}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <button type="submit" className="save-button">
                {isEditing ? 'Actualizar' : 'Agregar'}
              </button>
              <span
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
