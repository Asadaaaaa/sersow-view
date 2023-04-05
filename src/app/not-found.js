import font from './font.module.css';

export default function NotFound() {
  return (
    <main>
      <div className="py-20">
        <h1 className={`${font.Clash_display_d6bold} text-red-500 text-center`}> 404 NOT FOUND</h1>
        <p className="text-center">Sersow is a project showcase app for uploading and showcasing their project work, interact with others, seek ideas and find collaborators or teams.</p>
      </div>
    </main>
  );
}
