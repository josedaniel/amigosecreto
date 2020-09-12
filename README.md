# Amigo Secreto
Un app para jugar amigo secreto en tiempos de pandemia.

## Stack

### API
- Node.js
- [VulkanoJS](https://https://github.com/vulkanojs/vulkano) (A MVC Framework for Node.js)
- [Express](http://expressjs.com)
- [Mongoose](http://mongoosejs.com/)
- [Nunjucks](http://mozilla.github.io/nunjucks/) (Template Engine)
- [Nodemon](http://nodemon.io/) (Reload automatically for dev mode)
- [PM2](http://pm2.keymetrics.io/) (Deployment)
- [Gulp](https://gulpjs.com/) (Automate and enhance your workflow)
- [BrowserSync](https://www.browsersync.io/) (Time-saving synchronised browser testing)
- [WebPack](https://webpack.js.org/) (Bundle your scripts)

## Install
- `yarn`

### System

- Unix
- Node.js v10+

### Packages

```bash
$ yarn install
```

## Workflow

| Command                          | Description                               |
| :------------------------------- | :---------------------------------------- |
| `yarn run dev`                   | Run development server and watch 4 changes|
| `yarn run start`                 | Start development server                  |
| `yarn run production`						 | Start production server                   |
| `yarn run pm2 --env=production`  | Start production server with PM2          |
| `yarn run deploy:heroku`         | Update Heroku app                         |
| `yarn run deploy:server`         | Deploy app into server                    |
| `yarn run gulp`                  | Start browsersync & sass                  |
| `yarn run webpack`               | Start webpack                             |

