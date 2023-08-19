import os
from ..utils.image_prediction.image_predict import ImagePredict
import datetime as dt
received_file_dir = r"tmp/received"



class Libarian:
    def __init__(self, request, option):
        self.option = option
        self.image = request.files["image"]
        self.image_location = self.get_received_image_path()
        self.image_prediction = ImagePredict(self.image_location)
        self.result = {}
        
    def get_received_image_path(self)->str:
        
        saved_location = "{}/received_file_{}.jpg".format(received_file_dir, dt.datetime.now().strftime("%Y%m%d%H%M%S"))
        try:
            self.image.save(saved_location)
            return saved_location
        except Exception as e:
            return e
    
    def __exit__(self, exc_type, exc_value, traceback):
        pass
        
    def __enter__(self):
        if self.option == "reversed":
            self.reversed_book_location()
            self.reversed_book_list()
        else:
            self.get_wrong_placed_book()
        return self.result

    def reversed_book_location(self) -> str:
        predictor = self.image_prediction
        predicted_file_location = predictor.reversed_book_location()
        self.result["reversed_book"] = predicted_file_location 
    
    def reversed_book_list(self):
        predictor = self.image_prediction
        book_list = predictor.ocr_list()
        self.result["reverse_book_list"] = book_list["reversed_books"]
        
    
    
    def get_wrong_placed_book(self):
        pass