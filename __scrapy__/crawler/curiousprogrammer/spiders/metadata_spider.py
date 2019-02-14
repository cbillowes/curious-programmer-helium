from scrapy.spider import BaseSpider
from scrapy.selector import Selector
from curiousprogrammer.items import CuriousprogrammerItem

class MetadataSpider(BaseSpider):
    name = "metadataSpider"
    allowed_domains = ["curiousprogrammer.io"]
    start_urls = ["https://curiousprogrammer.io/archives/"]

    def parse(self, response):
        sel = Selector(response)
        item = CuriousprogrammerItem()
        item['title'] = sel.xpath('//*[@id="archives"]/li[@class="item"]/a/text()').extract()
        item['link'] = sel.xpath('//*[@id="archives"]/li[@class="item"]/a/@href').extract()
        yield item
