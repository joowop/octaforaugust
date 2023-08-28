from flask import Blueprint, render_template, request, url_for, send_file, jsonify, send_from_directory
from werkzeug.utils import redirect
from ..apis.librarian import Libarian
from ..model_ai.chatbot.chatbot import Chatbot
from ..model_ai.chatbot.recommendation_chatbot import Recommend
import io
import base64
from PIL import Image

# from sophia.models import
# from sophia.forms import

bp = Blueprint('librarian', __name__, url_prefix='/librarian')

qa_chat = Chatbot()
recommend_chat = Recommend()

# 분실 책 찾기
@bp.route('/missing_book', methods=['POST'])
def missing():
    with Libarian(request, "missing") as lib:
        if lib["missing_books"] == -1:
            lib["missing_books"] = "분실된 책이 없습니다."
    return lib
## 결과값
#  self.result["bookshelf"]  입력한 사진값 추측결과_l
#  self.result["detected_book_list"] book_list ocr 로 받은 목록
#  self.result["missing_books"] 기존 db와 대조 결과
# 뒤집어진 책 찾기
@bp.route('/reversed_book', methods=['POST'])
def reversed():
    with Libarian(request, "reversed") as lib:
        # src = lib["reversed_book"]
        # img = Image.open(src, mode="r")
        # img_byte_arr = io.BytesIO()
        # img.save(img_byte_arr, format='PNG')
        # encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
        # result = { "reverse_book": encoded_img, 
        #           "reverse_book_list": lib["reverse_book_list"]}
        # return lib
        return send_from_directory('tmp/predicted',lib["reversed_book"])
        
    # lib = {
    # "reverse_book": "./tmp/predicted/reversed_20230820004657.jpg",
    # "reverse_book_list": [
    #     "800803347",
    #     "300808349",
    #     "800808세14351고금",
    #     "800808세 14347중료-"
    # ]
    #   }
    
    
# 잘못 꽂힌 책 찾기
@bp.route('/wrong_placed_book', methods=['POST'])
def wrong():
    with Libarian(request, "unsorted") as lib:
        # return send_from_directory('tmp/predicted',lib["unsorted_image"])
        return jsonify({"image":lib["unsorted_image"]})
    # {"u “unsorted_image” : <str: dir Image.jpg>}
    
@bp.route('/bookshelve_numbers', methods=['GET'])
def wrong_all():
    with Libarian(request, "number") as lib:
        print(lib["bookshelve_list"])
        return lib["bookshelve_list"]
    
    
@bp.route('/qa_chatbot', methods=['POST'])
def qa_chatbot():
    result = qa_chat.chatbot_text(text=request.form["question"])
    print(request.args)
    return jsonify({"result": result})

@bp.route('/recommend_chatbot', methods=['POST'])
def recommend_chatbot():
    result = recommend_chat.recommend_book(text=request.form["question"])
    return jsonify({"result": result})