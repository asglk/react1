import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../css/BoardContent.css';

const BoardContent = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 1. 상태변수
    const [no, setNo] = useState(searchParams.get("no") || 0);

    const [nextNo, setNextNo] = useState(0);
    const [prevNo, setPrevNo] = useState(0);

    const [result, setResult] = useState({});

    // 이전글 / 다음글 안내창
    const [prevMessage, setPrevMessage] = useState(false);
    const [nextMessage, setNextMessage] = useState(false);


    // 2. 게시글 상세 조회
    const handleData = async () => {

        const url = `/api/board/selectonehit.json?no=${no}`;

        const { data } = await axios.get(url);

        setNextNo(data.nextNo);
        setPrevNo(data.prevNo);
        setResult(data.result);
    };


    // 이전글
    const handlePrev = () => {

        if (!prevNo) {

            setPrevMessage(true);

            setTimeout(() => {
                setPrevMessage(false);
            }, 2000);

            return;
        }

        setPrevMessage(false);
        setNextMessage(false);

        navigate(`/board_content?no=${prevNo}`);
        setNo(prevNo);
    };


    // 다음글
    const handleNext = () => {

        if (!nextNo) {

            setNextMessage(true);

            setTimeout(() => {
                setNextMessage(false);
            }, 2000);

            return;
        }

        setPrevMessage(false);
        setNextMessage(false);

        navigate(`/board_content?no=${nextNo}`);
        setNo(nextNo);
    };


    // 3. 이펙트
    useEffect(() => {
        handleData();
    }, [no]);


    // 4. 화면
    return (
        <div className="ui-page board-content-container">

            <div className="ui-card board-content-box">

                {/* 제목 */}
                <div className="board-content-title">
                    {result.title}
                </div>


                {/* 게시글 정보 */}
                <div className="board-content-meta">

                    <div>
                        <span>번호</span>
                        <strong>{no}</strong>
                    </div>

                    <div>
                        <span>작성자</span>
                        <strong>{result.writer}</strong>
                    </div>

                    <div>
                        <span>조회수</span>
                        <strong>{result.hit}</strong>
                    </div>

                    <div>
                        <span>작성일</span>
                        <strong>{result.regdate2}</strong>
                    </div>

                </div>


                {/* 내용 */}
                <div className="board-content-body">
                    {result.content}
                </div>


                {/* 이전글 / 다음글 */}
                <div className="board-content-navigation">

                    {/* 이전글 */}
                    <div className="board-content-nav-item">

                        {prevMessage && (
                            <div className="board-content-tooltip">
                                첫 번째 게시글입니다.
                            </div>
                        )}

                        <button onClick={handlePrev}>
                            이전글
                        </button>

                    </div>


                    {/* 다음글 */}
                    <div className="board-content-nav-item">

                        {nextMessage && (
                            <div className="board-content-tooltip">
                                마지막 게시글입니다.
                            </div>
                        )}

                        <button onClick={handleNext}>
                            다음글
                        </button>

                    </div>

                </div>


                {/* 하단 버튼 */}
                <div className="board-content-actions">

                    <Link to="/board1">
                        <button className="ui-button board-content-list-button">
                            목록으로
                        </button>
                    </Link>


                    <div className="board-content-edit-actions">

                        <button className="board-content-update-button">
                            게시글 변경
                        </button>

                        <button className="board-content-delete-button">
                            게시글 삭제
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BoardContent;