import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../axios/api"
import styles from "./Edit.module.css"

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 🔎 carregar post
  useEffect(() => {
    async function getPost() {
      try {
        const res = await api.get(`/getpost.php?id=${id}`)
        setTitle(res.data.title)
        setBody(res.data.body)
        setCurrentImage(res.data.image)
      } catch (err) {
        console.log(err)
        alert("Erro ao carregar post")
      } finally {
        setLoading(false)
      }
    }

    getPost()
  }, [id])

  // 💾 atualizar post
  async function handleUpdate(e) {
    e.preventDefault()

    if (!title.trim() || !body.trim()) {
      alert("Preencha todos os campos")
      return
    }

    const formData = new FormData()
    formData.append("id", id)
    formData.append("title", title)
    formData.append("body", body)

    if (image) {
      formData.append("image", image)
    }

    try {
      setSaving(true)

      await api.post("/updatepost.php", formData)

      alert("Post atualizado com sucesso!")
      navigate("/admin")

    } catch (err) {
      console.log(err)
      alert("Erro ao atualizar post")
    } finally {
      setSaving(false)
    }
  }

  // ⏳ loading inicial
  if (loading) {
    return (
      <p className={styles.status}>
        Carregando post...
      </p>
    )
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleUpdate} className={styles.form}>
        <h1>Editar Post</h1>

        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />

        <textarea
          className={styles.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Conteúdo do post"
        />

        {/* 🖼 imagem atual */}
        {currentImage && (
          <div className={styles.preview}>
            <span>Imagem atual</span>
            <img
              src={`http://localhost:8000/uploads/${currentImage}`}
              alt="Imagem atual"
              className={styles.image}
            />
          </div>
        )}

        {/* 📁 nova imagem */}
        <input
          className={styles.file}
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={saving}
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </main>
  )
}