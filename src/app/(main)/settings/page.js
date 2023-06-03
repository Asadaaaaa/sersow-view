import Main from './Main';
import Header from '@/components/main/header/Header';

export default function Settings({ params }) {
  return (
    <>
      <Header isLogin={params.isLogin} />
      <Main />
    </>
  );
}