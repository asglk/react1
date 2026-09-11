import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Join.css';

const Join = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const [check, setCheck] = useState('중복확인');

    const handleId = async (e) => {
        setId(e.target.value);

        if (e.target.value.length > 0) {
            const url = `api/member/idcheck.json?id=${e.target.value}`;
            const { data } = await axios.get(url);

            if (data.result === 0) {
                setCheck('사용가능');
            } else {
                setCheck('사용불가');
            }
        } else {
            setCheck('중복확인');
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();

        const url = `/api/member/join.json`;

        const body = {
            id: id,
            age: age,
            email: email,
            name: name,
            password: pw
        };

        const { data } = await axios.post(url, body);

        if (data.status === 200) {
            alert("회원가입 성공!~");
            navigate("/");
        } else {
            alert("실패");
        }
    };

    return (
        <div className="ui-page join-container">

            <div className="ui-card join-box">

                <h3 className="ui-title">회원가입</h3>

                <form
                    className="ui-form join-form"
                    onSubmit={handleJoin}
                >

                    <div className="ui-field join-input-group">

                        <input className="ui-input"
                            type="text"
                            value={id}
                            placeholder="ID를 입력해주세요"
                            onChange={handleId}
                            autoFocus
                        />

                        <label className="join-check">
                            {check}
                        </label>

                    </div>

                    <div className="ui-field join-input-group">

                        <input className="ui-input"
                            type="password"
                            value={pw}
                            placeholder="비밀번호를 입력해주세요"
                            onChange={(e) => setPw(e.target.value)}
                        />

                    </div>

                    <div className="ui-field join-input-group">

                        <input className="ui-input"
                            type="text"
                            value={name}
                            placeholder="이름을 입력해주세요"
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="ui-field join-input-group">

                        <input className="ui-input"
                            type="number"
                            value={age}
                            placeholder="나이를 입력해주세요"
                            onChange={(e) => setAge(e.target.value)}
                        />

                    </div>

                    <div className="ui-field join-input-group">

                        <input className="ui-input"
                            type="text"
                            value={email}
                            placeholder="이메일을 입력해주세요"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <button
                        className="ui-button join-button"
                        type="submit"
                    >
                        회원가입
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Join;