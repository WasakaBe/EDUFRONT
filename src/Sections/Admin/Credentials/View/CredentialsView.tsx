import { useEffect, useState } from 'react';
import { apiUrl } from '../../../../constants/Api';
import './CredentialsView.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Credencial {
  id_credencial_escolar: string;
  nombre_credencial_escolar: string;
  app_credencial_escolar: string;
  apm_credencial_escolar: string;
  carrera_credencial_escolar: string;
  grupo_credencial_escolar: string;
  curp_credencial_escolar: string;
  nocontrol_credencial_escolar: string;
  segsocial_credencial_escolar: string;
  foto_credencial_escolar: string | null;
  idalumnocrede: string;
}

interface Grupo {
  id_grupos: string;
  nombre_grupos: string;
}

export default function CredentialsView() {
  const [credenciales, setCredenciales] = useState<Credencial[]>([]);
  const [selectedCredencial, setSelectedCredencial] = useState<Credencial | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    const fetchCredenciales = async () => {
      try {
        const response = await fetch(`${apiUrl}credencial_escolar`);
        if (!response.ok) {
          throw new Error('Error al obtener las credenciales escolares');
        }
        const data: Credencial[] = await response.json();
        setCredenciales(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const fetchGrupos = async () => {
      try {
        const response = await fetch(`${apiUrl}grupo`);
        if (!response.ok) {
          throw new Error('Error al obtener los grupos');
        }
        const data: Grupo[] = await response.json();
        setGrupos(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCredenciales();
    fetchGrupos();
  }, []);

  const handleViewMore = (credencial: Credencial) => {
    setSelectedCredencial(credencial);
    setIsEditing(false);
  };

  const handleEdit = (credencial: Credencial) => {
    setSelectedCredencial(credencial);
    setIsEditing(true);
  };

  const handleDelete = (credencial: Credencial) => {
    setSelectedCredencial(credencial);
    setIsDeleting(true);
  };

  const handleCloseModal = () => {
    setSelectedCredencial(null);
    setIsEditing(false);
    setIsDeleting(false);
    setError(null);
    setSuccess(null);
  };

  const handleSaveChanges = async () => {
    if (selectedCredencial) {
      try {
        const response = await fetch(`${apiUrl}credencial_escolar/update/${selectedCredencial.id_credencial_escolar}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedCredencial),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const updatedCredencial = await response.json();
        setCredenciales((prevCredenciales) =>
          prevCredenciales.map((credencial) =>
            credencial.id_credencial_escolar === updatedCredencial.id_credencial_escolar ? updatedCredencial : credencial
          )
        );

        setSuccess('Credencial escolar actualizada exitosamente');
        toast.success('Credencial escolar actualizada exitosamente');
        setIsEditing(false);
      } catch (error) {
        setError((error as Error).message);
        setSuccess(null);
        toast.error('Error al actualizar la credencial escolar');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedCredencial) {
      try {
        const response = await fetch(`${apiUrl}credencial_escolar/delete/${selectedCredencial.id_credencial_escolar}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        setCredenciales((prevCredenciales) =>
          prevCredenciales.filter((credencial) => credencial.id_credencial_escolar !== selectedCredencial.id_credencial_escolar)
        );

        setSuccess('Credencial escolar eliminada exitosamente');
        toast.success('Credencial escolar eliminada exitosamente');
        handleCloseModal();
      } catch (error) {
        setError((error as Error).message);
        setSuccess(null);
        toast.error('Error al eliminar la credencial escolar');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (selectedCredencial) {
      setSelectedCredencial({ ...selectedCredencial, [name]: value });
    }
  };

  return (
    <div className="credentials-view-container">
      <h1>Lista de Credenciales Escolares</h1>
      <ToastContainer />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <table className="credentials-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Carrera</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {credenciales.map((credencial) => (
            <tr key={credencial.id_credencial_escolar}>
              <td>{credencial.id_credencial_escolar}</td>
              <td>{credencial.nombre_credencial_escolar}</td>
              <td>{credencial.app_credencial_escolar}</td>
              <td>{credencial.apm_credencial_escolar}</td>
              <td>{credencial.carrera_credencial_escolar}</td>
              <td className='align'>
                <button 
                  className='save-button' 
                  type='button'
                  onClick={() => handleViewMore(credencial)}
                >
                  Ver más
                </button>
                <button className='exit-button' type='button' onClick={() => handleEdit(credencial)}>Editar</button>
                <button className='delete-button' type='button' onClick={() => handleDelete(credencial)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCredencial && (
        <div className="modal-view">
          <div className="modal-content-view">
            <span className="close-button-view" onClick={handleCloseModal}>&times;</span>
            <div className="modal-header-view">
              <img
                src={
                  selectedCredencial.foto_credencial_escolar
                    ? `data:image/jpeg;base64,${selectedCredencial.foto_credencial_escolar}`
                    : 'default-photo.png'
                }
                alt="Foto del Alumno"
                className="modal-photo-view"
              />
              <div className="modal-title-view">
                <h2>{selectedCredencial.nombre_credencial_escolar} {selectedCredencial.app_credencial_escolar} {selectedCredencial.apm_credencial_escolar}</h2>
                <p className="modal-subtitle-view">{selectedCredencial.carrera_credencial_escolar}</p>
              </div>
            </div>
            {isEditing ? (
              <div className="modal-body-view">
                <p><strong>ID:</strong> {selectedCredencial.id_credencial_escolar}</p>
                <div className="modal-body-grid">
                  <div className="modal-body-field">
                    <strong>Nombre:</strong>
                    <input type="text" name="nombre_credencial_escolar" value={selectedCredencial.nombre_credencial_escolar} onChange={handleChange} />
                  </div>
                  <div className="modal-body-field">
                    <strong>Apellido Paterno:</strong>
                    <input type="text" name="app_credencial_escolar" value={selectedCredencial.app_credencial_escolar} onChange={handleChange} />
                  </div>
                  <div className="modal-body-field">
                    <strong>Apellido Materno:</strong>
                    <input type="text" name="apm_credencial_escolar" value={selectedCredencial.apm_credencial_escolar} onChange={handleChange} />
                  </div>
                  <div className="modal-body-field">
                    <strong>Grupo:</strong>
                    <select
                      name="grupo_credencial_escolar"
                      value={selectedCredencial.grupo_credencial_escolar}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un grupo</option>
                      {grupos.map((grupo) => (
                        <option key={grupo.id_grupos} value={grupo.id_grupos}>
                          {grupo.nombre_grupos}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-body-field">
                    <strong>CURP:</strong>
                    <input type="text" name="curp_credencial_escolar" value={selectedCredencial.curp_credencial_escolar} onChange={handleChange} />
                  </div>
                  <div className="modal-body-field">
                    <strong>No. Control:</strong>
                    <input type="text" name="nocontrol_credencial_escolar" value={selectedCredencial.nocontrol_credencial_escolar} onChange={handleChange} />
                  </div>
                  <div className="modal-body-field">
                    <strong>Seguro Social:</strong>
                    <input type="text" name="segsocial_credencial_escolar" value={selectedCredencial.segsocial_credencial_escolar} onChange={handleChange} />
                  </div>
                </div>
                <button className="save-button" type="button" onClick={handleSaveChanges}>Guardar Cambios</button>
              </div>
            ) : (
              <div className="modal-body-view">
                <p><strong>ID:</strong> {selectedCredencial.id_credencial_escolar}</p>
                <p><strong>Grupo:</strong> {selectedCredencial.grupo_credencial_escolar}</p>
                <p><strong>CURP:</strong> {selectedCredencial.curp_credencial_escolar}</p>
                <p><strong>No. Control:</strong> {selectedCredencial.nocontrol_credencial_escolar}</p>
                <p><strong>Seguro Social:</strong> {selectedCredencial.segsocial_credencial_escolar}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isDeleting && selectedCredencial && (
        <div className="modal-confirmation">
          <div className="modal-content-confirmation">
            <span className="close-button-confirmation" onClick={handleCloseModal}>&times;</span>
            <p>¿Desea eliminar esta credencial del alumno {selectedCredencial.nombre_credencial_escolar}?</p>
            <button className="confirm-button" type="button" onClick={handleDeleteConfirm}>Eliminar</button>
            <button className="info-button" type="button" onClick={handleCloseModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
