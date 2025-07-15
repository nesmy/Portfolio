#!/bin/bash

echo "📦 Building project"
npm run build

echo "📦 Copy build to html folder"
sudo rm -vrf /
sudo cp -vr build/* /var/www/html/
