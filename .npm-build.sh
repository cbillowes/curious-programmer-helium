echo "Install missing or upgraded node modules"
echo "-------------------------------------------------------------------------"
npm install
npm audit fix
echo

if [ $? -eq 0 ] ; then
  echo "Cleaning house"
  echo "-------------------------------------------------------------------------"
  npm run clean
  echo
fi

if [ $? -eq 0 ] ; then
  echo "Format"
  echo "-------------------------------------------------------------------------"
  echo "Currently disabled"
  echo
  #npm run format:js
  #npm run write-good
fi

if [ $? -eq 0 ] ; then
  echo "Lint"
  echo "-------------------------------------------------------------------------"
  echo "Currently disabled"
  echo
  #npm run lint:js
  #npm run lint:md
fi

if [ $? -eq 0 ] ; then
  echo "Make ghost directory to satisfy needy gatsby-plugin-manifest"
  echo "-------------------------------------------------------------------------"
  mkdir -p public/images/logos
  echo
fi

if [ $? -eq 0 ] ; then
  echo "Build"
  echo "-------------------------------------------------------------------------"
  gatsby build
  echo
fi

if [ $? -eq 0 ] ; then
  echo "All good! :D+<"
else
  echo "Well now... this is a disaster! o_O"
fi

