import { useState } from 'react'
import styles from './HomePage.module.css'

export default function HomePage() {
  const [result, setResult] = useState(null)

  function handleAnswer(type) {
    if (type === 'frontend') {
      setResult('Você tem alma de Front-end 🎨')
    } else if (type === 'backend') {
      setResult('Você pensa como Back-end 🧠')
    } else {
      setResult('Fullstack na veia 🚀')
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>DevBlog</h1>
        <p>
          Um espaço onde desenvolvedores compartilham ideias, aprendizados e experiências reais do código. 
          Note que, uma vez publicados, os posts não podem ser excluídos, mas você sempre pode editá-los caso mude de ideia ou precise atualizar o conteúdo.
        </p>
      </section>

      <section className={styles.quiz}>
        <h2>💡 Qual tipo de dev você é?</h2>
        <p>Escolha a opção que mais combina com você:</p>

        <div className={styles.buttons}>
          <button onClick={() => handleAnswer('frontend')}>
            Criar interfaces bonitas
          </button>

          <button onClick={() => handleAnswer('backend')}>
            Trabalhar com lógica e APIs
          </button>

          <button onClick={() => handleAnswer('fullstack')}>
            Fazer tudo 😎
          </button>
        </div>

        {result && <p className={styles.result}>{result}</p>}
      </section>
    </main>
  )
}