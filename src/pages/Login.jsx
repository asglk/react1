import React, { useState } from 'react';

const Login = () => {

    // 1. 상태변수 설정
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 2. 함수설정 백엔드로 전송
    const handleSubmit = () => {

    }
    // 5. 화면 표시
    return (
        <div>
            <h3>로그인</h3>
            <form action={handleSubmit}>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button>로그인</button>
            </form>
        </div>
    );
};

export default Login;