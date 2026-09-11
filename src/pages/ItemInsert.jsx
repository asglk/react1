import React, { useState } from 'react';
import '../css/ItemInsert.css';
import noimage from '../assets/noimage.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemInsert = () => {

    const navigate = useNavigate();
    // 상태변수
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [qty, setQty] = useState('');
    const [img, setImg] = useState(null);
    const [imgurl, setImgurl] = useState(noimage)

    // 함수
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (name.trim() === '') {
            alert('물품명을 입력해주세요.');
            return;
        }

        if (price === '') {
            alert('물품가격을 입력해주세요.');
            return;
        }

        if (content.trim() === '') {
            alert('물품내용을 입력해주세요.');
            return;
        }

        if (qty === '') {
            alert('물품수량을 입력해주세요.');
            return;
        }

        const url = `/api/item/insert.json`;
        const headers = {"Content-Type" :"multipart/form-data"};
        const body = new FormData();
        body.append("name",name);
        body.append("price",price);
        body.append("content",content);
        body.append("quantity",qty);
        body.append("image",img);
 
        const {data} = await axios.post(url, body, {headers:headers});
        console.log(data);
        // 모든 값이 입력된 경우
        alert('입력이 완료되었습니다.');
        navigate("/");
        // 나중에 여기서 axios를 이용해 백엔드로 전송
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        //console.log(file);
        if (!file) {
            setImg(null);
            setImgurl(noimage);
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 선택할 수 있습니다.');
            e.target.value = '';
            setImg(null);
            setImgurl(noimage);
            return;
        }

        setImg(file);
        setImgurl(URL.createObjectURL(file));
    };
    // 화면표시
    return (
        <div className="ui-page item-insert-container">

            <div className="ui-card item-insert-box">

                <h3 className="ui-title">물품등록</h3>

                <form
                    className="item-insert-form"
                    onSubmit={handleSubmit}
                >
                    <div className="item-insert-fields">
                    <div className="item-form-group">
                        <label className="ui-label">물품명</label>

                        <input className="ui-input"
                            type="text"
                            value={name}
                            placeholder="물품명을 입력해주세요"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label className="ui-label">물품가격</label>

                        <input className="ui-input"
                            type="number"
                            value={price}
                            placeholder="물품가격을 입력해주세요"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label className="ui-label">물품내용</label>

                        <textarea className="ui-input"
                            value={content}
                            placeholder="물품내용을 입력해주세요"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group">
                        <label className="ui-label">물품수량</label>

                        <input className="ui-input"
                            type="number"
                            value={qty}
                            placeholder="물품수량을 입력해주세요"
                            onChange={(e) => setQty(e.target.value)}
                        />
                    </div>

                    <div className="item-form-group item-image-group">
                        <label className="ui-label">이미지</label>

                        <div className="item-image-area">
                            <div className="item-file-area">
                                <input
                                    className="ui-input item-file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                        </div>
                    </div>
                    </div>

                    <aside className="item-preview-panel" aria-label="이미지 미리보기">
                        <div className="item-image-preview">
                            <img src={imgurl} alt="물품 미리보기" />
                        </div>
                    </aside>

                    <button
                        className="ui-button item-insert-button"
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

