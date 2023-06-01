import Main from "./Main";
import Layout from "@/components/main/Layout";

export default function Profile() {
  return (
    <Layout isLogin={true} page={"Profile"}>
      <Main />
    </Layout>
  );
}