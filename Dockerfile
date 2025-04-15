FROM node:18

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Build do Next.js (porta padrão 3000)
RUN npm run build

# Expor a porta correta (3000)
EXPOSE 3000

# Iniciar o Next.js no host 0.0.0.0
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]