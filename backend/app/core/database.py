from motor.motor_asyncio import AsyncIOMotorClient
import logging

logger = logging.getLogger(__name__)

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

mongodb = MongoDB()

async def connect_db():
    mongodb.client = AsyncIOMotorClient("mongodb://localhost:27017")
    mongodb.database = mongodb.client["mydatabase"]
    logger.debug("MongoDB Connected!")

async def close_db():
    mongodb.client.close()
    logger.debug("MongoDB Connection Failed!")
