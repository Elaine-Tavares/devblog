import { useEffect, useState } from "react"
import api from "../../axios/api"
import { Link } from "react-router-dom"
import styles from "./Admin.module.css"
import Loader from "../../components/loader/Loader"

export default function Admin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getPosts() {
    try {
      const res = await api.get("getposts.php")
      setPosts(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  if (loading) return <Loader />

  return (
    <main className={styles.container}>
      <h1>Painel Admin</h1>

      {posts.length === 0 && (
        <p className={styles.empty}>Nenhum post encontrado</p>
      )}

      <div className={styles.list}>
        {posts.map(post => (
          <div key={post.id} className={styles.card}>
            <h3>Título: {post.title}</h3>
            <h2>Texto: {post.body}</h2>
            {post.image && (
                          <img
                            src={`https://elainetavaresweb.com/devblog/backend/uploads/${post.image}`}
                            alt={post.title}
                            className={styles.image}
                          />
                        )}

            <div className={styles.actions}>
              <Link to={`/edit/${post.id}`} className={styles.edit}>
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}