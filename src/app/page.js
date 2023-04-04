import Image from 'next/image'
import { Lexend_Deca } from 'next/font/google'
import styles from './page.module.css'

const lexen = Lexend_Deca({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Sersow</h1>
        <p className={lexen.className}>Sersow is a project showcase app for uploading and showcasing their project work, interact with others, seek ideas and find collaborators or teams.</p>
      </div>
    </main>
  )
}
