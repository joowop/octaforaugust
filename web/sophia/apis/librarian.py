import os
from ..utils.image_prediction.image_predict import ImagePredict
from ..utils.classify.classify import Classify
import datetime as dt
received_file_dir = r"./tmp/received"



class Libarian:
    def __init__(self, request, option):
        self.option = option
        self.request = request
        if option != "number":
            self.image_location = self.get_received_image_path()
            self.image_prediction = ImagePredict(self.image_location)
        self.classifier = Classify
        self.result = {}
        
    def get_received_image_path(self)->str:
        if self.request.files:
            self.image = self.request.files["image"]
            saved_location = "{}/received_file_{}.jpg".format(received_file_dir, dt.datetime.now().strftime("%Y%m%d%H%M%S"))
            self.image.save(saved_location)
            return saved_location
        else:
            image_path = self.request.form["bookshelf_number"]
            original_image_path = 'static/bookshelves/'
            saved_location = original_image_path + image_path
            return saved_location
    
    def __exit__(self, exc_type, exc_value, traceback):
        pass
        
    def __enter__(self):
        if self.option == "reversed":
            self.reversed_book_location()
            self.reversed_book_list()
        elif self.option == "missing":
            self.get_missing_book()
        elif self.option == "unsorted":
            self.get_wrong_placed_book()
        elif self.option == "number":
            self.get_bookshleves_numbers()
        return self.result

    def reversed_book_location(self) -> str:
        predictor = self.image_prediction
        predicted_file_location = predictor.reversed_book_location()
        self.result["reversed_book"] = predicted_file_location 
    
    def reversed_book_list(self):
        predictor = self.image_prediction
        book_list = predictor.ocr_list()
        self.result["reverse_book_list"] = book_list["reversed_books"]
    
    def get_missing_book(self):
        predictor = self.image_prediction
        self.result["bookshelf"] = predictor.show_predict()
        book_list = predictor.ocr_book_list()
        self.result["detected_book_list"] = book_list
        self.result["missing_books"] = predictor.find_missing_list(book_list=book_list)
        
    def get_wrong_placed_book(self):
        classifier = self.classifier(self.image_location)
        result = classifier.get_unsorted_book()
        self.result["unsorted_image"] = result
        
    def get_bookshleves_numbers(self):
        location= 'static/bookshelves'
        bookself_images_folder = os.path.join('', location)
        image_list = [ f for f in os.listdir(bookself_images_folder) if f.endswith(('jpg', 'jpeg'))]
        self.result["bookshelve_list"] = image_list