import React from 'react';
import { Card } from 'flowbite-react';
function Main() {
  return (
    <>
    <div className='text-2xl font-bold m-10'>
      안녕하세요 AI 사서 소피아 입니다.
    </div>
    <div className='text-xl m-10'> 제공되는 서비스는 다음과 같습니다</div>
    <div className="container m-5">
      <Card className="max-w-sm m-5"  >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>
          사서 이용자를 위한 서비스
        </p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">

          카메라를 통해
          <br />
          장서 점검 및 장서 정리를 원격으로 진행합니다.
          <br />
          사진 찍어 장서 점검을 진행할 수 있습니다.

      </p>
    </Card>
    <Card
      className="max-w-sm m-5"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>
          도서관 이용자를 위한 서비스
        </p>
      </h5>
        <ul  className="font-normal text-gray-700 dark:text-gray-400">
          <li>챗봇을 통한 도서 추천 및 도서관 Q&A </li>
          <li>시각적 도서 검색 및 도서 추천 목록 </li>
        </ul>
    </Card>
    </div>
    </>
  );
}

export default Main;
