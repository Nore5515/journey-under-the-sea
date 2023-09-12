#!/bin/bash

npm start
osascript -e 'tell app "Terminal"
    do script "npm run ios"
end tell'