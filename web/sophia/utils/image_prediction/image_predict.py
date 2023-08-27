from ultralytics import YOLO
import cv2
from easyocr import Reader
from PIL import Image
import datetime as dt
import os
import pandas as pd

modelpath = "./model_ai/book_detection/book_detection.pt" ##model path

db_path = "./model/recommend/gilbit_library_tmp_0820.csv"

class ImagePredict:
    def __init__(self, imagepath): ##모델 예측 사진 보여주는 함수
        
        self.imagepath = imagepath
        self.model = YOLO(modelpath)
        self.reader = Reader(['ko'])
        image = cv2.imread(self.imagepath)
        self.image =  cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        self.model_result = self.model.predict(self.image)
        self.book_data = pd.read_csv(db_path, index_col=0)
        #self.names = {0: 'book', 1: 'book_reversed', 2: 'book_label', 3: 'book_label_reversed'}
        
    def show_predict(self): ## 
        result = self.model_result
        plots = result[0].plot()

        img = Image.fromarray(plots)
        img_location ='./tmp/predicted/'
        precise= 'predict_image_{}.jpg'.format(dt.datetime.now().strftime("%Y%m%d%H%M%S"))
        img_location = "".join([img_location, precise])
        img.save(img_location, "JPEG")
        return img_location


    def ocr_list(self): ## OCR 검출 함수
        
        word_dic = {}
        wordlist= []
        reversed_wordlist=[]
        result = self.model_result
        for cnt, i in enumerate(result[0].boxes.data):
            if i[-1] == 3:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])

                crop_img = self.image[y1:y2, x1:x2]
                rotate_img = cv2.rotate(crop_img, cv2.ROTATE_180)
                results = self.reader.readtext(rotate_img, detail = 0)
                reversed_wordlist.append(''.join(results))
            elif i[-1] == 2:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])

                crop_img = self.image[y1:y2, x1:x2]
                results = self.reader.readtext(crop_img, detail = 0)
            
        wordlist.append(''.join(results))
        word_dic['valid_books'] = wordlist
        word_dic["reversed_books"] = reversed_wordlist

        return word_dic

    
    def reversed_book_location(self): ##뒤집힌 책 보여주는 함수
        result = self.model_result
        for cnt, i in enumerate(result[0].boxes.data):
            if i[-1] == 3:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])
                
                img = cv2.rectangle(self.image, (x1,y1),(x2,y2),(255,0,0),3,3)
                img = cv2.putText(self.image, "Reversed", (x1,y1-5), fontFace = cv2.FONT_HERSHEY_COMPLEX, 
                                  fontScale=1, color= (255,0,0))

        img = Image.fromarray(self.image)
        img_location ='./tmp/predicted/'
        precise= 'reversed_{}.jpg'.format(dt.datetime.now().strftime("%Y%m%d%H%M%S"))
        img_location = "".join([img_location, precise])
        img.save(img_location, "JPEG")
        return precise
                
        
    def valid_book_location(self): ##바른 책 보여주는 함수
        wordlist= []
        reversed_wordlist=[]
        result = self.model_result
        for cnt, i in enumerate(result[0].boxes.data):
            if i[-1] == 2:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])
                
                img = cv2.rectangle(self.image, (x1,y1),(x2,y2),(0,0,255),3,3)
                img = cv2.putText(self.image, "Valid", (x1,y1-5), fontFace = cv2.FONT_HERSHEY_COMPLEX, 
                                  fontScale=1, color= (0,0,255))
        img = Image.fromarray(self.image.imageg)
        img.save('valid_book_location.jpg', "JPEG")

        return img
    
    def ocr_book_list(self): ## 전체라벨 OCR 검출 함수
        
        book_number_list= []
        result = self.model_result
        for cnt, i in enumerate(result[0].boxes.data):
            if i[-1] == 3:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])

                crop_img = self.image[y1:y2, x1:x2]
                rotate_img = cv2.rotate(crop_img, cv2.ROTATE_180)
                results = self.reader.readtext(rotate_img, detail = 0)
                book_number_list.append('.'.join(results[1:]))
            elif i[-1] == 2:
                x1,y1 = int(result[0].boxes.data[cnt][0]),int(result[0].boxes.data[cnt][1])
                x2,y2 = int(result[0].boxes.data[cnt][2]),int(result[0].boxes.data[cnt][3])

                crop_img = self.image[y1:y2, x1:x2]
                results = self.reader.readtext(crop_img, detail = 0)
                book_number_list.append('.'.join(results[1:]))
        return book_number_list
    
    def find_missing_list(self, book_list): ## 분실된 책 찾기
        # 이미 데이터 베이스에 분실되었다고 추가되었으면 -> 분실된 것
        # 아직 대출중인데 책에 꽂혀있으면 -> 분실된 것
        missing = []
        for book_number in book_list:
            if self.is_book_lent(book_number):
                missing.append((book_number, "missing"))
            elif self.is_book_missing(book_number):
                missing.append((book_number, "lent"))
        
        if len(missing) == 0:
            return -1
        return missing
        
    def is_book_missing(self, book_number):
        df_missing_list = self.book_data.loc[self.book_data["분실"] == "1"]
        if(not df_missing_list.loc[self.book_data["청구기호"] == book_number].empty):
            return True
        return False
    def is_book_lent(self, book_number):
        df_lent_list = self.book_data.loc[self.book_data["대출"]=="1"]
        if(not df_lent_list.loc[self.book_data["청구기호"] == book_number].empty):
            return True
        return False