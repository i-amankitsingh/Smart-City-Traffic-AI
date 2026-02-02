from typing import Any

class APIError(Exception):
    def __init__(self, status_code:int =500, message: str="Something went wrong!", data: Any=None,):
        self.status_code = status_code
        self.message = message
        self.data = data
        self.success: bool = False