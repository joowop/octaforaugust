import os
from ..utils.image_prediction.image_predict import ImagePredict
import datetime as dt

received_file_dir = r"../../tmp/received"

class Libarian:
    def __init__(self, request):
        self.image = request.file
    def get_received_image_path(self)->str:
        
        saved_location = "".join(received_file_dir, "book_shelves", dt.datetime.now(), ".jpg")
        try:
            with open(os.path.join(saved_location), mode="w") as f:
                f.write(self.image)
            return saved_location
        except Exception as e:
            return e
        

    def reversed_book_location(self) -> str:
        file_location = self.get_received_image_path
        predictor = ImagePredict(file_location)
        predicted_file_location = predictor.reversed_book_location()
        
        return predicted_file_location
    
    def get_wrong_placed_book(self):
        pass