FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    g++ \
    gcc \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Create sandbox user
RUN useradd -m -s /bin/bash sandbox

# Create working directory
WORKDIR /sandbox
RUN chown sandbox:sandbox /sandbox

# Copy executor scripts
COPY docker/executors/run.sh /executors/run.sh
RUN chmod +x /executors/run.sh

# Switch to sandbox user
USER sandbox

# Default command
CMD ["bash"]
