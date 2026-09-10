import React, { useState } from 'react';
import '../css/ItemInsert.css';
import { useNavigate } from 'react-router-dom';

const ItemInsert = () => {

    const navigate = useNavigate();
    // 상태변수
    const [iname, setIname] = useState('');
    const [iprice, setIprice] = useState('');
    const [icontent, setIcontent] = useState('');
    const [iqty, setIqty] = useState('');
    const [iimg, setIimg] = useState('');

    // 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        if (iname.trim() === '') {
            alert('물품명을 입력해주세요.');
            return;
        }

        if (iprice === '') {
            alert('물품가격을 입력해주세요.');
            return;
        }

        if (icontent.trim() === '') {
            alert('물품내용을 입력해주세요.');
            return;
        }

        if (iqty === '') {
            alert('물품수량을 입력해주세요.');
            return;
        }

        // 모든 값이 입력된 경우
        alert('입력이 완료되었습니다.');
        navigate("/");
        // 나중에 여기서 axios를 이용해 백엔드로 전송
    };

    // 화면표시
    return (
        <div className="item-insert-container">

            <div className="item-insert-box">

                <h3>물품등록</h3>

                <form
                    className="item-insert-form"
                    onSubmit={handleSubmit}
                >

                    <div className="item-form-group">
                        <label>물품명</label>

                        <input
                            type="text"
                            value={iname}
                            placeholder="물품명을 입력해주세요"
                            onChange={(e) => setIname(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label>물품가격</label>

                        <input
                            type="number"
                            value={iprice}
                            placeholder="물품가격을 입력해주세요"
                            onChange={(e) => setIprice(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label>물품내용</label>

                        <textarea
                            value={icontent}
                            placeholder="물품내용을 입력해주세요"
                            onChange={(e) => setIcontent(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label>물품수량</label>

                        <input
                            type="number"
                            value={iqty}
                            placeholder="물품수량을 입력해주세요"
                            onChange={(e) => setIqty(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label>이미지</label>

                        <p className="item-image-info">
                            이미지 등록 기능은 추후 추가 예정
                        </p>
                    </div>

                    <button
                        className="item-insert-button"
                        type="submit"
                    >
                        물품등록
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ItemInsert;

