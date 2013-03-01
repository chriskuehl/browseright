package stocksim.api.category

import stocksim.*
import stocksim.api.*

class InfoInterfaceService {
    def cacheService
    def searchService
    def financeService
    def utilService
    def googleNewsService
    def googleFinanceService
    
    public def home = { response, action, params, user ->
        // stock market indicies
        response.indicies = [:]
        def indexNames = [
            [
                ticker: ".DJI",
                title: "Dow Jones Industrial Average"
            ],
            
            [
                ticker: ".INX",
                title: "S&P 500"
            ]
        ]
        
        indexNames.each { indexName ->
            def index = cacheService.fetchFromCache("indices", indexName["ticker"], (- 1))
            
            if (index != null) {
                response.indicies[indexName["ticker"]] = [
                    ticker: indexName["ticker"],
                    title: indexName["title"],
                    value: index.getCurrentValue(),
                    direction: (index.isUp() ? 1 : (- 1)),
                    changeText: index.getPercentChangeText(),
                    graphLink: "http://charts.reuters.com/reuters/enhancements/chartapi/chart_api.asp?width=\${width}&height=\${height}&symbol=${indexName["ticker"]}&duration=5&headertype=none"
                ]
            }
        }
        
        // financial news
        response.news = []
        
        googleNewsService.getNewsArticles("finance").each { article ->
            def articleInfo = [
                title: article.title,
                link: article.link,
                author: article.author,
                relatedLink: article.relatedLink,
                description: article.description
            ]
            
            // add to response
            response.news.add(articleInfo)
        }
        
        // gainers/losers
        response.gainersLosers = [:]
        
        def gainersLosers = googleFinanceService.getGainersLosers()
        def categories = ["gainers", "losers"]
        
        categories.each { category ->
            def group = gainersLosers[category]
            response.gainersLosers[category] = [:]
            
            group.each { stock ->
                response.gainersLosers[category][stock.ticker] = [
                    ticker: stock.ticker,
                    name: stock.name,
                    lastSale: stock.lastSale,
                    marketCap: stock.marketCap,
                    ipoYear: stock.ipoYear,
                    sector: stock.sector,
                    industry: stock.industry,
                    exchange: stock.market
                ]
            }
        }
    }
    
    public def search = { response, action, params, user ->
        def results = searchService.getResults(params["query"], 20, false)
        def flatResults = []

        results.each { stock ->
            flatResults.add([
                ticker: stock.ticker,
                name: stock.name,
                lastSale: stock.lastSale,
                marketCap: stock.marketCap,
                ipoYear: stock.ipoYear,
                sector: stock.sector,
                industry: stock.industry,
                exchange: stock.exchange
            ])
        }

        response.results = flatResults
    }
    
    public def sectors = { response, action, params, user ->
        response.sectors = financeService.getSectors()
    }
    
    public def browse = { response, action, params, user ->
        def results = searchService.getResults(params["sector"], 20, true)
        def flatResults = []

        results.each { stock ->
            flatResults.add([
                ticker: stock.ticker,
                name: stock.name,
                lastSale: stock.lastSale,
                marketCap: stock.marketCap,
                ipoYear: stock.ipoYear,
                sector: stock.sector,
                industry: stock.industry,
                exchange: stock.exchange
            ])
        }

        response.results = flatResults
    }
}