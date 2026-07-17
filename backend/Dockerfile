FROM python:3.11-slim

# Install OS-level CA certificates and ffmpeg (needed for yt-dlp merging)
RUN apt-get update && apt-get install -y \
    ca-certificates \
    ffmpeg \
    curl \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Pre-download ResNet50 weights into the image so no runtime download is needed
RUN python -c "from torchvision import models; models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)"

# Force certifi to use the system CA bundle
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
ENV REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
ENV CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt

COPY . .

RUN mkdir -p uploads src/models

EXPOSE 5000

CMD ["python", "-m", "flask", "--app", "src", "run", "--host=0.0.0.0", "--port=5000"]