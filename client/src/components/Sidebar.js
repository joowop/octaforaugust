import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function SideBar(props) {
  let itemList;

  if (props.menu === 'librarian') {
    itemList = (
      <>
        <ul>
          <li><Link to="/librarian/check">장서 점검</Link></li> {/* 경로 앞에 /librarian 추가 */}
          <li><Link to="/librarian/organize">장서 정리</Link></li> {/* 오타 수정: orgarnize -> organize */}
        </ul>
      </>
    );
  } else if (props.menu === 'library_user') {
    itemList = (
      <>
      <ul>
        <li><Link to="/librarian/find_book">책 찾기</Link></li>
        <li><Link to="/librarian/recommend_book">책 추천 받기</Link></li>
      </ul>
      </>
    );
  }

  return (
    <div className={`sidebar-${props.menu}`}>
      {itemList}
    </div>
  );
}

SideBar.propTypes = {
  menu: PropTypes.string
};

export default SideBar;
