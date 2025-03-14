import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    @classmethod
    def load_all_keys(cls):
        """Load all environment variables as class attributes."""
        for key in os.environ:
            value = os.environ[key]
            
            if key == "MAIL_PORT":
                value = int(value)

            elif key in {"MAIL_USE_TLS", "MAIL_USE_SSL"}:
                value = value.lower() in {"true", "1", "t", "y", "yes"}

            elif key == "JWT_TOKEN_LOCATION":
                value = [v.strip() for v in value.split(',') if v.strip() in {"headers", "cookies", "query_string", "json"}]
                
            setattr(cls, key, value)

Config.load_all_keys()
