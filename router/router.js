const getResult = require('../api/wx.js')

const appRouter = function (app) {

	app.get("/", function(req, res) {
		res.status(200).send({
			"isSucceeded": true,
			"data": {
				"message":"Nothing to look here"
			}
		})
	})

	app.get("/api/list", function(req, res) {

		let params = req.query

		getResult(params, function(data) {

			if(data.data === []) {
				res.status(200).send({
					"isSucceeded": true,
					"data": {
						"message": "没有找到匹配的结果"
					}
				})
			} else {
				res.status(200).send(data)
			}
		})

	})
}

module.exports = appRouter
