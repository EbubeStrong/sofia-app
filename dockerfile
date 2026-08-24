#Stage 1: Build the application
FROM node:22-alpine 

ENV NEXT_PUBLIC_BASE_URL=https://backend-dev.sofiamatics.com/api
ENV NEXT_PUBLIC_ZEGO_APP_ID=450763596
ENV NEXT_PUBLIC_ZEGO_APP_SECRET=07ad890ce085bc190b7305de39c0a830

WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies and build the application
RUN yarn install 

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build


EXPOSE 3000

# Use the production start command
CMD ["yarn", "start"]
