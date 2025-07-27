#!/usr/bin/bash

npx prisma migrate dev --name init || npx prisma migrate deploy
npm start