from flask import Blueprint, jsonify, render_template, request, url_for
from werkzeug.utils import redirect
from ..apis.sophia_for_user import SophiaForUser

# from sophia.models import
# from sophia.forms import

bp = Blueprint('user', __name__, url_prefix='/user')

# 도서 위치 찾기
@bp.route('/find_book', methods=['GET'])
def find_book():
    book = request.args.get('book')
    with SophiaForUser(request=request, option="find_book") as bookshelf:
        if bookshelf == -1:
            return "해당 책이 존재하는 책장이 없습니다."
        return bookshelf


# 책 추천받기
@bp.route('/recommend_book', methods=['GET'])
def recommend_book():
    with SophiaForUser(request=request, option="recommend") as book_list:
        print(book_list)
        return render_template('/user/user_rec.html', book_list = book_list)