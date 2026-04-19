/*import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px 20px', 
            background: '#333', 
            color: 'white' 
        }}>
            <h2 onClick={() => navigate('/elecciones')} style={{ cursor: 'pointer' }}>
                🗳️ Sistema de Votación
            </h2>
            <button 
                onClick={handleLogout}
                style={{ 
                    background: 'red', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}>
                Cerrar Sesión
            </button>
        </nav>
    )
}
*/

/*CODIGO GENERADO POR CLAUDIA*/

import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'Usuario'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.icon}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 3H6C4.9 3 4 3.9 4 5v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h6v2zm4-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div>
          <div className={styles.title}>Sistema de Votación</div>
          <div className={styles.subtitle}>Plataforma Electoral Digital</div>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.badgeUser}>{username}</span>
        <button className={styles.btnLogout} onClick={handleLogout}>Salir</button>
      </div>
    </nav>
  )
}