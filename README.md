## 准备
* 安装依赖 `npm install`
* 配置nginx，配置文件如`./nginx.conf`

## 开发
```
./node_modules/webpack/bin/webpack.js -w --config build/webpack.dev.conf.js
```

## 发布
`sh deploy.sh`

