import { useState } from "react";
import api from "../../axios/api";
import styles from "./NewPost.module.css";
import { useNavigate } from "react-router-dom";

export default function NewPost() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "", type: "success" });
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);

    try {
      const res = await api.post("newpost.php", formData);

      if (res.data.success || res.data === "Post criado!") {
        setModalContent({
          title: "Sucesso!",
          message: "Seu novo post foi publicado com sucesso.",
          type: "success"
        });
        setShowModal(true);
        
        setTitle("");
        setBody("");
        setImage(null);
        setPreview(null);
      } else {
        setModalContent({
          title: "Erro",
          message: res.data.error || "Não foi possível criar o post.",
          type: "error"
        });
        setShowModal(true);
      }

    } catch (err) {
      console.error(err);
      setModalContent({
        title: "Erro de Conexão",
        message: "Ocorreu um erro ao conectar com o servidor.",
        type: "error"
      });
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    if (modalContent.type === "success") {
      navigate('/posts')
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    setImage(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <main className={styles.container}>
      <h1>Criar novo post</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        <input
          type="text"
          placeholder="Título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Escreva seu conteúdo..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <input
          type="file"
          onChange={handleImageChange}
        />

        {preview && (
          <img src={preview} alt="preview" className={styles.preview} />
        )}

        <button type="submit">Publicar</button>
      </form>

      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={modalContent.type === "success" ? styles.successTitle : styles.errorTitle}>
              {modalContent.title}
            </h2>
            <p>{modalContent.message}</p>
            <div className={styles.modalActions}>
              <button onClick={handleCloseModal} className={styles.confirmBtn}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}