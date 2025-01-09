# Liquid Galaxy API

> The API that's running behind the Liquid Galaxy scenes and powering its applications.

[![Build Status](https://travis-ci.org/LiquidGalaxyLAB/liquid-galaxy-api.svg?branch=master)](https://travis-ci.org/LiquidGalaxyLAB/liquid-galaxy-api)
[![David](https://david-dm.org/LiquidGalaxyLAB/liquid-galaxy-api.svg)](https://david-dm.org/LiquidGalaxyLAB/liquid-galaxy-api)
[![David](https://david-dm.org/LiquidGalaxyLAB/liquid-galaxy-api/dev-status.svg)](https://david-dm.org/LiquidGalaxyLAB/liquid-galaxy-api#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/LiquidGalaxyLAB/liquid-galaxy-api/badge.svg?branch=master)](https://coveralls.io/github/LiquidGalaxyLAB/liquid-galaxy-api?branch=master)
[![Code Climate](https://codeclimate.com/github/LiquidGalaxyLAB/liquid-galaxy-api/badges/gpa.svg)](https://codeclimate.com/github/LiquidGalaxyLAB/liquid-galaxy-api)

## Liquid Galaxy quickstart

Install / upgrade **(on the master machine only)**:

```
bash <(curl -s https://raw.githubusercontent.com/LiquidGalaxyLAB/liquid-galaxy-api/master/scripts/install.sh)
```

The API will be available under port **82** (proxy served by Apache). http://localhost:82 

No further steps are required.

*Reminder: [php-interface](https://github.com/LiquidGalaxyLAB/liquid-galaxy/tree/master/php-interface) is by default running on port 81 (also served by Apache).*

## Manual installation

**Install on the master machine only!**

Requirements:

- [Node 8+](https://nodejs.org/en/download/package-manager/)

Node dependencies:

`npm install`

Run with:

`npm run start` or `npm run start-dev` (debug)

You might need to create an iptables TCP exception. The API is running under port **3030** by default.


# Troubleshooting (16.04 Lts)
While running the script if you face issues follow the guide below

# **Sudo/Local Node version**

1. Check for sudo and Local node versions of node
    
    ```bash
    sudo node -v
    ```
    
    ```bash
    node -v
    ```
    
    Normally you should get this version for **Both** 
    
    ```bash
    v8.xx.x
    ```
    

1. If you get the error 
    
    ```bash
    node: /lib/x86_64-linux-gnu/libm.so.6: version `glibc_2.27' not found (required by node)
    ```
    
    **Solution**
    
    1. Check for which user you are getting it and then **follow this tutorial** to remove the NodeJS version 
    
    [How can I completely uninstall nodejs, npm and node in Ubuntu](https://stackoverflow.com/questions/32426601/how-can-i-completely-uninstall-nodejs-npm-and-node-in-ubuntu)
    
    b.  Then, install Node 8 using the below command
    
    ```
    curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
    ```
    
    ```
    sudo apt-get install -qq nodejs
    ```
    
    c. After that install Npm 
    
    ```
    sudo apt-get install npm
    ```
    
    d. install the script Again
    
    ```bash
    bash <(curl -s [https://raw.githubusercontent.com/LiquidGalaxyLAB/liquid-galaxy-api/master/scripts/install.sh](https://raw.githubusercontent.com/LiquidGalaxyLAB/liquid-galaxy-api/master/scripts/install.sh))
    ```
    

 e. check logs 

```bash
sudo pm2 log
```

If you can see API listening on port 3030 , Hit [**http://localhost:82**](http://localhost:82)

```bash
[TAILING] Tailing last 15 lines for [all] processes (change the value with --lines option)
/home/lg/.pm2/pm2.log last 15 lines:
...
/home/lg/.pm2/logs/api-error.log last 15 lines:
...
0|api      | WARNING: See https://github.com/lorenwest/node-config/wiki/Strict-Mode
0|api      | Tue, 07 Jan 2025 21:59:20 GMT info -·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-
0|api      | Tue, 07 Jan 2025 21:59:20 GMT info 🌐  API listening on port 3030
0|api      | Tue, 07 Jan 2025 21:59:20 GMT info -·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-
0|api      | Tue, 07 Jan 2025 21:59:24 GMT info [Firebase] Signed in as BJIvaloH1l (no password)
0|api      | Tue, 07 Jan 2025 22:08:55 GMT info ::1 - - [07/Jan/2025:22:08:55 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
```

# Pm2 Version Mismatch

1. If you get this Error while installing the script that 

```bash
Pm2 Version (In Memory) 5.3.1
Pm2 version 3.5.1
```

Follow this Tutorial :

[Can't update(uninstall/install) pm2 version 0.7.8](https://stackoverflow.com/questions/37524927/cant-updateuninstall-install-pm2-version-0-7-8)

Then, check below

**Solution**

1. uninstall the version

```bash
sudo npm uninstall pm2
```

b. Install the **3.5.1** version

```bash
sudo npm install pm2@3.5.1 -g
```

c. install the script Again

```bash
bash <(curl -s [https://raw.githubusercontent.com/LiquidGalaxyLAB/liquid-galaxy-api/master/scripts/install.sh](https://raw.githubusercontent.com/LiquidGalaxyLAB/liquid-galaxy-api/master/scripts/install.sh))
```

Follow Step “e” above

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)
