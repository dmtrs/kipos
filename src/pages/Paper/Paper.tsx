import { useQuery } from "@apollo/client";
import { Space, Layout, Spin, Card, Typography, Tag, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { GetHelloQuery, GetHelloQueryVariables } from "../../graphql/generated/schema";
import { loader } from "graphql.macro";
import { SizeType } from "../../types";
const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const GET_HELLO_QUERY = loader('../../graphql/getHelloQuery.graphql');

const titleLevelFromSize = (size: SizeType): 1 | 2 | 3 => {
  switch(size) {
    case 'middle':
      return 2;
    case 'small':
      return 3;
    case 'large':
    default:
      return 1;
  }
};

function Paper({ size }: { size: SizeType}) {
  const { doi } = useParams();
  const { data, loading } = useQuery<GetHelloQuery, GetHelloQueryVariables>(GET_HELLO_QUERY, { variables: { doi: doi?? '' }});

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
        <Space direction={"vertical"} size={size}>
          <Card size={size==='small'?'small':'default'} loading={loading}>
            <Skeleton loading={loading} active>
              <Title level={titleLevelFromSize(size)}>{data?.hello.about}</Title>
              <Paragraph>{data?.hello.abstract}</Paragraph>
              <Space>{data?.hello.keywords.map(keyword=>(<Tag>{keyword}</Tag>))}</Space>
            </Skeleton>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default Paper;