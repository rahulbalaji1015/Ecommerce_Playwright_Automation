# Use Microsoft's official Playwright image — matches browsers/OS deps to a known Playwright version
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

# Install dependencies first (better Docker layer caching — only reinstalls if package.json changes)
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Default command: run the full suite against Chromium
CMD ["npx", "playwright", "test", "--project=chromium"]