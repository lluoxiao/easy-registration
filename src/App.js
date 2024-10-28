import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import SignUp from './page/SignUp';
import UserList from './page/UserList';
function App() {
  return (
    <Router> 
        <Route path="/a" Component={UserList} />
        <Route path="/signUp" Component={SignUp} /> 
    </Router>
  );
}

export default App; 