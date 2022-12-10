import "./App.css";
import HeaderForWatch from "./Pages/HeaderForWatch";
import Main from "./Pages/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import MovieWatch from "./Pages/MovieWatch";
import Ratings from "./Components/Ratings";
import Footer from "./Pages/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to={"/movies"} />} />
          <Route exact path="/movies" element={<Main />} />
          <Route exact path="/series" element={<Main />} />
          <Route exact path="/anime" element={<Main />} />

          <Route exact path="/movies/:movieId" element={<MovieWatch />} />
          <Route exact path="/series/:seriesId" element={<Main />} />
          <Route exact path="/anime/watch" element={<Main />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
