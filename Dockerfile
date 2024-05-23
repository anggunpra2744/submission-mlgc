FROM node:18.20.3
WORKDIR /usr/src/app
ENV PORT 3000
COPY . .
COPY .env .
RUN npm install
EXPOSE 3000
ENV MODEL_URL=https://storage.googleapis.com/submissionmlgc-anggunpratiwi-bucket/model.json
CMD ["npm", "run", "start"]