#!/bin/bash
# API installation / upgrade script for Liquid Galaxy.
TARGET_DIR="$HOME/api"
SOURCE_CODE="https://github.com/LiquidGalaxyLab/liquid-galaxy-api"

if [ "$EUID" -eq 0 ]; then
  echo "Do not run as root!"
  exit
fi

apache2=$(which apache2)
if [ "$apache2" = "" ]; then
  echo "Apache2 installation was not found. Make sure you are running this script on the Liquid Galaxy master."
  exit;
fi

# Apache port.
echo "NameVirtualHost *:82" | sudo tee -a /etc/apache2/ports.conf > /dev/null
echo "Listen 82" | sudo tee -a /etc/apache2/ports.conf > /dev/null

# API Apache configuration.
sudo a2enmod proxy proxy_http rewrite
sudo tee "/etc/apache2/sites-available/api.conf" > /dev/null << EOM
<VirtualHost *:82>
    RewriteEngine On
    RewriteCond %{REQUEST_URI}  ^/socket.io            [NC]
    RewriteCond %{QUERY_STRING} transport=websocket    [NC]
    RewriteRule /(.*)           ws://localhost:3001/$1 [P,L]
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

# Install Node.js 8.x
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -qq nodejs

# Install specific PM2 version
echo "Installing PM2 version 3.5.1..."
sudo npm install pm2@3.5.1 -g

# Verify PM2 version and enforce if needed
PM2_VERSION=$(pm2 -v)
if [ "$PM2_VERSION" != "3.5.1" ]; then
    echo "Warning: PM2 version mismatch. Forcing version 3.5.1..."
    sudo npm install -g pm2@3.5.1
fi

if [ -d "$TARGET_DIR" ]; then
  pm2 delete api 2>/dev/null || true
else
  git clone $SOURCE_CODE $TARGET_DIR # New installation -> clone source code repository.
fi

(
  cd "$TARGET_DIR"
  git pull
  npm install
  pm2 --name api start npm -- start
  pm2 save
)

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u "$(whoami)" --hp "/home/$(whoami)"
echo "You're all set!"
