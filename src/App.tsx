import { ApolloProvider } from '@apollo/client';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import Main from './pages/Main';

import { client } from './apollo';

const { Header, Content, Footer  } = Layout;
function App() {
  let navigate = useNavigate();
  let location = useLocation();
  console.log(location);
  const items = [
    { label: 'Main', key: '/', icon: <HomeOutlined /> }
  ];
  const onMenuItemClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  return (
    <Layout>
        <Header>
          <Menu onClick={onMenuItemClick} theme="dark" selectedKeys={['/']} mode="horizontal" items={items}/>
        </Header>
        <Content style={{ padding: '0 50px', margin: '24px 0' }}>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </ApolloProvider>
        </Content>
        <Footer style={{textAlign: 'center'}}>Copyright ©2023 @dmtrs. This work is licensed under the MIT License.</Footer>
    </Layout>
  );
};

export default App;
