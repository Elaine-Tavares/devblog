import { useEffect, useState } from "react";
import api from "../../axios/api";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/getposts.php")
      .then(res => setPosts(res.data));
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Posts</h1>

      <div className={styles.container_cards}>
        {posts.map(post => (
          <div key={post.id} className={styles.card}>
            
            {post.image && (
              <img
                src={`http://localhost:8000/uploads/${post.image}`}
                alt={post.title}
                className={styles.image}
              />
            )}

            <div className={styles.content}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>

              <Link to={`/post/${post.id}`} className={styles.link}>
                Ver mais →
              </Link>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}