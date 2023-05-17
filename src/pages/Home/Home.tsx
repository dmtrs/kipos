import { Layout, theme } from "antd";
const { Content } = Layout;

function Home() {
  const { token: { colorBgContainer} } = theme.useToken();
  return (
    <Layout
      style={{
        padding: '24px 0',
        background: colorBgContainer,
      }}
    >
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        Test
      </Content>
    </Layout>
  );
};

export default Home;