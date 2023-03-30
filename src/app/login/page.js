import { Lexend_Deca } from 'next/font/google'
const lexen = Lexend_Deca({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div>
        <h1>Sersow</h1>
        <p className={lexen.className}>Login.</p>
      </div>
    </main>
  )
}
