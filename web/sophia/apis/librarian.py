import os
from ..utils.image_prediction.image_predict import ImagePredict
import datetime as dt
received_file_dir = r"tmp/received"

class Libarian:
    def __init__(self, request):
        self.image = request.files["image"]
        
    def get_received_image_path(self)->str:
        
        saved_location = "{}/received_file_{}.jpg".format(received_file_dir, dt.datetime.now().strftime("%Y%m%d%H%M%S"))
        try:
            self.image.save(saved_location)
            return saved_location
        except Exception as e:
            return e
        

    def reversed_book_location(self) -> str:
        file_location = self.get_received_image_path()
        print(file_location, type(file_location))
        predictor = ImagePredict(file_location)
        predicted_file_location = predictor.reversed_book_location()
        print(predicted_file_location)
        return predicted_file_location
    
    def get_wrong_placed_book(self):
        pass