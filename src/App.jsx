import { Link, Navigate, Route, Routes } from "react-router-dom";
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
import ItemList from "./pages/ItemList";
import Chat from "./pages/Chat";
import ChangeInfo from "./pages/mypage/Changeinfo";
import ChangePw from "./pages/Mypage/ChangePw";
import Board1 from "./pages/Board1";

const App = () => {

  //loggedSlice에서 공유된 isLogin, token값을 가져오기
  const { isLogin, token } = useSelector((state) => state.logged);

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
        <Link to="/board1">
          <button className="nav-button">게시판1</button>
        </Link>
        {!isLogin && <Link to="/login">
          <button className="nav-button">로그인</button>
        </Link>}
        {!isLogin && <Link to="/join">
          <button className="nav-button">회원가입</button>
        </Link>}
        {isLogin && <Link to="/logout">
          <button className="nav-button">로그아웃</button>
        </Link>}
        {isLogin && <Link to="/mypage">
          <button className="nav-button">My페이지</button>
        </Link>}
        {isLogin && <Link to="/item_insert">
          <button className="nav-button">물품등록</button>
        </Link>}
        {isLogin && <Link to="/item_list">
          <button className="nav-button">물품</button>
        </Link>}
        <Link to="/chat">
          <button className="nav-button">채팅</button>
        </Link>
      </nav>

      {/* 페이지 */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board1" element={<Board1 />} />
          <Route path="/borad_write" element={<Borad_write />} />
          <Route path="/board_content" element={<Board_content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={isLogin ===true  ? <Logout /> : <Navigate to="/login"/> } />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={isLogin ===true  ? <MyPage /> : <Navigate to="/login"/> } >
            <Route path="changeinfo" element={<ChangeInfo />} />
            <Route path="changepw" element={<ChangePw />} />
          </Route>
          <Route path="/item_insert" element={<ItemInsert />} />
          <Route path="/item_list" element={<ItemList />} />
          <Route path="/chat" element={<Chat />} />

        </Routes>
      </main>

      {/* 하단 */}
      <Footer title="pknu" />

    </div>
  );
};

export default App;
