# AnyweiX

AnyweiX 一个是基于 Node.js 和 Express.js 搭建的微信公众号文章爬虫

安装方法
---

	npm install

大陆地区用户或服务器环境可以使用淘宝镜像和 cnpm 指令

	cnpm install

运行方法
---

* **测试环境**

		npm start


* **生产环境 (后台运行)**

		nohup node index.js &

* **或者安装 pm2 (推荐)**

		npm install -g pm2
		pm2 start index.js

停止或重启
---

* 直接用 node 命令启动的进程我只知道酱紫😯

		pkill node

* 使用 pm2 管理进程的话

		pm2 stop
		pm2 restart

查看 Node 记录 (pm2)
---

	pm2 logs index

查看进程服务状态 (pm2)
---

	pm2 list index

查看进程详情 (pm2)
---

	pm2 show index

联系
---
[popoever@gmail.com](mailto:popoever@gmail.com)

	微信: POPOEVER

-EOF-
