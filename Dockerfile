FROM nginx:stable-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY dist/flipdot/browser /usr/share/nginx/html
