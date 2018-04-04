const url = require('url')
const domParser = require('cheerio')

function hotWords(data, response, cb) {
	response.data.hotwords = []
	let $ = domParser.load(data)
	$('#topwords a').each((i,e) => {
		let keyword = $(e).text()
		let popularity = $(e).next().find('span').attr('style').split(':')[1]
		response.data.hotwords[response.data.hotwords.length] = {
			"keyword": keyword,
			"popularity": popularity
		}
	})
	cb(response)
}

function articleList(data, response, cb) {
	response.data.articles = []
	response.data.category = []
	let $ = domParser.load(data)
	// 判断是打开页面还是页面内加载更多
	let target = $('ul.news-list li').length > 0 ? $('ul.news-list li') : $('li')
	// 取出文章列表
	target.each((i,e) => {
		let titleObj = $(e).find('.txt-box h3 a')
		let link = titleObj.attr('href')
		let title = titleObj.text()
		let desc = $(e).find('.txt-info').text()
		let author = $(e).find('.s-p .account').text()
		let imgObj = $(e).find('.img-box img').length > 0 ? $(e).find('.img-box img') : $(e).find('.txt-box .img-d img').eq(0)
		let img = decodeURIComponent(imgObj.attr('src').split('url=')[1])
		let query = url.parse(link,true).query
		response.data.articles[response.data.articles.length] = {
			"title": title,
			"description": desc,
			"author": author,
			"link": link,
			"image": img,
			"query": query
		}
	})
	// 取出文章分类
	let category = $('.tab-box a')
	category.each((i,e) => {
		let categoryID = $(e).attr('id')
		let categoryName = $(e).text()
		response.data.category[response.data.category.length] = {
			"id": categoryID,
			"name": categoryName
		}
	})
	cb(response)
}

function all(data, response, cb) {
	hotWords(data, response, interim_res => {
		articleList(data, interim_res, res => {
			cb(res)
		})
	})
}

module.exports = {
	articleList: articleList,
	hotWords: hotWords,
	all: all
}
