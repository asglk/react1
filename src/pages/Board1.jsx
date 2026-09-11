import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import '../css/Board1.css';

const Board1 = () => {

    const navigate = useNavigate();

    // 1. 상태변수
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [cnt, setCnt] = useState(10);

    // 검색창에 입력 중인 값
    const [inputText, setInputText] = useState('');

    // 실제 서버 검색에 사용하는 값
    const [text, setText] = useState('');


    // 2. 게시글 목록 조회
    const boardList = async () => {

        const url =
            `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;

        const { data } = await axios.get(url);

        console.log(data);

        if (data.status === 200) {
            setRows(data.rows);
            setTotal(data.total);
        }
    };


    // 게시글 상세 페이지 이동
    const handleContent = (no) => {
        navigate(`/board_content?no=${no}`);
    };


    // 페이지 변경
    const onChange = (page, pageSize) => {
        setPage(page);
        setCnt(pageSize);
    };


    // 검색 버튼
    const handleSearch = () => {

        // 검색할 때는 1페이지부터 시작
        setPage(1);

        // 실제 검색어 변경
        setText(inputText);
    };


    // Enter 키 검색
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    // 검색 초기화
    const handleSearchReset = () => {
        setInputText('');
        setText('');
        setPage(1);
    };


    // 3. 페이지 / 출력개수 / 검색어 변경 시 목록 재조회
    useEffect(() => {
        boardList();
    }, [page, cnt, text]);


    // 4. 화면
    return (
        <div className="ui-page board1-container">

            <div className="ui-card board1-box">

                {/* 상단 */}
                <div className="board1-header">

                    <h3 className="ui-title">
                        게시판
                    </h3>

                    <Link to="/board_write">
                        <button className="ui-button board1-write-button">
                            글쓰기
                        </button>
                    </Link>

                </div>


                {/* 검색 */}
                <div className="board1-search">

                    <input
                        type="text"
                        placeholder="제목을 검색하세요."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />

                    <button
                        className="ui-button"
                        onClick={handleSearch}
                    >
                        검색
                    </button>

                    {text && (
                        <button
                            className="board1-reset-button"
                            onClick={handleSearchReset}
                        >
                            초기화
                        </button>
                    )}

                </div>


                {/* 게시글 테이블 */}
                <div className="board1-table-wrapper">

                    <table className="board1-table">

                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>날짜</th>
                            </tr>
                        </thead>


                        <tbody>

                            {rows.length > 0 ? (

                                rows.map((item, idx) => (

                                    <tr key={item._id}>

                                        {/* 게시글 번호 */}
                                        <td>
                                            {
                                                total
                                                - ((page - 1) * cnt)
                                                - idx
                                            }
                                        </td>


                                        {/* 제목 */}
                                        <td
                                            className="board1-title"
                                            onClick={() =>
                                                handleContent(item._id)
                                            }
                                        >
                                            {item.title}
                                        </td>


                                        {/* 작성자 */}
                                        <td>
                                            {item.writer}
                                        </td>


                                        {/* 조회수 */}
                                        <td>
                                            {item.hit}
                                        </td>


                                        {/* 작성일 */}
                                        <td>
                                            {item.regdate2}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        className="board1-empty"
                                        colSpan={5}
                                    >
                                        {
                                            text
                                                ? `'${text}' 검색 결과가 없습니다.`
                                                : '등록된 게시글이 없습니다.'
                                        }
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* 하단 */}
                <div className="board1-footer">

                    <Pagination
                        current={page}
                        pageSize={cnt}
                        total={total}
                        onChange={onChange}
                        showSizeChanger
                        pageSizeOptions={[10, 20, 30]}
                    />

                    <div className="board1-info">
                        전체 게시글: {total}개
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Board1;