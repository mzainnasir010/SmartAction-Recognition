import subprocess
import os
import uuid
from ..config import Config

class YouTubeService:
    @staticmethod
    def download_video(url):
        """
        Downloads a YouTube video using yt-dlp CLI subprocess.
        Returns (filepath, error_message).
        """
        video_id = str(uuid.uuid4())
        output_path = os.path.join(Config.UPLOAD_FOLDER, f"{video_id}.mp4")

        command = [
            "yt-dlp",
            "--no-check-certificates",
            "--no-playlist",
            "--geo-bypass",
            "--max-filesize", "50m",
            "--merge-output-format", "mp4",
            "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
            "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "--add-header", "Referer:https://www.youtube.com/",
            "--extractor-args", "youtube:player_client=ios,android,web",
            "-o", output_path,
            url
        ]

        try:
            result = subprocess.run(
                command,
                capture_output=True,
                text=True,
                timeout=120
            )

            if result.returncode != 0:
                error_msg = result.stderr.strip() or result.stdout.strip()
                print(f"YouTube Download Error: {error_msg}")
                return None, error_msg

            if os.path.exists(output_path):
                return output_path, None

            return None, "Download completed but file not found."

        except subprocess.TimeoutExpired:
            if os.path.exists(output_path):
                os.remove(output_path)
            return None, "Download timed out after 120 seconds."

        except FileNotFoundError:
            return None, "yt-dlp not found. Please install it: pip install yt-dlp"

        except Exception as e:
            if os.path.exists(output_path):
                os.remove(output_path)
            return None, str(e)