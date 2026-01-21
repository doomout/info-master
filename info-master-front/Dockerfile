FROM nginx:alpine

# nginx 설정 교체
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React 빌드 결과
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
