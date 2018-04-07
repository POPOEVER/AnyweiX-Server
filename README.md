# anyweiX

anyweiX 一个是基于 Node.js 和 Express.js 搭建的微信公众号文章爬虫


安装方法
---

	$ npm install

长城里用户或服务器环境可以使用淘宝镜像

	$ npm set registry https://registry.npm.taobao.org/


运行方法
---

* **测试环境**

		$ npm start


* **生产环境 (后台运行)**

		$ nohup node awx.js &

* **或者安装 pm2 (推荐)**

		$ npm install -g pm2
		$ pm2 start awx.js


停止或重启
---

* 直接用 node 命令启动的进程我只知道酱紫😯

		$ pkill node

* 使用 pm2 管理进程的话

		$ pm2 stop awx
		$ pm2 restart awx


查看 Node 记录 (pm2)
---

	pm2 logs awx


查看进程服务状态 (pm2)
---

	pm2 list awx


查看进程详情 (pm2)
---

	pm2 show awx


服务器配置相关的参考文章
---
* [在 CentOS 7 上用包管理器安装 Node.js](https://medium.com/@popoever/%E5%9C%A8-centos-7-%E4%B8%8A%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8%E5%AE%89%E8%A3%85-nodejs-d5286bd657)


联系
---
[popoever@gmail.com](mailto:popoever@gmail.com)

	微信: POPOEVER


-EOF-
