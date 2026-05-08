import yt_dlp
import os
import uuid
import ssl
from ..config import Config

# Bypass SSL certificate verification for environments with missing CA stores
ssl._create_default_https_context = ssl._create_unverified_context

class YouTubeService:
    @staticmethod
    def download_video(url):
        """
        Downloads a YouTube video and returns the local file path.
        """
        video_id = str(uuid.uuid4())
        output_path = os.path.join(Config.UPLOAD_FOLDER, f"{video_id}.mp4")
        
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'merge_output_format': 'mp4',
            'outtmpl': output_path,
            'quiet': True,
            'no_warnings': True,
            'max_filesize': 50 * 1024 * 1024, # 50MB limit
            'nocheckcertificate': True,
            'geo_bypass': True,
            'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'referer': 'https://www.youtube.com/',
            'extractor_args': {
                'youtube': {
                    'player_client': ['android', 'web']
                }
            }
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            
            if os.path.exists(output_path):
                return output_path
            return None
        except Exception as e:
            print(f"YouTube Download Error: {str(e)}")
            return None

