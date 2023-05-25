import { Space, Layout } from "antd";
import { Prompt } from './components';
import { SizeType } from '../../types';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

function Main({ size }: { size: SizeType}) {
	const navigate = useNavigate();
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
        <Prompt size={size} onPrompt={({addon, value}) => {
					navigate(`/paper/${encodeURIComponent(`${addon}:${value}`)}`);
				}}/>
        <Space />
      </Content>
    </Layout>
  );
};

export default Main;
