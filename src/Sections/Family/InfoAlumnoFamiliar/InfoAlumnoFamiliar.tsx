import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';
import { apiUrl } from "../../../constants/Api";
import { HorarioEscolarAlumnoPropio } from '../../../Sections/Alumn';
import './InfoAlumnoFamiliar.css';
import { logo_cbta, logoeducacion } from '../../../assets/logos';

interface Alumno {
  id_alumnos: number;
  nombre_alumnos: string;
  app_alumnos: string;
  apm_alumnos: string;
  foto_usuario: string;
  fecha_nacimiento_alumnos: string;
  curp_alumnos: string;
  nocontrol_alumnos: string;
  telefono_alumnos: string;
  seguro_social_alumnos: string;
  cuentacredencial_alumnos: string;
  sexo: string;
  correo_usuario: string;
  clinica: string;
  grado: string;
  grupo: string;
  traslado: string;
  traslado_transporte: string;
  carrera_tecnica: string;
  pais: string;
  estado: string;
  municipio_alumnos: string;
  comunidad_alumnos: string;
  calle_alumnos: string;
  proc_sec_alumno: string;
  foto_carrera_tecnica: string;
}

const InfoAlumnoFamiliar: React.FC = () => {
  const [nocontrol, setNocontrol] = useState<string>('');
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [error, setError] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [showCredential, setShowCredential] = useState<boolean>(false);
  const [showHorario, setShowHorario] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    const storedAlumno = localStorage.getItem('alumno');
    if (storedAlumno) {
      setAlumno(JSON.parse(storedAlumno));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNocontrol(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nocontrol) {
      setError('Por favor, ingrese un número de control.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}alumnos/nocontrol/${nocontrol}`);
      const data = await response.json();
      if (response.ok) {
        setAlumno(data);
        setError('');
        setModalIsOpen(true);
      } else {
        setAlumno(null);
        setError(data.error || 'Alumno no encontrado.');
      }
    } catch (error) {
      setAlumno(null);
      setError('Error al buscar el alumno.');
    }
  };

  const handleAddAlumno = () => {
    if (alumno) {
      localStorage.setItem('alumno', JSON.stringify(alumno));
      setModalIsOpen(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleShowCredential = () => {
    setShowCredential(true);
  };

  const handleCloseCredential = () => {
    setShowCredential(false);
  };

  const handleShowHorario = () => {
    setShowHorario(true);
  };

  const handleCloseHorario = () => {
    setShowHorario(false);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="info-alumno-familiar-container">
      <div className="info-alumno-familiar-form-container">
        <form onSubmit={handleFormSubmit} className="info-alumno-familiar-form">
          <label htmlFor="nocontrol" className="info-alumno-familiar-label">Ingrese el número de control:</label>
          <div className="info-alumno-familiar-input-group">
            <input
              type="number"
              id="nocontrol"
              value={nocontrol}
              onChange={handleInputChange}
              required
              className="info-alumno-familiar-input"
            />
            <button type="submit" className="info-alumno-familiar-button">Buscar</button>
          </div>
        </form>
      </div>

      {error && <p className="info-alumno-familiar-error">{error}</p>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="info-alumno-familiar-modal"
        overlayClassName="info-alumno-familiar-overlay"
      >
        {alumno && (
          <div className="info-alumno-familiar-card">
            <div className="info-alumno-familiar-header">
              <img src={`data:image/jpeg;base64,${alumno.foto_usuario}`} alt="Foto del alumno" className="info-alumno-familiar-foto" />
              <h2 className="info-alumno-familiar-info-title">{alumno.nombre_alumnos} {alumno.app_alumnos} {alumno.apm_alumnos}</h2>
            </div>
            <div className="info-alumno-familiar-details">
              <p className="info-alumno-familiar-info-detail"><strong>CURP:</strong> {alumno.curp_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Matrícula:</strong> {alumno.nocontrol_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Seguro Social:</strong> {alumno.seguro_social_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Fecha de Nacimiento:</strong> {new Date(alumno.fecha_nacimiento_alumnos).toLocaleDateString()}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Sexo:</strong> {alumno.sexo}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Grado:</strong> {alumno.grado}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Grupo:</strong> {alumno.grupo}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Correo:</strong> {alumno.correo_usuario}</p>
            </div>
            <div className="info-alumno-familiar-buttons">
              <button onClick={handleAddAlumno} className="info-alumno-familiar-add-button">Agregar</button>
              <button onClick={closeModal} className="info-alumno-familiar-cancel-button">Cancelar</button>
            </div>
          </div>
        )}
      </Modal>

      {alumno && (
        <div className="info-alumno-familiar-card">
          <div className="info-alumno-familiar-header">
            <img src={`data:image/jpeg;base64,${alumno.foto_usuario}`} alt="Foto del alumno" className="info-alumno-familiar-foto" />
            <h2 className="info-alumno-familiar-info-title">{alumno.nombre_alumnos} {alumno.app_alumnos} {alumno.apm_alumnos}</h2>
          </div>
          <div className="info-alumno-familiar-details">
            <p className="info-alumno-familiar-info-detail"><strong>CURP:</strong> {alumno.curp_alumnos}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Matrícula:</strong> {alumno.nocontrol_alumnos}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Seguro Social:</strong> {alumno.seguro_social_alumnos}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Fecha de Nacimiento:</strong> {new Date(alumno.fecha_nacimiento_alumnos).toLocaleDateString()}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Sexo:</strong> {alumno.sexo}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Grado:</strong> {alumno.grado}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Grupo:</strong> {alumno.grupo}</p>
            <p className="info-alumno-familiar-info-detail"><strong>Correo:</strong> {alumno.correo_usuario}</p>
          </div>
          <div className='align2'>
            <button type='button' className='save-button' onClick={handleShowCredential}>Ver Credencial</button>
            <button type='button' className='info-button' onClick={handleShowHorario}>Ver Horario de clase</button>
            <button type='button' className='save-button' onClick={handleShowInfo}>Ver Información del Alumno</button>
          </div>
        </div>
      )}

      {showCredential && (
        <div className="modal-view">
          <button className="delete-button" onClick={handleCloseCredential}>Salir</button>
          <div className="credential-card">
            <div className="header">
              <img src={logoeducacion} alt="Logo SEP" className="sep-logo" />
              <img src={logo_cbta} alt="Logo CBTA 5" className="cbta-logo" />
            </div>
            <div className="body-credencial">
              <div className="photo-section">
                <img
                  src={`data:image/jpeg;base64,${alumno?.foto_usuario}`}
                  alt="Foto del Alumno"
                  className="student-photo"
                />
                <div className='name-logo-credential'>
                  <h2 className="student-name">
                    {alumno?.nombre_alumnos} {alumno?.app_alumnos} {alumno?.apm_alumnos}
                  </h2>
                  <img
                    src={`data:image/jpeg;base64,${alumno?.foto_carrera_tecnica}`}
                    alt="Logo de la Carrera"
                    className="career-logo"
                  />
                </div>
              </div>
              <div className="info-section">
                <h3>TÉCNICO EN {alumno?.carrera_tecnica.toUpperCase()}</h3>
                <p><strong>GRUPO:</strong> {alumno?.grupo}</p>
                <p><strong>CURP:</strong> {alumno?.curp_alumnos}</p>
                <p><strong>MATRÍCULA:</strong> {alumno?.nocontrol_alumnos}</p>
                <p><strong>SEGURO SOCIAL:</strong> {alumno?.seguro_social_alumnos}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHorario && (
        <Modal
          isOpen={showHorario}
          onRequestClose={handleCloseHorario}
          className="info-alumno-familiar-modal"
          overlayClassName="info-alumno-familiar-overlay"
        >
          <HorarioEscolarAlumnoPropio id_usuario={alumno?.id_alumnos || 0} onClose={handleCloseHorario} />
        </Modal>
      )}

      {showInfo && (
        <Modal
          isOpen={showInfo}
          onRequestClose={handleCloseInfo}
          className="info-alumno-familiar-modal"
          overlayClassName="info-alumno-familiar-overlay"
        >
          <div className="info-alumno-familiar-card">
            <button className="delete-button" onClick={handleCloseInfo}>Salir</button>
            <div className="info-alumno-familiar-header">
              <img src={`data:image/jpeg;base64,${alumno?.foto_usuario}`} alt="Foto del alumno" className="info-alumno-familiar-foto" />
              <h2 className="info-alumno-familiar-info-title">{alumno?.nombre_alumnos} {alumno?.app_alumnos} {alumno?.apm_alumnos}</h2>
            </div>
            <div className="info-alumno-familiar-details">
              <p className="info-alumno-familiar-info-detail"><strong>CURP:</strong> {alumno?.curp_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Matrícula:</strong> {alumno?.nocontrol_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Seguro Social:</strong> {alumno?.seguro_social_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Sexo:</strong> {alumno?.sexo}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Grado:</strong> {alumno?.grado}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Grupo:</strong> {alumno?.grupo}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Correo:</strong> {alumno?.correo_usuario}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Teléfono:</strong> {alumno?.telefono_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Clínica:</strong> {alumno?.clinica}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Traslado:</strong> {alumno?.traslado}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Transporte:</strong> {alumno?.traslado_transporte}</p>
              <p className="info-alumno-familiar-info-detail"><strong>País:</strong> {alumno?.pais}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Estado:</strong> {alumno?.estado}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Municipio:</strong> {alumno?.municipio_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Comunidad:</strong> {alumno?.comunidad_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Calle:</strong> {alumno?.calle_alumnos}</p>
              <p className="info-alumno-familiar-info-detail"><strong>Procedencia Secundaria:</strong> {alumno?.proc_sec_alumno}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InfoAlumnoFamiliar;
