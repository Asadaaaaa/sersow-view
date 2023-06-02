import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./main.module.css";

export default function Layout({ isLogin, page, children }) {
  return (
    <main className="w-screen h-screen flex">
      <div className="grow h-screen bg-slate-900"></div>
      <div className="grow-0 h-screen flex">
        <Sidebar isLogin={isLogin} page={page} />
        <div className={`${styles.mainScrollbar} overflow-y-auto`}>
          <Header isLogin={isLogin} page={page} />
          {children}
        </div>
      </div>
      <div className="grow h-screen"></div>
    </main>
  );
}