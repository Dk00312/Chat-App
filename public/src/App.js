import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/api/auth/register' element={<Register/>}></Route>
          <Route path='/api/auth/login' element={<Login/>}></Route>
          <Route path="/api/auth/setavatar" element={<SetAvatar />} />
          <Route path='/api/auth/chat' element={<Chat/>}></Route>

        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
