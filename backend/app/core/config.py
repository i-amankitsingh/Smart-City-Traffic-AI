from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    app_name: str = Field(..., env="")
    port: int= 8000
    host: str = "0.0.0.0"
    origin: str 
    debug: bool = Field(default=False)
    database_url: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
