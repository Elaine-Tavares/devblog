import { useState } from "react";
import api from "../../axios/api";
import styles from "./NewPost.module.css";

export default function NewPost() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await api.post("/newpost.php", formData);

      console.log(res.data);
      alert("Post criado!");

      setTitle("");
      setBody("");
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
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
        />

        <textarea
          placeholder="Escreva seu conteúdo..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
    </main>
  );
}