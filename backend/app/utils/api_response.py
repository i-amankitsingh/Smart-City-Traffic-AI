from typing import Any

class APIResponse:
    def __init__(self, status_code:int=200, data: Any=None, message:str ="Success"):
        self.status_code = 200
        self.data = data
        self.message=message
        self.success: bool = status_code < 400
        