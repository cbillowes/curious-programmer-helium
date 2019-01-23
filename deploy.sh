echo "{ curious programmer }"
echo "Getting ready to deploy this baby"
echo "//=\\\=//=\\\=//=\\\=//=\\\=//=\\\=//=\\\="

echo "Goin' on a man hunt"
echo "-------------------"
npm install

echo "Tidy up"
echo "-------"
npm run clean

echo "Spooky! Creating ghost directory"
echo "--------------------------------"
mkdir -p public/images/logos

echo "Hammer and cement"
echo "-----------------"
gatsby build

echo "¯\_(ツ)_/¯"
