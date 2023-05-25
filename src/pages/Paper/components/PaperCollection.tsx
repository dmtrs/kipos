import { chunk } from "lodash";
import { Paper as PaperSchema } from "../../../graphql/generated/schema";
import { Row, Card, Col, Typography, Pagination, Spin } from "antd";
import { SizeType } from "../../../types";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

interface CollectionProps<T> {
  items: T[];
  loading: boolean;
  size: SizeType;
  pagination: {page: number , pageSize: number};
  onChangePage: (page: number, pageSize: number) => void;
};

function paginate<T>(items: T[], pagination: { page: number, pageSize: number }): T[] {
  const { page, pageSize } = pagination;
  if (items) {
    const start = page * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }
  return [];
};

function PaperCollection({ items, loading, size, pagination, onChangePage }: CollectionProps<PaperSchema>) {
  if (loading) return <Spin />;
  const rows = chunk(paginate(items, pagination), 3).map((cards) => (
    <Row gutter={16}>
      {cards.map((ref)=>(
        <Col span={8}>
          <Card size={size==='large'?'default':'small'} bordered={false}>
            <Paragraph>
              {ref?.about}
              <Link to={`/paper/${encodeURIComponent(ref.id)}`} ><Typography.Link>Open</Typography.Link></Link>
            </Paragraph>
          </Card>
        </Col>))}
    </Row>
  ));
  return (
    <>
    {rows}
    <Pagination current={pagination.page+1} onChange={onChangePage} total={items.length} showSizeChanger={false}/>
    </>
  );
};

export default PaperCollection;