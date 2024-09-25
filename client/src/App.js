import { Link, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';

function App() {
  return (
    <>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard/">Dashboard</Link></li>
        <li><Link to="/quiz/">Quiz</Link></li>
      </nav>
      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>
        <Route path='/dashboard/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/quiz/' element={<Quiz></Quiz>}></Route>
      </Routes>
    </>
  );
}

export default App;
