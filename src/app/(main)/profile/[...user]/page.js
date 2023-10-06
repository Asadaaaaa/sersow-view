import Main from '../Main';
import Header from '@/components/main/header/Header';

export default function ProfileUser({ params }) {

  return (
    <>
      <Header />
      <Main username={params.user[0]} />
    </>
  );
}