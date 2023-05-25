
import { ApolloProvider } from '@apollo/client';
import { Route, Routes, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout, Menu, MenuProps, Select, Space, Typography } from 'antd';
import { HomeOutlined, DotChartOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import Main from './pages/Main';
import Paper from './pages/Paper';

import { client } from './apollo';
import { SizeType } from './types';

const { Header, Content, Footer  } = Layout;
const { Text } = Typography;

function App() {
  let navigate = useNavigate();
  let location = useLocation();
	const [ size, setSize ] = useState<SizeType>('middle');

  const items = [
    { label: 'Main', key: '/', icon: (<HomeOutlined />) },
    { label: 'Paper', key: '/paper', icon: (<DotChartOutlined />) }
  ];
  const onMenuItemClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  return (
		<Layout>
			<Header>
				<Menu onClick={onMenuItemClick} theme="dark" selectedKeys={[items.reduce((result, { key }) => {
					if (location.pathname.startsWith(key)) {
						return key;
					}
					return result;
				}, '')]} mode="horizontal" items={items}/>
			</Header>
			<Content style={{ padding: '0 50px', margin: '24px 0' }}>
				<Select
					defaultValue={`${size}`}
					onChange={(value) =>  {setSize(value as SizeType)}}
					options={['small','middle', 'large'].map((value) => ({ label: value[0].toUpperCase(), value }))}
				/>
				<ApolloProvider client={client}>
					<Routes>
						<Route path="/" element={<Main  size={size} />} />
						<Route path="/paper/:doi" element={<Paper  size={size} />} />
					</Routes>
				</ApolloProvider>
			</Content>
			<Footer style={{textAlign: 'center'}}>
				<Space>
					<Text>Copyright ©2023 <Link to="https://github.com/dmtrs/kipos" ><Typography.Link>dmtrs/kipos.git</Typography.Link></Link><br/>This work is licensed under the MIT License.</Text>
				</Space>
			</Footer>
		</Layout>
  );
};

export default App;
