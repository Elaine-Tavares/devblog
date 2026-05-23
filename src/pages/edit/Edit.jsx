import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axios/api";
import styles from "./Edit.module.css";
import Loader from "../../components/loader/Loader";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "", type: "success" });

  useEffect(() => {
    async function getPost() {
      try {
        const res = await api.get(`getpost.php?id=${id}`);
         console.log("Dados recebidos:", res.data); // Adicione isso para depurar
        if (res.data) {
          setTitle(res.data.title);
          setBody(res.data.body);

          if (res.data.image) {
            setPreview(`https://elainetavaresweb.com/devblog/backend/uploads/${res.data.image}`);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar post:", err);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await api.post("updatepost.php", formData);

      if (res.data.success) {
        setModalContent({
          title: "Sucesso!",
          message: "O post foi atualizado com sucesso.",
          type: "success"
        });
        setShowModal(true);
      } else {
        setModalContent({
          title: "Erro",
          message: res.data.error || "Não foi possível atualizar o post.",
          type: "error"
        });
        setShowModal(true);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
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
      navigate("/admin");
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  if (loading) return <Loader />;

  return (
    <main className={styles.container}>
      <h1>Editar Post</h1>

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

        <input type="file" onChange={handleImageChange} />

        {preview && (
          <img src={preview} alt="preview" className={styles.preview} />
        )}

        <button type="submit">Salvar Alterações</button>
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
