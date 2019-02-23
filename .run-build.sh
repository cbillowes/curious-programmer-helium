echo "   __                  _                  __   "
echo "  / /   ___ _   _ _ __(_) ___  _   _ ___  \ \  "
echo " | |   / __| | | | '__| |/ _ \| | | / __|  | | "
echo "< <   | (__| |_| | |  | | (_) | |_| \__ \   > >"
echo " | |   \___|\__,_|_|  |_|\___/ \__,_|___/  | | "
echo "  \_\                                     /_/  "
echo ""
echo "-------------------------------------------------------------------------"
echo "Chopping onions without the tears"
echo "-------------------------------------------------------------------------"

echo "Updating npm"
echo "-------------------------------------------------------------------------"
npm update

if [[ $? -eq 0 ]] ; then
  echo "Installing missing or upgraded node modules"
  echo "-------------------------------------------------------------------------"
  npm install
fi

if [[ $? -eq 0 ]] ; then
  echo "Cleaning house"
  echo "-------------------------------------------------------------------------"
  npm run clean
fi

if [[ $? -eq 0 ]] ; then
  echo "Formating"
  echo "-------------------------------------------------------------------------"
  #npm run format:js
  #npm run write-good
fi

if [[ $? -eq 0 ]] ; then
  echo "Linting"
  echo "-------------------------------------------------------------------------"
  #npm run lint:js
  #npm run lint:md
fi

if [[ $? -eq 0 ]] ; then
  echo "Making ghost directory to satisfy needy gatsby-plugin-manifest"
  echo "-------------------------------------------------------------------------"
  mkdir -p public/images/logos
fi

if [[ $? -eq 0 ]] ; then
  echo "Building"
  echo "-------------------------------------------------------------------------"
  gatsby build
fi

if [[ $? -eq 0 ]] ; then
  echo "All good! ◉}<|="
  exit 0
else
  echo "Well now... this is a disaster! o_O"
  exit 1
fi

