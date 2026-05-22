import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.top}>
        <div className={styles.logo}>DevBlog</div>

        {/* 🍔 HAMBURGER */}
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* LINKS */}
      <div className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
        <Link 
          to="/" 
          onClick={closeMenu}
          className={location.pathname === "/" ? styles.active : ""}
        >
          Home
        </Link>

        <Link 
          to="/posts"
          onClick={closeMenu}
          className={location.pathname === "/posts" ? styles.active : ""}
        >
          Posts
        </Link>

        <Link 
          to="/newpost"
          onClick={closeMenu}
          className={location.pathname === "/newpost" ? styles.active : ""}
        >
          New
        </Link>

        <Link 
          to="/admin"
          onClick={closeMenu}
          className={location.pathname === "/admin" ? styles.active : ""}
        >
          Admin
        </Link>
      </div>
    </nav>
  )
}