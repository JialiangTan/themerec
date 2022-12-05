import pandas as pd 
from surprise import Dataset
from surprise import Reader

rating_dict = {
    "item": [1, 2, 1, 2, 1, 2, 1, 2, 1],
    "user": ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E'],
    "rating": [1, 2, 2, 4, 2.5, 4, 4.5, 5, 3],
}

df = pd.DataFrame(rating_dict)
reader = Reader(rating_scale=(1, 5))

data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)
movielens = Dataset.load_builtin('ml-100k')

