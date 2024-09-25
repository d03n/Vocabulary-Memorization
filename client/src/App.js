import { Link, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';

function App() {
  return (
    <>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Quiz/">Quiz</Link></li>
      </nav>
      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>
        <Route path='/Quiz/:id' element={<Quiz></Quiz>}></Route>
      </Routes>
    </>
  );
}

export default App;
