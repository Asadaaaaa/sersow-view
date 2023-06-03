import styles from '@/components/main/main.module.css';
import Sidebar from '@/components/main/sidebar/Sidebar';

export default function MainLayout(props) {

  const isLogin = true;

  props.params.isLogin = isLogin;

  return (
    <main className="w-screen h-screen flex">
      <div className="grow h-screen bg-slate-900"></div>
      <div className="grow-0 h-screen flex">
        <Sidebar isLogin={isLogin} />
        <div className={`${styles.mainScrollbar} overflow-y-auto`}>
          {props.children}
        </div>
      </div>
      <div className="grow h-screen"></div>
    </main>
  );
}