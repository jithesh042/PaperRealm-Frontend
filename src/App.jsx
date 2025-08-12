import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Latest from "./pages/Latest";
import Top from "./pages/Top";
import Genres from "./pages/Genres";
import MangaList from "./pages/MangaList";
import NovelList from "./pages/NovelList";
import Details from "./pages/Details";
import Reader from "./pages/Reader";
import Navbar from "./compoents/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/top" element={<Top />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/manga-list" element={<MangaList />} />
        <Route path="/novel-list" element={<NovelList />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/read/:id/chapter/:number" element={<Reader />} />
      </Routes>
    </Router>
  );
}

export default App;
