echo "   __                  _                  __   "
echo "  / /   ___ _   _ _ __(_) ___  _   _ ___  \ \  "
echo " | |   / __| | | | '__| |/ _ \| | | / __|  | | "
echo "< <   | (__| |_| | |  | | (_) | |_| \__ \   > >"
echo " | |   \___|\__,_|_|  |_|\___/ \__,_|___/  | | "
echo "  \_\                                     /_/  "
echo ""
echo "-------------------------------------------------------------------------"
echo "Making soup and drinking beers"
echo "-------------------------------------------------------------------------"

echo "Updating npm"
echo "-------------------------------------------------------------------------"
sudo npm update

if [[ $? -eq 0 ]] ; then
  echo "Installing missing or upgraded node modules"
  echo "-------------------------------------------------------------------------"
  sudo npm install
fi

if [[ $? -eq 0 ]] ; then
  echo "Cleaning house"
  echo "-------------------------------------------------------------------------"
  sudo npm run clean
fi

if [[ $? -eq 0 ]] ; then
  echo "Installing the jest CLI"
  echo "-------------------------------------------------------------------------"
  sudo npm install -g jest-cli
fi

if [[ $? -eq 0 ]] ; then
  echo "All good! ◉}<|="
  exit 0
else
  echo "Well now... this is a disaster! o_O"
  exit 1
fi
