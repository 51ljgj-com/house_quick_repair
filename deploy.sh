name="house_quick_repair.release_.tar.gz"
rm -rf ./dist
#npm run build
./node_modules/webpack/bin/webpack.js --config build/webpack.dev.conf.js
tar -zcf house_quick_repair.release_.tar.gz dist
scp $name root@139.129.14.24:/var/www/house_repair_release/
ssh root@139.129.14.24 "cd /var/www/house_repair_release ; tar -zxf $name"
rm -rf $name
