from os import getenv

class Constants:
    NUM_MESSAGE_PER_PROCESS = int(getenv("NUM_MESSAGE_PER_PROCESS", 300))
    NUMBER_OF_WORKERS = int(getenv("NUMBER_OF_WORKERS", 4))