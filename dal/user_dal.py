from typing import Optional, Dict, Any
from psycopg2.extras import DictRow
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "users"

ADD = f"INSERT INTO {TABLE_NAME} (first_name, last_name, github_user, image_id) VALUES (%s, %s, %s, %s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE id=%s;"

@with_dbc
def add(first_name: str, last_name: str, github_user: str, image_id: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(ADD, params=(first_name, last_name, github_user, image_id), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_ID_RETURNED)


@with_dbc
def get(user_id: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(GET, params=(user_id,), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_VALUE_IN_DB)