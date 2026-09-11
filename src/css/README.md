# 스타일 관리

- `theme.css`: 사이트 공통 색상, 모서리, 입력창 높이 등 테마 변수.
- `common.css`: 재사용하는 페이지, 카드, 제목, 폼, 입력창, 버튼과 모바일 기본값.
- `App.css`: 내비게이션, 본문, 푸터.
- 각 페이지 CSS: 해당 화면의 너비, 배치, 테이블, 이미지 등 고유 스타일.

`index.css`에서 테마와 공통 CSS를 한 번 불러옵니다. 새 페이지에서는 공통 클래스를 사용하고, 필요한 배치만 페이지 CSS에 추가하세요.

```jsx
<div className="ui-page">
    <section className="ui-card">
        <h3 className="ui-title">제목</h3>
        <form className="ui-form">
            <div className="ui-field">
                <label className="ui-label" htmlFor="name">이름</label>
                <input className="ui-input" id="name" />
            </div>
            <button className="ui-button" type="submit">저장</button>
        </form>
    </section>
</div>
```

페이지별 너비를 바꾸려면 `ui-card my-page-card`처럼 클래스를 함께 붙이고 `.my-page-card`에 `max-width`만 지정합니다. 입력창은 `textarea`에도 `ui-input`을 적용할 수 있습니다.

로그인 화면의 Ant Design 버튼은 라이브러리 스타일을 덮어써야 하므로 `Login.css`에서 별도로 관리합니다. 공통 스타일은 전역 `input`, `button` 대신 `ui-*`에만 적용합니다.
