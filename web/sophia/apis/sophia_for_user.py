import os
from ..utils.recommendation.recommendation import recommend
from ..utils.recommendation.recommendation import dfdf
from ..utils.recommendation.recommendation import path_merge
from ..utils.recommendation.recommendation import find_sim_movie
from ..utils.recommendation.recommendation import merge_json_files
import json

import numpy as np
import datetime as dt
received_file_dir = r"tmp/received"



class SophiaForUser:
    def __init__(self, request):
        self.booktext = request.form['book']
        self.folder_path = "../model/recommend"
        
    # def merge_json(self):
    #     merged_json = merge_json_files(self.folder_path)

    #     with open("merged.json", "w", encoding="utf-8") as output_file:
    #         json.dump(merged_json, output_file, ensure_ascii=False, indent=4)

    def recommend_book(self):
        # 내가 읽은 책을 넣으면 다른 유사한 책을 추천해준다.
        # booktext에 client가 읽은 책 입력 (psotman -> key : book, value : client가 읽은 책 기입)

        # 전처리된 데이터 불러오기
        df = dfdf(self.folder_path)
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