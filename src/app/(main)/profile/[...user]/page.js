import Main from '../Main';
import Header from '@/components/main/header/Header';
import GlobalError from '@/app/global-error';

export default function ProfileUser({ params }) {

  return (
    <>
      <Header />
      <Main username={params.user[0]} fallback={<GlobalError />} />
    </>
  );
}