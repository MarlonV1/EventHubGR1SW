# Etapa 1: Instalar dependencias
FROM node:18-alpine AS deps

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json* ./

RUN npm ci

# Etapa 2: Construir la aplicación
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copiar el resto de archivos necesarios
COPY . .

# Establecer la variable de entorno necesaria para soportar `.mjs`
ENV NODE_OPTIONS="--import=./next.config.mjs"

# Construir la app Next.js
RUN npm run build

# Etapa 3: Imagen final
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar sólo lo necesario para ejecutar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Establecer variable de entorno para producción
ENV NODE_ENV production

# Puerto por defecto de Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
