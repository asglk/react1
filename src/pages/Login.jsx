import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../css/Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loggedSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/api/member/login.json`;

        const body = {
            "id": id,
            "password": pw
        };

        const { data } = await axios.post(url, body);

        if (data.status === 200) {
            alert("로그인성공!");
            // 리듀스의 login을 호출하여 값을 변경
            dispatch(login({token : data.token}));
            navigate(-1);
        }
        else if (data.status === 0) {
            alert("해당 아이디는 없습니다.");
        }
        else {
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <div className="ui-page login-container">

            <div className="ui-card login-box">

                <h3 className="ui-title">로그인</h3>

                <form
                    className="ui-form login-form"
                    onSubmit={handleSubmit}
                >

                    <input className="ui-input"
                        type="text"
                        value={id}
                        placeholder="아이디를 입력해주세요"
                        onChange={(e) => setId(e.target.value)}
                    />

                    <input className="ui-input"
                        type="password"
                        value={pw}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={(e) => setPw(e.target.value)}
                    />

                    <div className="login-button-group">

                        <Button
                            className="login-button"
                            htmlType="submit"
                        >
                            로그인
                        </Button>

                        <Link
                            className="login-join-link"
                            to="/join"
                        >
                            <Button className="join-move-button">
                                회원가입
                            </Button>
                        </Link>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Login;