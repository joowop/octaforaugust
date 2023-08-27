import os
from ..utils.recommendation.recommendation import recommend
from ..utils.recommendation.recommendation import dfdf
from ..utils.recommendation.recommendation import find_sim_movie
from ..utils.recommendation.recommendation import merge_json_files
import json
import pandas as pd
import numpy as np
import datetime as dt
received_file_dir = r"tmp/received"



class SophiaForUser:
    def __init__(self, request, option):
        self.booktext = request.args['book']
        self.option = option
        self.folder_path = r"./model/recommend"
        self.result = {}
        self.db_path = "./model/recommend/gilbit_library_tmp_0820.csv"
        self.book_data = pd.read_csv(self.db_path, index_col=0)
    # def merge_json(self):
    #     merged_json = merge_json_files(self.folder_path)

    #     with open("merged.json", "w", encoding="utf-8") as output_file:
    #         json.dump(merged_json, output_file, ensure_ascii=False, indent=4)

    def __enter__(self):
        if self.option == "recommend":
            books = self.recommend_book()
            self.result["booklist"] = books.split("\n")
            return self.result
        elif self.option == "find_book":
            self.book_finder()
            return self.result
        
    def __exit__(self, exc_type, exc_value, traceback):
        pass
    
    def book_finder(self):
        book_name = self.booktext
        book_data = self.book_data.loc[self.book_data["제목"] == book_name, "책장위치"]
        bookshelf_number = book_data.iloc[0]
        bookshelf_source = '{}.jpg'.format(bookshelf_number)
        if book_data.empty:
            self.result["bookshelf"] = -1
        self.result["bookshelf"] = bookshelf_source
        
    
    def recommend_book(self):
        # 내가 읽은 책을 넣으면 다른 유사한 책을 추천해준다.
        # booktext에 client가 읽은 책 입력 (psotman -> key : book, value : client가 읽은 책 기입)

        # 전처리된 데이터 불러오기
        df = dfdf('{}/merged.json'.format(self.folder_path))
        # 유사한 아이템 불러오기
        
        category_sim = recommend(df)
        category_sim_sorted = category_sim.argsort()[:, ::-1]

        sim_movies = find_sim_movie(df, category_sim_sorted, self.booktext , 5)
        sim_movies_copy = sim_movies.copy()

        sim_movies_copy['score'] = sim_movies_copy['score'].astype(float)
        sorted_indices = np.argsort(sim_movies_copy['score'])[::-1]
        sorted_sim_movies = sim_movies_copy.iloc[sorted_indices]

        result = []
        for index, row in sorted_sim_movies.iterrows():
            book_info = f"책 이름: {row['title']}, 평점: {row['score']}"
            result.append(book_info)

        return '\n'.join(result)