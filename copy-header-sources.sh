
read -p "Do you have an up-to-date version of the maintenance app located at ../maintenance-app ? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo -n "Copying maintenance app search index... "
  cp ../maintenance-app/src/config/maintenance-models.js src/app-header/search/sources/maintenance-app/maintenance-models.js && echo "done!"
else
  echo "Skipping..."
fi


read -p "Do you have an up-to-date version of the settings app located at ../settings-app ? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo -n "Copying settings app search index... "
  cp ../settings-app/src/settingsCategories.js src/app-header/search/sources/settings-app/settingsCategories.js && echo "done!"
else
  echo "Skipping..."
fi
