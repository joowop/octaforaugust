# 기능 개요
# 책 이름을 넣으면 해당 책의 위치 찾아주기
# 상황 가정
# 책 이름을 넣으면 실시간으로 해당 위치의 책장을 사진으로 찍어
# 책장에서 사진을 찍고 책의 위치를 붉은색박스로 표기한다 
# input
# 책 이름
# output
# 책장번호, 해당 사진에서 책의 위치 붉은색 표기
from PIL import Image
import pandas as pd

def get_bookshelve_image_from_location(book_name: str)-> Image:
    # 라이브러리 DB 접속
    library_data = pd.read_csv('src/bookshelves/library_data.csv')
    # 현재는 이름말고 인덱스로 가져와야함 ,index,status,writer,publisher,years,isbn,ids, 7,7,1,렉스기획팀 편,렉스미디어닷넷,2017,9788959603060,어005.1-ㄹ448ㅋ
    # 책장 위치 가져오기
    series = library_data.isin([book_name])
    is_series = series.any()
    #"책이 책장에 없습니다. 사서를 찾아주세요"
    if is_series[is_series==True].empty :
        return "책이 책장에 발견되지 않았습니다. 사서를 찾아주세요"
    # 책장을 찍기 현재는 각 사진이 책장넘버임 => 프로젝트에서 책장사진을 가져오는 방식으로 변환
    
    target = is_series[is_series==True].index[0]
    
    index = library_data[library_data[target]==book_name].index[0]
    
    return index

if __name__ == "__main__":
    print(get_bookshelve_image_from_location("사이먼 몽크 지음 ;윤진서 옮김"))