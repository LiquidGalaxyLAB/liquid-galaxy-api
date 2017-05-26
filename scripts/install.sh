#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

apache2=$(which apache2)
if [ "$apache2" = "" ]; then
  echo "Apache2 installation was not found. Make sure you are running this script on the Liquid Galaxy master."
  exit;
fi

# Apache port.
echo "NameVirtualHost *:82" | sudo tee -a /etc/apache2/ports.conf > /dev/null
echo "Listen 82" | sudo tee -a /etc/apache2/ports.conf > /dev/null

# API Apache configuration.
sudo a2enmod proxy proxy_http
sudo tee "/etc/apache2/sites-available/api.conf" > /dev/null << EOM
<VirtualHost *:82>
	ProxyRequests off

	<Proxy *>
		Order deny,allow
		Allow from all
	</Proxy>

	<Location />	
		ProxyPass http://localhost:3030/
		ProxyPassReverse http://localhost:3030/
	</Location>
</VirtualHost>
EOM
sudo a2ensite api.conf

sudo /etc/init.d/apache2 reload

sudo iptables -I INPUT 1 -p tcp --dport 82 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables.conf > /dev/null

curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get install -qq nodejs
sudo npm install pm2 -g
(
  cd "$DIR/.."
  npm install
  pm2 start npm -- start
)
sudo pm2 startup

echo "You're all set!"
