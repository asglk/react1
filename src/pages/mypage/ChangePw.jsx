import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AccountSettings.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChangePw = () => {
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.logged);
    // ref변수 생성
    const currentRef = useRef(null);
    const newRef = useRef(null);
    const confirmRef = useRef(null);

    // 현재 비밀번호, 바꿀 비밀번호, 바꿀 비밀번호 확인
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!currentPw || !newPw || !confirmPw) {
            alert('비밀번호를 모두 입력해주세요.');
            return;
        }

        if (newPw !== confirmPw) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        const url = `/api/member/updatepw.json`;
        // 토큰 전달방식 
        const headers = {"Authorization": `Bearer ${token}` };
        const body = {"password" : currentPw, "password1" : newPw};
        // 백엔드를 호출해서 작업 진행후 결과를 data변수에 보관
        const {data} = await axios.put(url, body, {headers});
        //console.log(data);
        if(data.status == 200){
            alert('변경되었습니다!');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="ui-page">
            <div className="ui-card account-settings-card">
            <h3 className="ui-title">비밀번호 변경</h3>
            <p className="account-settings-description">현재 비밀번호와 새 비밀번호를 입력해주세요.</p>
            <form className="ui-form" onSubmit={handleUpdate}>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="currentPw">현재 비밀번호</label>
                    <input
                        className="ui-input"
                        placeholder="현재 비밀번호를 입력해주세요"
                        id="currentPw"
                        type="password"
                        autoComplete="current-password"
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        ref={currentRef}
                        required
                    />
                </div>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="newPw">새 비밀번호</label>
                    <input
                        className="ui-input"
                        placeholder="새 비밀번호를 입력해주세요"
                        id="newPw"
                        type="password"
                        autoComplete="new-password"
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        ref={newRef}
                        required
                    />
                </div>
                <div className="ui-field">
                    <label className="ui-label" htmlFor="confirmPw">새 비밀번호 확인</label>
                    <input
                        className="ui-input"
                        placeholder="새 비밀번호를 한 번 더 입력해주세요"
                        id="confirmPw"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        ref={confirmRef}
                        required
                    />
                </div>
                <div className="account-settings-actions">
                    <button className="ui-button" type="submit">확인</button>
                    <button className="ui-button account-settings-cancel" type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default ChangePw;
