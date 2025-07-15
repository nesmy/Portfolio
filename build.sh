#!/bin/bash

echo "📦 Building project"
npm run build

echo "📦 Copy build to html folder"
sudo rm -vrf /var/www/html/*
sudo cp -vr build/* /var/www/html/
