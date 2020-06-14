
#!/bin/bash
if [ $# -ne 1 ] 
then
 echo Usage: ngrokshopify.sh app-admin-url
 echo Example: ngrokshopify.sh https://partners.shopify.com/123456/apps/1234567/edit
 exit 1
fi 

echo killing old ngrok processes
echo ===========================
pkill -9 ngrok
jobs
sleep 1

# start ngrok
echo 'ngrok http 3000 &' 
echo ====================
nohup ngrok http 3000 1>&- 2>&- &
sleep 4
url=`curl -s localhost:4040/api/tunnels | grep -P  --only-matching https://.*?ngrok.io`
subdomain=`echo $url | cut -d'.' -f 1 | cut -d'/' -f 3`
echo "ngrok URL: $url"
echo "ngrok ngrok subdomain: $subdomain"
echo ====================================================

google-chrome $1 1>&- 2>&-
read -p 'Login to Shopify app admin and press a to abort, other to continue: ' cont
if [ "$cont" = 'a' ]
then
  exit 2
fi

str='?subdomain='
appurl=$1$str$subdomain
google-chrome $appurl 1>&- 2>&-
