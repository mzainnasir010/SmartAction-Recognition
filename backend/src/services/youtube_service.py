import subprocess
import os
import uuid
from ..config import Config

#youtube service function
class YouTubeService:
    @staticmethod
    def download_video(url):
        video_id = str(uuid.uuid4())
        output_path = os.path.join(Config.UPLOAD_FOLDER, f"{video_id}.mp4")

        # Use system CA bundle if available (Railway/Linux), else skip cert check
        ca_bundle = (
            os.environ.get('SSL_CERT_FILE') or
            '/etc/ssl/certs/ca-certificates.crt' if os.path.exists('/etc/ssl/certs/ca-certificates.crt')
            else None
        )

        command = [
            "yt-dlp",
            "--no-check-certificates",
            "--no-playlist",
            "--geo-bypass",
            "--max-filesize", "50m",
            "--merge-output-format", "mp4",
            "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
            "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "--extractor-args", "youtube:player_client=mweb",  # mweb bypasses bot check
            "-o", output_path,
            url
        ]

        env = os.environ.copy()
        if ca_bundle:
            env['SSL_CERT_FILE'] = ca_bundle
            env['REQUESTS_CA_BUNDLE'] = ca_bundle

        try:
            result = subprocess.run(
                command,
                capture_output=True,
                text=True,
                timeout=120,
                env=env
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
            return None, "yt-dlp not found. Please run: pip install yt-dlp"

        except Exception as e:
            if os.path.exists(output_path):
                os.remove(output_path)
            return None, str(e)