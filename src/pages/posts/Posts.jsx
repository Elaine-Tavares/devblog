import { useEffect, useState } from "react";
import api from "../../axios/api";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";
import Loader from "../../components/loader/Loader";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("getposts.php")
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Posts</h1>

      <div className={styles.container_cards}>
        {posts.map(post => (
          <div key={post.id} className={styles.card}>
            
            {post.image && (
              <img
                src={`https://elainetavaresweb.com/devblog/backend/uploads/${post.image}`}
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