#!/bin/bash

if [[ $? == 0 ]]; then
  cd /etc/app
  yarn gen
  yarn prisma:deploy
  yarn prisma:generate
  yarn dev
fi
