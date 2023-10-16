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

1. 장서 점검<br>
   - 분실된 도서, 뒤집어진 도서, 위치 변경이 필요한 도서 Detection<br>
   - Detection된 도서의 정확한 위치 파악<br>
     <br>
2. 추천시스템 패스파인더<br>
   - 이용자들에게 유사도 기반의 도서 추천<br>
   - 도서 찾기<br>

### ✔️ 데이터 수집 방법

1. 장서 점검<br>
   (1) 직접 찍은 책장 사진 데이터<br>
   (2) 책(BOOK), 뒤집어진 책(BOOK_REVERSED), 책 라벨, (BOOK_LABEL), 뒤집어진 책 라벨, (BOOK_REVERSED_LABLE)<br>
<br>
2. 추천시스템 패스파인더 <br>
   (1) 교보문고 및 도서관 도서 데이터 Crawling <br>

### ✔️ 주요 기능

3. AutoML <br>

   (1) 앞서 구현한 모델들의 MAE값을 줄이기 위해 Optuna, Auto Gluon, Pycaret 총 3가지의 AutoML을 사용<br>
   (2) Optuna : xgb의 경우 best Trial의 값이 5.885, lgbm의 경우 best trial의 값이 5.9726으로 기존의 MAE값 보다 더 나은 결과를 도출<br>
   (3) Auto Gluon :  L2 모델이 6.051919, xgb는 6.245744, lgbm은 6.165254로 기존의 MAE값 보다 더 나은 결과를 도출<br>
   (4) Pycaret : Blending을 통해 여러 모델들을 혼합하여 새로운 모델 생성 -> MAE가 가장 낮게 나온 모델인 CatBoost, XGBoost 모델 Blending : 5.8961, 렌덤으로 Blending
       한 모델 :  5.9002, 기존의 MAE 값 보다 더 나은 결과 도출<br>
   (5) 결론적으로 AutoML을 사용한 결과 모든 프레임 워크들이 기존의 K-Fold된된 모델의 MAE값보다 확연히 낮아진것을 확인하였으며, 그 중에서도 Optuna를 통해 생성한              XGBoost 모델의 MAE값이 가장 좋게 나온 것을 확인<br>

4. Auto ML 학습 결과 (MAE) <br>
   (1) Optuna (XGBoost) : 5.885<br>
   (2) Auto Gluon (L2) : 6.051919<br>
   (3) Pycaret (CatBoost, XGBoost Blend 모델) : 5.8961<br>
   💡

### ✔️ 결과

1. 이번 수입 중고차 가격 예측 프로젝트에서 MAE 기준 가장 최적화된 모델은 Optuna(AutoML)의 XGBoost 모델이고 '생산년도','주행거리','배기량','차량모델' 순으로 가격에 영향을 미쳤습니다.
2. 금리,나라별 가격,업체(딜러) 등을 독립변수로 추가할 수 있다면 더욱 정확한 예측 가능합니다.
3. 해당 모델/서비스를 통해 중고차 구매차 및 판매자들에게 여 중고치 시장의 활성화를 도모할 수 있습니다.

# 🛠 기술 스택

### ▪ 언어
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">

### ▪ 주요 라이브러리
<img src="https://img.shields.io/badge/scikit learn-F7931E?style=for-the-badge&logo=scikit learn&logoColor=white"> <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
<img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white"> <img src="https://img.shields.io/badge/seaborn-99CC00?style=for-the-badge&logo=seaborn&logoColor=white"> <img src="https://img.shields.io/badge/matplotlib-0058CC?style=for-the-badge&logo=matplotlib&logoColor=white"> <img src="https://img.shields.io/badge/wordcloud-FF4F8B?style=for-the-badge&logo=wordcloud&logoColor=white">
<img src="https://img.shields.io/badge/konlpy-FF0000?style=for-the-badge&logo=konlpy&logoColor=white"> <img src="https://img.shields.io/badge/collections-7FADF2?style=for-the-badge&logo=collections&logoColor=white">

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
