/*import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}
*/

/*CODIGO GENERADO POR CLAUDIA*/

import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}