echo "Install missing or upgraded node modules"
echo "-------------------------------------------------------------------------"
npm install

if [[ $? -eq 0 ]] ; then
  echo "Cleaning house"
  echo "-------------------------------------------------------------------------"
  npm run clean
fi

if [[ $? -eq 0 ]] ; then
  echo "Format"
  echo "-------------------------------------------------------------------------"
  #npm run format:js
  #npm run write-good
fi

if [[ $? -eq 0 ]] ; then
  echo "Lint"
  echo "-------------------------------------------------------------------------"
  #npm run lint:js
  #npm run lint:md
fi

if [[ $? -eq 0 ]] ; then
  echo "Make ghost directory to satisfy needy gatsby-plugin-manifest"
  echo "-------------------------------------------------------------------------"
  mkdir -p public/images/logos
fi

if [[ $? -eq 0 ]] ; then
  echo "Build"
  echo "-------------------------------------------------------------------------"
  gatsby build
fi

if [[ $? -eq 0 ]] ; then
  echo "All good! :D+<"
else
  echo "Well now... this is a disaster! o_O"
fi

