import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logo_cbta } from '../../../assets/logos'
import { AuthContext } from '../../../Auto/Auth'
import './NavbarDashboardFamily.css'
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

const NavbarDashboardFamily: React.FC<NavbarDashboardProps> = ({
  onButtonClick,
}) => {
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
          <li
            className="menu-item"
            onClick={() => onButtonClick('dashboardfamiliar')}
          >
            <div className="align">
              <img src={panel_icon} alt="icono de dashboard" />
              <span>Dashboard</span>
            </div>
          </li>
          <li
            className="menu-item"
            onClick={() => onButtonClick('perfilfamiliar')}
          >
            <div className="align">
              <img src={user_profile_icon} alt="icono de perfil" />
              <span>Perfil</span>
            </div>
          </li>
          <li className="menu-item dropdown">
            <div className="align">
              <img src={info_icon} alt="icono de información " />
              <span className="dropdown-toggle">Informacion </span>
            </div>
            <ul className="dropdown-menu2">
              <li
                className="dropdown-item2"
                onClick={() => onButtonClick('infoalumnofamiliar')}
              >
                <a href="#">Alumnos</a>
              </li>
            </ul>
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

export default NavbarDashboardFamily
