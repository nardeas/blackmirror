import os
import feed_service
import message_service
from taskqueue import bmqueue
from utils import get_logger
from dal import github_dal

N_ATTEMPTS = 5
VIS_TIMEOUT = 60
logger = get_logger("bmqueue")


@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def update_github_stats(username: str, **kwargs):
    # TODO the actual functionality
    scraped_data = {
        "first_name": "Ville",
        "last_name": "Toiviainen",
        "bio": "Machine Learning Engineer at Intuition Machines",
        "country": "Finland",
        "is_pro_user": True,
        "organizations": ["Glados"],
        "profile_picture_url": "https://avatars3.githubusercontent.com/u/4243244",
        "repositories": ["https://github.com/Villux/golden_goal"],
        "used_languages": ["Python", "Jupyter Notebook"],
        "stars": 110,
        "followers": 11,
        "following": 14,
    }

    return github_dal.update(username, scraped_data)


@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_feed(user_id: str, **kwargs):
    return feed_service.create_feed(user_id)


@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_messages(user_id: str, **kwargs):
    return message_service.create_messages(user_id)