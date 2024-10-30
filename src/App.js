import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import UserList from './page/UserList'; 
function App() {
  return (
    <Router>
      {/* <div style={{ marginBottom: '20px' }}>
        <Link to='/'>用户列表</Link>
        <div style={{ margin: '10px' }}></div>
        <Link to='/signUp'>用户注册</Link>
      </div> */}
      <Routes>
        <Route path="/" Component={UserList} />
        <Route path="/signUp" Component={SignUp} /> 
      </Routes>
    </Router>
  );
}

export default App; 