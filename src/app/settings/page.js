import Main from "./Main";
import Layout from "@/components/main/Layout";

export default function Settings() {
  return (
    <Layout isLogin={true} page={"Settings"}>
      <Main />
    </Layout>
  );
}