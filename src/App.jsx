import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Borad_write from "./pages/Borad_write";
import Board_content from "./pages/Board_content";
import Logout from "./pages/Logout";

import "./css/App.css";
import Footer from "./footer";
import { Button } from "antd";
import MyPage from "./pages/MyPage";
import { useSelector } from "react-redux";
import ItemInsert from "./pages/ItemInsert";

const App = () => {

  //loggedSlice에서 공유된 isLogin, token값을 가져오기
  const {isLogin, token} = useSelector((state) => state.logged);

  return (
    <div className="app">
      {/* 상단 메뉴 */}
      <nav className="navbar">
        <Link to="/">
          <button className="nav-button">홈</button>
        </Link>

        <Link to="/board">
          <button className="nav-button">게시판</button>
        </Link>
        {!isLogin && <Link to="/login">
          <button className="nav-button">로그인</button>
        </Link>}
       {!isLogin && <Link to="/join">
          <button className="nav-button">회원가입</button>
        </Link>}
       {isLogin && <Link to="/logout">
          <button className="nav-button">로그아웃</button>
        </Link> }
       {isLogin && <Link to="/mypage">
          <button className="nav-button">My페이지</button>
        </Link> }
        {isLogin && <Link to="/item_insert">
          <button className="nav-button">물품등록</button>
        </Link> }
      </nav>

      {/* 페이지 */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/borad_write" element={<Borad_write />} />
          <Route path="/board_content" element={<Board_content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/item_insert" element={<ItemInsert />} />
        </Routes>
      </main>

      {/* 하단 */}
      <Footer title="pknu" />

    </div>
  );
};

export default App;
