# Build 단계
FROM node:20-alpine
WORKDIR /app

# 패키지 설치 최적화
COPY package*.json ./
RUN npm ci

# Next.js 빌드 시 주입될 환경 변수
ARG NEXT_PUBLIC_API_URL

# 빌드 시점에 Next.js 환경 변수 주입
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 불필요한 개발 의존성 제거 (선택사항)
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]