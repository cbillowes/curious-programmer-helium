from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import Selector
from curiousprogrammer.items import CuriousprogrammerItem

class PostSpider(CrawlSpider):
    name = "postSpider"
    allowed_domains = ["curiousprogrammer.io"]
    start_urls = ["https://www.curiousprogrammer.io/blog/"]
    rules = [Rule(SgmlLinkExtractor(restrict_xpaths=('//*[@id="archives"]/li[@class="item"]/a')), callback='parse_post')]

    def pares_post(self, response):
        sel = Selector(response)
        item = CuriousprogrammerItem()
        item['title'] = sel.xpath('//*[@id="title"]/text()').extract()
        item['link'] = response.url
        item['post'] = sel.xpath('//[@class="container-post"]text()').extract()
        yield item
