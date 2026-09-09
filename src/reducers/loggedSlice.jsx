// 모든 페이지 파일에서 실시간으로 공유할 상태변수 설정

import { createSlice } from "@reduxjs/toolkit";

// 공유할 상태변수 초기값 설정 ex) 로그인유무, 토큰값 
const getInitialState = () =>{
    // 저장소에 TOKEN값을 가진 토큰을 읽음
    const token = sessionStorage.getItem("TOKEN");
    // 토큰이 있다면 TRUE, 없다면 FALSE를 chk에 보관함
    let chk = false;
    if(token != null){
        chk = true;
    }
    // 읽은 토큰값과 chk값을 반환함
    return{
        isLogin : chk,
        token : token,
    }
}
export const loggedSlice = createSlice({
    name : "logged",
    initialState : getInitialState(),

    // 여기가 위에 정의한 상태변수를 바꿀 수 있게 구현하기
    reducers : {
        login : (state, action) => {
            state.token = action.payload.token;
            state.isLogin = true;
            sessionStorage.setItem("TOKEN",action.payload.token);
        },
        logout : (state) => {
            state.token = null;
            state.isLogin = false;
            sessionStorage.removeItem("TOKEN");
        }
    }
})

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;