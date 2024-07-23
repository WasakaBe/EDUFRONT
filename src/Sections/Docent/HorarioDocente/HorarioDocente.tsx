import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import Modal from 'react-modal';
import './HorarioDocente.css';

interface Horario {
  id_horario: number;
  nombre_asignatura: string;
  nombre_docente: string;
  nombre_grado: string;
  nombre_grupo: string;
  nombre_carrera_tecnica: string;
  ciclo_escolar: string;
  dias_horarios: Array<{ day: string, startTime: string, endTime: string }>;
}

interface Alumno {
  id_alumno: number;
  nombre_alumno: string;
  app_alumno: string;
  apm_alumno: string;
  nocontrol_alumno: string;
}

const HorarioDocente: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHorarios = async () => {
      if (user) {
        try {
          const response = await fetch(`${apiUrl}horarios_escolares/docente/${user.id_usuario}`);
          const data = await response.json();
          if (response.ok) {
            setHorarios(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError('Error al obtener los horarios del docente');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHorarios();
  }, [user]);

  const openModal = async (horario: Horario) => {
    setSelectedHorario(horario);
    try {
      const response = await fetch(`${apiUrl}alumnos/horario/${horario.id_horario}`);
      const data = await response.json();
      if (response.ok) {
        setAlumnos(data);
      } else {
        setAlumnos([]);
      }
    } catch (error) {
      setAlumnos([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAlumnos([]);
  };

  if (loading) {
    return <p className="loading-message">Cargando horarios del docente...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="horario-docente-container">
      <h2>Horarios Escolares</h2>
      <table className="horarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Carrera Técnica</th>
            <th>Ciclo Escolar</th>
            <th>Días y Horarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(horario => (
            <tr key={horario.id_horario}>
              <td>{horario.id_horario}</td>
              <td>{horario.nombre_asignatura}</td>
              <td>{horario.nombre_docente}</td>
              <td>{horario.nombre_grado}</td>
              <td>{horario.nombre_grupo}</td>
              <td>{horario.nombre_carrera_tecnica}</td>
              <td>{horario.ciclo_escolar}</td>
              <td>
                {horario.dias_horarios.map(dia => (
                  <div key={dia.day}>
                    {dia.day}: {dia.startTime} - {dia.endTime}
                  </div>
                ))}
              </td>
              <td className='align2'>
                <button className='save-button' type='button' onClick={() => openModal(horario)}>Ver Alumnos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-horarios"
        overlayClassName="modal-overlay-horarios"
      >
        <h2>Alumnos del Horario</h2>
        {alumnos.length > 0 ? (
          <table className="alumnos-table">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Número de Control</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(alumno => (
                <tr key={alumno.id_alumno}>
                  <td>{alumno.nombre_alumno} {alumno.app_alumno} {alumno.apm_alumno}</td>
                  <td>{alumno.nocontrol_alumno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay alumnos por el momento</p>
        )}
        <button className='save-button' type='button'>Agregar Alumno</button>
      </Modal>
    </div>
  );
};

export default HorarioDocente;
