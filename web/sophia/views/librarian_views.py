from flask import Blueprint, render_template, request, url_for, send_file
from werkzeug.utils import redirect
from ..apis.librarian import Libarian
# from sophia.models import
# from sophia.forms import

bp = Blueprint('librarian', __name__, url_prefix='/librarian')

# 분실 책 찾기
@bp.route('/missing_book', methods=['GET'])
def missing():
    # DB 연결

    return "이러한 책들이 분실되었습니다."

# 뒤집어진 책 찾기
@bp.route('/reversed_book', methods=['POST'])
def reversed():
     # Libarian(request=request).reversed_book_location()  여기서 이미지 주소 불러올 수 있습니다~~~!

# 잘못 꽂힌 책 찾기
@bp.route('/wrong_placed_book', methods=['GET','POST'])
def wrong():

    return "이 책들은 잘못 꽂혔습니다.2"