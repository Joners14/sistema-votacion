import { useEffect, useState } from 'react'
import api from '../api/axios'
import styles from './Resultados.module.css'

export default function Resultados() {
  const [elecciones, setElecciones] = useState([])
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null)
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('elecciones/')
      .then(res => {
        setElecciones(res.data)
        if (res.data.length > 0) {
          setEleccionSeleccionada(res.data[0].id)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!eleccionSeleccionada) return
    api.get(`candidatos/?eleccion=${eleccionSeleccionada}`)
      .then(res => {
        const candidatos = res.data
        api.get(`votos/?eleccion=${eleccionSeleccionada}`)
          .then(votosRes => {
            const votos = votosRes.data
            const conteo = candidatos.map(c => ({
              nombre: c.nombre,
              votos: votos.filter(v => v.candidato === c.id).length
            }))
            const total = conteo.reduce((sum, c) => sum + c.votos, 0)
            const conPct = conteo
              .map(c => ({ ...c, pct: total > 0 ? Math.round((c.votos / total) * 100) : 0 }))
              .sort((a, b) => b.votos - a.votos)
            setResultados(conPct)
          })
      })
      .catch(err => console.error(err))
  }, [eleccionSeleccionada])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando resultados...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.dot}></span>
        Resultados electorales
      </div>

      <div className={styles.selector}>
        <label className={styles.selectorLabel}>Selecciona una elección</label>
        <select
          className={styles.select}
          value={eleccionSeleccionada || ''}
          onChange={e => setEleccionSeleccionada(Number(e.target.value))}
        >
          {elecciones.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>
      </div>

      {resultados.length === 0 ? (
        <div className={styles.empty}>No hay votos registrados aún para esta elección.</div>
      ) : (
        <div className={styles.lista}>
          {resultados.map((r, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.itemNombre}>
                  {i === 0 && <span className={styles.ganador}>🥇 </span>}
                  {r.nombre}
                </div>
                <span className={styles.itemPct}>{r.pct}%</span>
              </div>
              <div className={styles.barraBg}>
                <div
                  className={styles.barraFill}
                  style={{ width: `${r.pct}%` }}
                ></div>
              </div>
              <div className={styles.itemVotos}>{r.votos} votos emitidos</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}