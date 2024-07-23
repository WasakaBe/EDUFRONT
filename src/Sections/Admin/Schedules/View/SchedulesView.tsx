import React, { useState, useEffect } from 'react';
import './SchedulesView.css';
import { apiUrl } from '../../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Horario {
  id_horario: number;
  nombre_asignatura: string;
  nombre_docente: string;
  nombre_grado: string;
  nombre_grupo: string;
  nombre_carrera_tecnica: string;
  ciclo_escolar: string;
  dias_horarios: { day: string; startTime: string; endTime: string }[] | null;
}

const SchedulesView: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null);

  const itemsPerPage = 4;

  useEffect(() => {
    fetch(`${apiUrl}horarios_escolares`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHorarios(data);
        } else {
          toast.error('Error fetching data: Data is not an array');
        }
      })
      .catch(error => toast.error(`Error fetching data: ${error.message}`));
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (horario: Horario) => {
    setSelectedHorario(horario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHorario(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(horarios.length / itemsPerPage);

  return (
    <div className="schedules-view-container">
      <h2>Horarios Escolares</h2>
      <table className="schedules-table">
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
          {currentItems.map(horario => (
            <tr key={horario.id_horario}>
              <td>{horario.id_horario}</td>
              <td>{horario.nombre_asignatura}</td>
              <td>{horario.nombre_docente}</td>
              <td>{horario.nombre_grado}</td>
              <td>{horario.nombre_grupo}</td>
              <td>{horario.nombre_carrera_tecnica}</td>
              <td>{horario.ciclo_escolar}</td>
              <td>
                {Array.isArray(horario.dias_horarios) && horario.dias_horarios.length > 0 ? (
                  horario.dias_horarios.map((dia, index) => (
                    <div key={index}>
                      <span>{dia.day}: </span>
                      <span>{dia.startTime} - {dia.endTime}</span>
                    </div>
                  ))
                ) : (
                  <span>No se encontraron días y horarios</span>
                )}
              </td>
              <td className="align">
                <button
                  className="edit-button"
                  onClick={() => openModal(horario)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Actualizar Horario"
        className="modal-view"
        overlayClassName="overlay"
      >
        {selectedHorario && (
          <div className="modal-content-view">
              <span className="close-button-view" onClick={closeModal}>&times;</span>
            <h2 className="modal-title-view">Actualizar Horario</h2>
            <form className="modal-body-view">
              <label className="modal-body-field">
                Asignatura:
                <input type="text" defaultValue={selectedHorario.nombre_asignatura} />
              </label>
              <label className="modal-body-field">
                Docente:
                <input type="text" defaultValue={selectedHorario.nombre_docente} />
              </label >
              <label className="modal-body-field">
                Grado:
                <input type="text" defaultValue={selectedHorario.nombre_grado} />
              </label>
              <label className="modal-body-field">
                Grupo:
                <input type="text" defaultValue={selectedHorario.nombre_grupo} />
              </label>
              <label className="modal-body-field">
                Carrera Técnica:
                <input type="text" defaultValue={selectedHorario.nombre_carrera_tecnica} />
              </label>
              <label className="modal-body-field">
                Ciclo Escolar:
                <input type="text" defaultValue={selectedHorario.ciclo_escolar} />
              </label>
              <label >
                Días y Horarios:
                {selectedHorario.dias_horarios && selectedHorario.dias_horarios.map((dia, index) => (
                  <div key={index}>
                    <span>{dia.day}: </span>
                    <input type="text" defaultValue={dia.startTime} /> - <input type="text" defaultValue={dia.endTime} />
                  </div>
                ))}
              </label>
              <button type="button" className="save-button"  >Actualizar</button>
            </form>
          </div>
        )}
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default SchedulesView;
