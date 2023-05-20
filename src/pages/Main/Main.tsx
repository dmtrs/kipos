import { useQuery  } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Space, Layout, Spin, theme } from "antd";
import { Prompt } from './components';
import { GetHelloQuery, GetHelloQueryVariables } from '../../graphql/generated/schema';
import { SizeType } from '../../types';

const { Content } = Layout;
const GET_HELLO_QUERY = loader('../../graphql/getHelloQuery.graphql');

function Main({ size }: { size: SizeType}) {
  const { token: { colorBgContainer} } = theme.useToken();
  const { data, loading } = useQuery<GetHelloQuery, GetHelloQueryVariables>(GET_HELLO_QUERY);
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
        <Prompt size={size}/>
        <Space />
        {loading? <Spin /> : (
          <pre><code>{data?.hello.id}</code></pre>
        )}
      </Content>
    </Layout>
  );
};

export default Main;
