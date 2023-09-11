from node:20.5.1-slim
RUN mkdir -p /opt/app/frontend && cd /opt/app/frontend
RUN npm install -g vite
WORKDIR /opt/app/frontend
COPY . .
RUN npm install -y
EXPOSE 5173
CMD [ "npm", "run", "dev"]
