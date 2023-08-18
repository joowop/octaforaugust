from flask import Blueprint, render_template, request, url_for
from werkzeug.utils import redirect
# from sophia.models import
# from sophia.forms import

bp = Blueprint('user', __name__, url_prefix='/user')

# 도서 위치 찾기
@bp.route('/find_book', methods=['GET'])
def find_book():

    # 데이터 베이스 검색
    return "이 책은 여기에 있습니다."

# 책 추천받기
@bp.route('/recommend_book', methods=['GET'])
def recommend_book():

    return "추천 리스트"

