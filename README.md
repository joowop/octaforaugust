# 📖 프로젝트명

### ✔️ AI 도서관 사서 (메티버스 아카데미 2기 AI반 프로젝트)

# 📃 프로젝트 소개

### ✔️ AI를 활용하여 도서관 사서의 시간이 가장 오래 걸리는 업무인 장서 점검과 도서관 이용자들을 위한 추천 시스템, 도서 찾기 기능이 포함된 프로젝트입니다.

최근 4년간 도서관의 수 증가에 비해 사서 수는 거의 변화가 없는 통계를 확인할 수 있었으며, 사서의 업무(장서 점검, 도서 프로그램 기획, 기본 프로그래밍, 유아, 초등 독서 활동 장려...)중 시간이 가장 많이 소요 되는 장서점검을 도와주기 위한 AI를 생성합니다. 
AI 사서는 YOLOv8를 활용하여 책과 책 라벨에 대한 객체를 탐지하고 EASY OCR을 통해 책 라벨의 청구 기호를 인식하여 분실된 도서, 뒤집어진 도서, 위치 변경이 필요한 도서를 자동으로 찾아줍니다.
또한, 이용자들을 위한 추천 시스템 및 Chatbot을 구현하였습니다.
이번 프로젝트를 통해 도서관 사서는 업무의 자동화와 효율성 향상, 관리 용이성, 업무 스트레스 감소, 이용자에겐 쾌적한 이용 환경, 개인화된 도서 추천, 시간 절약의 기대효과를 확인할 수 있을 것입니다.

# 👩‍🔧 팀원 소개 및 역할

### ✔️ 팀원
메타버스 아카데미 2기 AI반 서주완, 금민수, 홍진영, 손지혜 총 4명

### ✔️ 역할 분담

- 서주완 : EASY OCR Fine tuning을 활용한 도서 청구 기호 인식, Yolov8을 활용한 객체 탐지, Roboflow를 이용한 도서 및 도서 라벨 라벨링, 챗봇 구현, FLASK를 활용한 Serving
 
- 금민수 : Roboflow를 이용한 도서 및 도서 라벨 라벨링, 유사도 기반 추천 시스템 개발, 챗봇 구현 
  
- 홍진영 : Roboflow를 이용한 도서 및 도서 라벨 라벨링, WEB 구현, FLASK를 활용한 Serving
  
- 손지혜 : Roboflow를 이용한 도서 및 도서 라벨 라벨링, WEB 구현

# 📅프로젝트 진행 기록

### ✔️ 수행 기간
2023.08.01 ~ 2023.08.31

### ✔️ 세부 진행 기록
- 23-08-01 : 회의 및 주제 정하기
- 23-08-11 : Roboflow를 이용한 라벨링 작업
- 23-08-18 : yolov8을 활용한 도서 및 도서 청구기호 객체 탐지, Easy OCR Fine tuning 및 OCR을 활용한 도서 청구 기호 인식
- 23-08-25 : FLASk를 활용한 모델 서빙 및 WEB 구현, 인사이트 도출 , PPT 수정, 발표 대본 작성 
- 23-08-31 : PT 발표 및 질의응답

# 💡 주요 내용

### ✔️ 개요

1. 장서 점검
   - 분실된 도서, 뒤집어진 도서, 위치 변경이 필요한 도서 Detection
   - Detection된 도서의 정확한 위치 파악
     <br>
2. 추천시스템 패스파인더
   - 이용자들에게 유사도 기반의 도서 추천
   - 도서 찾기<br>

### ✔️ 데이터 수집 방법

1. 장서 점검<br>
   (1) 직접 찍은 책장 사진 데이터<br>
   (2) 책(BOOK), 뒤집어진 책(BOOK_REVERSED), 책 라벨, (BOOK_LABEL), 뒤집어진 책 라벨, (BOOK_REVERSED_LABLE)<br>
   <br>
2. 추천시스템 패스파인더 <br>
   (1) 교보문고 및 도서관 도서 데이터 Crawling <br>
   <br>

### ✔️ 주요 기능

1. 서비스 기능(장서 점검)

   (1) roboflow<br>
       - 직접 찍은 책장 사진 데이터 라벨링<br>
       - book, book_label, book_reversed, book_reversed_lable<br>
         - 약 3000개의 데이터셋 확보<br>
   <br>
   (2) YOLOv8-s 모델<br>
       - mAP50 : 0.987<br>
       ![results](https://github.com/joowop/octaforaugust/assets/80230688/85abebf4-ead8-4a3d-ba55-e6d2cdf9e0fe)<br>
       ![image](https://github.com/joowop/octaforaugust/assets/80230688/5ae83b47-515c-405e-bd96-2874ae7e7381)<br>

       - 높은 정확도 도출 및 class별 객체 탐지가 우수<br>
   
   (3) easy ocr <br>
       - yolo를 통해 탐지된 책 라벨 Crop하여 저장<br>
       - Crop된 라벨 이미지 ocr<br>
       ![스크린샷 2023-10-17 101115](https://github.com/joowop/octaforaugust/assets/80230688/601ef66b-4428-4f54-ab68-16ecf5323528)<br>

   <br>
   (3) 장서 점검 모델<br>
       - ocr된 라벨을 통해 뒤집어진 도서, 순서가 바뀐 도서, 분실된 도서를 탐지 하고 사서에게 알려주는 알고리즘 구현<br>
   <br>
   
2. 서비스 기능 (추천 시스템 패스파인더)
   (1) 데이터셋<br>
       - 데이터 수 : 교보문고 크롤링 데이터셋 약 10000건 (정치/사회,역사/문화,가정/육아,기술/공학, 종교, 요리 등)<br>
       - 수집 내용 : 책 제목, 키워드, 저자, 출판사, 리뷰 수, 리뷰 내용<br>
   <br>
   (2) 유사도 기반 추천 시스템<br>
       - 트랜스포머를 이용하여 키워드 문장의 임베딩을 얻고, 입력값과 코사인유사도 값이 가장 높은 키워드를 얻어냄<br>
       - 해당 키워드와 짝이 되는 내용을 도출<br>
       ![image](https://github.com/joowop/octaforaugust/assets/80230688/f6f09b51-e209-40b0-a0a8-704e4d7e9500)<br>
   <br>
4. 서비스 기능 (도서관 Q/A 챗)

   (1) 데이터셋<br>
       1.1 초창기 모델<br>
           - 데이터 수 : 대학도서관, 공공도서관 질의 응답 데이터 셋 약 4500 건<br>
           - KoGPT-2 모델을 이용한 생성 모델에 전체 4500건 데이터 학습<br>
           - + 정제된 데이터 셋 150건 학습<br>
           ![image](https://github.com/joowop/octaforaugust/assets/80230688/3f585522-3dc5-466e-bb6d-81fb1bfd917c)<br>
       <br>
       1.2 개선 모델<br>
           - 데이터 수 : 대학도서관, 공공도서관 자주 묻는 질문 데이터셋 약 150 건<br>
           ![image](https://github.com/joowop/octaforaugust/assets/80230688/9b36a30c-ecd5-4fc6-9cca-7732f10949e8)<br>
   <br>

### ✔️ 결과

1. 이번 수입 중고차 가격 예측 프로젝트에서 MAE 기준 가장 최적화된 모델은 Optuna(AutoML)의 XGBoost 모델이고 '생산년도','주행거리','배기량','차량모델' 순으로 가격에 영향을 미쳤습니다.
2. 금리,나라별 가격,업체(딜러) 등을 독립변수로 추가할 수 있다면 더욱 정확한 예측 가능합니다.
3. 해당 모델/서비스를 통해 중고차 구매차 및 판매자들에게 여 중고치 시장의 활성화를 도모할 수 있습니다.

# 🛠 기술 스택

### ▪ 언어
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">

### ▪ 주요 라이브러리
<img src="https://img.shields.io/badge/Yolov8-F7931E?style=for-the-badge&logo=Yolov8&logoColor=white"> <img src="https://img.shields.io/badge/Easy OCR-150458?style=for-the-badge&logo=Easy OCR&logoColor=white">
<img src="https://img.shields.io/badge/Tensorflow-013243?style=for-the-badge&logo=Tensorflow&logoColor=white"> <img src="https://img.shields.io/badge/Flask-99CC00?style=for-the-badge&logo=Flask&logoColor=white"> <img src="https://img.shields.io/badge/Pytorch-0058CC?style=for-the-badge&logo=Pytorch&logoColor=white">

### ▪ 개발 툴
<img src="https://img.shields.io/badge/VS code-2F80ED?style=for-the-badge&logo=VS code&logoColor=white"> <img src="https://img.shields.io/badge/Google Colab-F9AB00?style=for-the-badge&logo=Google Colab&logoColor=white">

### ▪ 협업 툴
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"> <img src="https://img.shields.io/badge/Google Slides-FFBB00?style=for-the-badge&logo=Google Slides&logoColor=white">

# 🔍 참고 자료
### ✔️ 데이터
  
[데이콘 Basic 자동차 가격 예측 AI 경진대회](https://dacon.io/competitions/official/236114/overview/description)

### ✔️ 논문
1) 고찬영, 2021, 다중선형회귀분석을 이용한 중고차 가격 예측 연구 : A사의 사례를 중심으로』, 인하대학교 물류전문대학원 석사학위 논문
2) Sümeyra MUTİ1, Kazım YILDIZ2, 2023, Using Linear Regression For Used Car Price Prediction
,International Journal of Computational and
Experimental Science and ENgineering
,Vol. 9-No.1 (2023) pp. 11-16





# 기능목록

## 기본 기능
- yolov8을 이용한 책 라벨 찾기
- 찾은 책 라벨에서 ocr 인식하여 책 라벨 번호 받기 (디벨롭 필요)

1. 꽂혀있는 책 중 뒤집어진 책 찾기
2. 순서가 잘 못된 책 찾기
3. 분실로 표시되었지만, 꽂혀있는 책 인식하기 (현재 기능 디벨롭 필요)

## 패스파인더 기능
- 코사인 유사도를 이용한 책 추천 기능
- 도서관 챗봇
