import { useQuery  } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Layout, Spin, theme } from "antd";

import { GetHelloQuery, GetHelloQueryVariables } from '../../graphql/generated/schema';

const { Content } = Layout;
const GET_HELLO_QUERY = loader('../../graphql/getHelloQuery.graphql');

function Main() {
  const { token: { colorBgContainer} } = theme.useToken();
  const { data, loading } = useQuery<GetHelloQuery, GetHelloQueryVariables>(GET_HELLO_QUERY);
  if (loading) return <Spin />
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
        {data?.hello}
      </Content>
    </Layout>
  );
};

export default Main;