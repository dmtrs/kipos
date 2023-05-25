import { useQuery } from "@apollo/client";
import { Space, Layout, Card, Typography, Tag, Skeleton, Spin, Row, Col, Pagination } from "antd";
import { Link, useParams, useSearchParams  } from "react-router-dom";
import { GetHelloQuery, GetHelloQueryVariables } from "../../graphql/generated/schema";
import { loader } from "graphql.macro";
import { SizeType } from "../../types";
import { Paper as PaperSchema } from "../../graphql/generated/schema";

import { chunk } from "lodash";
import { useCallback } from "react";
import { PaperCollection } from "./components";
const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Text } = Typography;
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
  let [searchParams, setSearchParams] = useSearchParams('?refs_page=0');
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
          <Card style={loading?{ width:300 }:{}} size={size==='small'?'small':'default'} loading={loading} bordered={true}>
            <Skeleton loading={loading} active>
              <Title level={titleLevelFromSize(size)}>{data?.hello.about}</Title>
              <Paragraph>{data?.hello.abstract}</Paragraph>
              <Space>{data?.hello.keywords.map(keyword=>(<Tag>{keyword}</Tag>))}</Space>
            </Skeleton>
          </Card>
          <PaperCollection
            loading={loading}
            items={data?.hello.refs as PaperSchema[]}
            size={size}
            pagination={{page: parseInt(searchParams.get('refs_page')??'0'), pageSize: 9 }}
            onChangePage={(page, pageSize) => {
              setSearchParams((params) => {
                params.set('refs_page', `${--page}`);
                return params;
              });
            }} />
        </Space>
      </Content>
    </Layout>
  );
};

export default Paper;