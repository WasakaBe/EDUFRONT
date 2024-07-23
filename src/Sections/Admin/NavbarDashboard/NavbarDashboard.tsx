import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logo_cbta } from '../../../assets/logos'
import { AuthContext } from '../../../Auto/Auth'
import './NavbarDashboard.css'
import {
  close_icon,
  config_icon,
  credential_icon,
  help_icon,
  horario_icon,
  info_icon,
  mensaje_icon,
  panel_icon,
  user_profile_icon,
  web_icon,
} from '../../../assets/icons'

interface NavbarDashboardProps {
  onButtonClick: (view: string) => void
}

const NavbarDashboard: React.FC<NavbarDashboardProps> = ({ onButtonClick }) => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error(
      'useContext(AuthContext) must be used within an AuthContextProvider'
    )
  }

  const { isAuthenticated, logout } = authContext

  if (!isAuthenticated) {
    return <div>No has iniciado sesión</div>
  }

  const cerrarSesion = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo_cbta} alt="CRM Logo" className="logo" />
          <h3>EDU CONTROL</h3>
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => onButtonClick('dashboard')}>
            <div className="align">
              <img src={panel_icon} alt="icono de dashboard" />
              <span>Dashboard</span>
            </div>
          </li>
          <li
            className="menu-item"
            onClick={() => onButtonClick('profiledashboardadmin')}
          >
            <div className="align">
              <img src={user_profile_icon} alt="icono de perfil" />
              <span>Perfil</span>
            </div>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img
                src={credential_icon}
                alt="icono de credenciales escolares"
              />
              <span className="dropdown-toggle">Credenciales Escolares</span>
            </div>
            <ul className="dropdown-menu2">
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('createcredential')}
              >
                <a href="#">Crear</a>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('viewcredential')}
              >
                <a href="#">Visualizar</a>
              </li>
              <li className="dropdown-item2">
                <a href="#">Diseños de las Credenciales</a>
              </li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <div>
              <div className="align">
                <img src={horario_icon} alt="icono de horarios escolares" />
                <span className="dropdown-toggle">Horario Escolares</span>
              </div>
            </div>
            <ul className="dropdown-menu2">
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('createschedule')}
              >
                <a href="#">Asignar</a>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('viewschedule')}
              >
                <a href="#">Visualizar</a>
              </li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img src={info_icon} alt="icono de información escolares" />
              <span className="dropdown-toggle">Informacion Escolares</span>
            </div>
            <ul className="dropdown-menu2">
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('infoalumn')}
              >
                <a href="#">Alumnos</a>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('infodocent')}
              >
                <a href="#">Docentes</a>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('infobecas')}
              >
                <a href="#">Becas</a>
              </li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img src={web_icon} alt="icono de diseño del sitio web" />
              <span className="dropdown-toggle">Diseño del sitio web</span>
            </div>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('carrusel')}>
                  Carrusel
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('welcomeadmin')}>
                  Bienvenida
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('misionyvision')}>
                  Mision y Vision
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('actividadnoticias')}>
                  Actividades Noticias
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('inscriptionadmin')}>
                  Inscripcion Info
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('actividadcultural')}>
                  Actividades culturales
                </a>
              </li>
              <li className="dropdown-item2">
                <a href="#" onClick={() => onButtonClick('sobrenosotrosadmin')}>
                  Sobre Nosotros
                </a>
              </li>
              <li className="dropdown-item2">
                <a
                  href="#"
                  onClick={() => onButtonClick('carrerastecnicasadmin')}
                >
                  Carreras Tecnicas
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <div className="align" onClick={() => onButtonClick('chatadmin')}>
              <img src={mensaje_icon} alt="icono de mensajes" />
              <span>Mensajes</span>
            </div>
          </li>
          <li className="menu-item">
            <div className="align">
              <img src={config_icon} alt="icono de configuración" />
              <span>Configuracion</span>
            </div>
          </li>
          <li className="menu-item">
            <div className="align">
              <img src={help_icon} alt="icono de ayuda" />
              <span>Ayuda</span>
            </div>
          </li>
          <li className="menu-item" onClick={cerrarSesion}>
            <div className="align">
              <img src={close_icon} alt="icono de cerrar sesión" />
              <span>Cerrar Sesion</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarDashboard
