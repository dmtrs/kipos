import { Space, Layout, Spin } from "antd";
const { Content } = Layout;

function Paper() {
  return (
    <Layout
      style={{
        padding: '24px 0',
        //background: colorBgContainer,
      }}
    >
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
      </Content>
    </Layout>
  );
};

export default Paper;