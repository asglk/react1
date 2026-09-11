import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Board.css';
import { Pagination } from 'antd';

const Board = () => {
    const navigate = useNavigate();

    // 1. 상태변수
    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [cnt, setCnt] = useState(10);

    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);


    // 2. 함수
    const handleList = async () => {
        // url ? 키=값 & 키=값 & 키=값
        const url = `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;
        const { data } = await axios.get(url);
        //console.log(data);

        setTotal(data.total);
        setRows(data.rows);
    }

    const handleContent = (no) => {
        //게시글 상세화면으로 이동
        navigate(`/board_content?no=${no}`);
    }
    //페이지네이션 컴포넌트에서 onChange가 될때 호출될 함수를 생성.
    const onChange = (page, pagesize) => {
        setPage(page);
        setCnt(pagesize);
        //console.log(page, pagesize);
    }
    // 3. 이펙트 (함수를 호출하기 위한 타이밍을 설정) []가 비어 있으면 최초 1번만됨
    useEffect(() => {
        handleList();
    }, [page, cnt]);

    //5. 화면표시
    return (
        <div className="ui-page board-container">
            <div className="ui-card board-box">
                <div className="board-header">
                    <h3 className="ui-title">게시판</h3>

                    <Link to="/borad_write">
                        <button className="ui-button board-write-button">
                            글쓰기
                        </button>
                    </Link>
                </div>

                <div className="board-table-wrapper">
                    <table className="board-table">
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
                                rows.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>

                                        <td
                                            className="board-title"
                                            onClick={() => handleContent(item._id)}
                                        >
                                            {item.title}
                                        </td>

                                        <td>{item.writer}</td>
                                        <td>{item.hit}</td>
                                        <td>{item.regdate2}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="board-empty" colSpan={5}>
                                        등록된 게시글이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination defaultCurrent={page} total={total} onChange={onChange} />
                <div className="board-info">
                    전체 게시글: {total}개
                </div>
            </div>
        </div>
    );
};

export default Board;