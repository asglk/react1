import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyPage = () => {
    return (
        <div>
            <Link to={"/Mypage/changePw"}><button>암호변경</button> </Link>
            
            <Link to={"/Mypage/changeinfo"}><button>정보변경</button> </Link>
            <Outlet />
        </div>
    );
};

export default MyPage;