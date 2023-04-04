import './globals.css';
import './font.module.css';

export const metadata = {
  title: 'Sersow',
  description: 'Sersow is a project showcase app for uploading and showcasing their project work, interact with others, seek ideas and find collaborators or teams.'
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
