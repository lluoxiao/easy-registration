import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import UserList from './page/UserList'; 
import UseState from './page/UseState'; 
import UseReducer from './page/UseReducer'; 
import UseRef from './page/UseRef'; 
import UseImperativeHandle from './page/UseImperativeHandle'; 
import UseContext from './page/UseContext'; 
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
        <Route path="/useState" Component={UseState} /> 
        <Route path="/useReducer" Component={UseReducer} /> 
        <Route path="/useRef" Component={UseRef} /> 
        <Route path="/useImperativeHandle" Component={UseImperativeHandle} /> 
        <Route path="/useContext" Component={UseContext} /> 
      </Routes>
    </Router>
  );
}

export default App; 