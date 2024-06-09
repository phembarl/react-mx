import { Routes, Route } from 'react-router-dom';
import HomePage from './views/Home';
import Navbar from './components/Navbar';
import Classroom from './views/Classroom';
import StudentView from './views/Student';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/classroom" Component={Classroom} />
        <Route path="/student/:id" Component={StudentView} />
      </Routes>
    </>
  );
};

export default App;
