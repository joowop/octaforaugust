import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

def merge_json_files(folder_path):
    merged_data = []

    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                try:
                    data = json.load(file)
                    merged_data.extend(data)
                except json.JSONDecodeError as e:
                    print(f"Error decoding {filename}: {e}")

    return merged_data


# merge 된 json 불러와서 전처리
def dfdf(path_merge):
    with open(path_merge, 'r', encoding='utf-8') as f:
        book_json = json.load(f)

    df = pd.DataFrame(book_json)

    # 데이터 전처리
    df[['isbn', 'title', 'category', 'score', 'review']]
    df = df[df['category'].apply(lambda x: len(x) > 0)]
    df = df[~df.duplicated(subset='title')]
    df['score'] = pd.to_numeric(df['score'])
    df.loc[df['score'] == 0, 'score'] = 1
    df = df.reset_index(drop=True)

    # category 전처리
    data_result = []
    for temp in df['category']:
        data = (' ').join(temp)
        data_result.append(data)
    df['category_literal'] = data_result

    return df

# 추천해주는 함수
def recommend(df):
    # category 벡터화
    count_vect = CountVectorizer(min_df=0.01, ngram_range=(1, 2))
    category_mat = count_vect.fit_transform(df['category_literal'])

    # 코사인 유사도 추출
    category_sim = cosine_similarity(category_mat, category_mat)

    return category_sim

# 추론 함수
def find_sim_movie(df,sorted_ind,title_name, top_n=10):
    title_movie = df[df['title']==title_name]

    title_index = title_movie.index.values
    similar_indexes = sorted_ind[title_index, :(top_n)]
    similar_indexes = similar_indexes.reshape(-1)
    return df.iloc[similar_indexes]

