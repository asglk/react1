import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Borad_write from "./pages/Borad_write";
import Board_content from "./pages/Board_content";

import "./css/App.css";
import Footer from "./footer";
import { Button } from "antd";

const App = () => {

  return (
    <div className="app">

      {/* 상단 메뉴 */}
      <nav className="navbar">
        <Link to="/">
          <button className="nav-button">홈</button>
          <Button type="primary" size="large">홈</Button>
        </Link>

        <Link to="/board">
          <button className="nav-button">게시판</button>
        </Link>

        <Link to="/login">
          <button className="nav-button">로그인</button>
        </Link>
      </nav>

      {/* 페이지 */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/borad_write" element={<Borad_write />} />
          <Route path="/board_content" element={<Board_content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </main>

      {/* 하단 */}
      <Footer title="pknu" />

    </div>
  );
};

export default App;
