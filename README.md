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
bash ./scripts/install.sh
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

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)