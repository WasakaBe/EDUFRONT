import { logo_cbta } from '../../../assets/logos'
import { useContext } from 'react'
import { AuthContext } from '../../../Auto/Auth'
import { useNavigate } from 'react-router-dom'
import {
  close_icon,
  config_icon,
  credential_icon,
  help_icon,
  horario_icon,
  mensaje_icon,
  panel_icon,
  user_profile_icon,
} from '../../../assets/icons'

interface NavbarDashboardAlumnProps {
  onButtonClick: (section: string) => void
}

const NavbarDashboardAlumn: React.FC<NavbarDashboardAlumnProps> = ({
  onButtonClick,
}) => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    return <div>No has iniciado sesión</div>
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
          <li
            className="menu-item"
            onClick={() => onButtonClick('dashboardalumn')}
          >
            <div className="align">
              <img src={panel_icon} alt="icono de dashboard" />
              <span>Dashboard</span>
            </div>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img src={user_profile_icon} alt="icono de perfil" />
              <span className="dropdown-toggle">Informacion</span>
            </div>
            <ul className="dropdown-menu2">
              <li className="menu">
                <span
                  className="menu-item"
                  onClick={() => onButtonClick('profiledashboardalumn')}
                >
                  Perfil
                </span>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('escolar')}
              >
                <a href="#">Escolar</a>
              </li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img
                src={credential_icon}
                alt="icono de credenciales escolares"
              />
              <span className="dropdown-toggle">Credencial</span>
            </div>
            <ul className="dropdown-menu2">
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('credencialalumno')}
              >
                <a href="#">Virtual</a>
              </li>
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('solicitarcredencialalumno')}
              >
                <a href="#">Solicitar</a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <div className="align">
              <img src={horario_icon} alt="icono de horarios escolares" />
              <span>Horario Escolares</span>
            </div>
          </li>
          <li className="menu-item">
            <div className="align">
              <img src={mensaje_icon} alt="icono de mensajes" />
              <span>Notificacion</span>
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

export default NavbarDashboardAlumn
