#!/usr/bin/bash

npx prisma migrate dev --name init 1>/dev/null || npx prisma migrate deploy
npm start