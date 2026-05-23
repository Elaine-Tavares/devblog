import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../axios/api"
import styles from "./Post.module.css"
import Loader from "../../components/loader/Loader"

export default function Post() {
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const postRes = await api.get(`getpost.php?id=${id}`)
        setPost(postRes.data)

        const commentsRes = await api.get(`getcomments.php?post_id=${id}`)
        setComments(commentsRes.data)
      } catch (error) {
        console.log("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  async function handleComment(e) {
    e.preventDefault()

    if (!author || !content) {
      alert("Preencha todos os campos")
      return
    }

    try {
      await api.post("newcomment.php", {
        post_id: id,
        author,
        content
      })

      setAuthor("")
      setContent("")

      const res = await api.get(`getcomments.php?post_id=${id}`)
      setComments(res.data)

    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <Loader />
  if (!post) return <p className={styles.status}>Post não encontrado</p>

  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{post.title}</h1>

        {post.image && (
          <img 
            src={`https://elainetavaresweb.com/devblog/backend/uploads/${post.image}`} 
            alt={post.title}
          />
        )}

        <p>{post.body}</p>
      </article>

      {/* COMENTÁRIOS */}
      <section className={styles.commentsSection}>
        <h2>Comentários</h2>

        <form onSubmit={handleComment} className={styles.form}>
          <input
            type="text"
            placeholder="Seu nome"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <textarea
            placeholder="Escreva seu comentário..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">Comentar</button>
        </form>

        {comments.length === 0 && (
          <p className={styles.empty}>Nenhum comentário ainda</p>
        )}

        <div className={styles.commentList}>
          {comments.map((c) => (
            <div key={c.id} className={styles.comment}>
              <strong>{c.author}</strong>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}