import { useQuery, gql } from '@apollo/client';
import { Layout, Spin, theme } from "antd";

import { GetHelloQuery, GetHelloQueryVariables } from '../../graphql/generated/schema';
import GET_HELLO_QUERY from '../../graphql/getHelloQuery.graphql';

const { Content } = Layout;
const GET_HELLO = gql`
  query {
    hello
  }
`;

function Main() {
  const { token: { colorBgContainer} } = theme.useToken();
  const { data, loading } = useQuery<GetHelloQuery, GetHelloQueryVariables>(GET_HELLO_QUERY);

  console.log(data);
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
        Test
      </Content>
    </Layout>
  );
};

export default Main;