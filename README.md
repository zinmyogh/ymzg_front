# md_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Nginx (handle cors)
vue 线上跨域问题解决，本地可以通过vue.config.js -> devServer配置 -> 解决。但是线上必须同过 NGINX 来解决。
```
{
    location /apis {
        rewrite  ^.+apis/?(.*)$ /$1 break;
        include  uwsgi_params;
        proxy_pass   http://api.smsbao.com;
        #关键部分start
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,token';
        #关键部分end
    }
}
```