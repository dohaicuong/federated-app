#!/bin/bash

if [[ $? == 0 ]]; then
  /wait-for-it.sh chat-service:4001 -- echo "chat service is up"
  cd /etc/app
  yarn dev
fi
