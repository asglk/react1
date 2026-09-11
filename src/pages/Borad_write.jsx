import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Borad_write.css';
import axios from 'axios';

const Borad_write = () => {

    const navigate = useNavigate();

    // 1. 상태변수
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setTWriter] = useState('');
    
    // 2. 함수
    const handlnInsert = async(e) => {
        //form태그에 의해 호출된 함수는 자동으로 새로고침 기능이 있으나 그 기능을 막는다
        e.preventDefault();

        //url설정
        const url = `/api/board/insert.json`;

        //전달해야할 데이터 (키 : 값)
        const body = {
            "title": title,
            "content": content,
            "writer": writer
        }

        //백엔드 호출하기
        const { data } = await axios.post(url, body);
        console.log(data);

        if(data.status === 200){
            alert("작성되었습니다!");
            navigate('/board'); //페이지 전환
        }
        else{
            alert("작성에 문제가 생겼습니다.");
        }
    }
    //5. 화면표시
    return (
        <div className="ui-page write-container">
            <div className="ui-card write-box">

                <h3 className="ui-title">글쓰기</h3>
                <form onSubmit={handlnInsert}>
                <div className="ui-field input-group">
                    <label className="ui-label">제목</label>
                    <input className="ui-input"
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="ui-field input-group">
                    <label className="ui-label">내용</label>
                    <textarea className="ui-input"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="ui-field input-group">
                    <label className="ui-label">작성자</label>
                    <input className="ui-input"
                        type="text"
                        placeholder="작성자를 입력하세요"
                        value={writer}
                        onChange={(e) => setTWriter(e.target.value)}
                    />
                </div>

                <button type='submit' className="ui-button write-button">
                    글쓰기
                </button>
                <Link to="/borad" className="back-button">
                    ← 게시판으로 돌아가기
                </Link>
                </form>
            </div>
        </div>
    );
};

export default Borad_write;
