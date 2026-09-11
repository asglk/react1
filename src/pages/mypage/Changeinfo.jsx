import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/AccountSettings.css';


const ChangeInfo = () => {
    const navigate = useNavigate();

    // 토큰 받기
    const { token } = useSelector((state) => state.logged);

    // 상태변수 name, age, email
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");

    const handleData = async () => {
        // 요청할 백엔드 url
        const url = `/api/member/selectone.json`;
        // 전송할 토큰을 headers에 포함시킴 Authorization키는 변경될 수 있음
        const headers = { "Authorization": `Bearer ${token}` };
        const { data } = await axios.get(url, { headers: headers });
        console.log(data);
        setName(data.result.name);
        setAge(data.result.age);
        setEmail(data.result.email);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // 변경할 url정보
        const url = `/api/member/update.json`;
        // 토큰전송
        const headers = { "Authorization": `Bearer ${token}` };
        // 변경할 내용
        const body = { "name": name, "age": age, "email": email };
        const { data } = await axios.put(url, body, { headers: headers });
        console.log(data);
        if(data.status === 200) {
            alert('정보가 변경되었습니다.');
        }
    }

    useEffect(() => {
        handleData();
    }, [token]);


    return (
        <div className="ui-page">
            <div className="ui-card account-settings-card">
            <h3 className="ui-title">회원정보 변경</h3>
            <p className="account-settings-description">변경할 회원정보를 입력해주세요.</p>
            <form className="ui-form" onSubmit={handleUpdate}>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="memberName">이름</label>
                    <input className="ui-input" id="memberName" type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="memberAge">나이</label>
                    <input className="ui-input" id="memberAge" type="number" placeholder="나이를 입력해주세요" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="memberEmail">이메일</label>
                    <input className="ui-input" id="memberEmail" type="text" placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="account-settings-actions">
                    <button className="ui-button" type="submit">확인</button>
                    <button className="ui-button account-settings-cancel" type="button" onClick={() => navigate(-1)}>취소</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default ChangeInfo;
