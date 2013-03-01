package org.browseright.api.category

import stocksim.*
import stocksim.api.*

class PortfolioInterfaceService {
    def financeService
    
    public def _invest = { response, action, params, user ->
        def ticker
        def num
        def hasParams = false
        
        // validate the query params
        try {
            ticker = params.ticker.toUpperCase()
            num = params.num.toInteger()
            
            if (num <= 0 || ticker.length() <= 0) {
                throw new Exception()
            }
            
            hasParams = true
        } catch (Exception ex) {
            response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
        }
        
        // perform the actual investment
        if (hasParams) {
            def stock = financeService.getStock(ticker)
            
            if (stock != null) {
                if (user.purchaseStocks(stock, num)) {
                    def ownedStock = user.ownedStocks.find { it.getTicker().toUpperCase() == ticker.toUpperCase() }
                    
                    response.asset = [
                        company: [
                            ticker: stock.ticker,
                            name: stock.name,
                            lastSale: stock.lastSale,
                            marketCap: stock.marketCap,
                            ipoYear: stock.ipoYear,
                            sector: stock.sector,
                            industry: stock.industry,
                            exchange: stock.exchange
                        ],

                        numShares: ownedStock.quantity,
                        totalSpent: ownedStock.totalSpent.toDouble().trunc(2),
                        currentValue: stock.lastSale * ownedStock.quantity,
                        gain: ((stock.lastSale * ownedStock.quantity) - ownedStock.totalSpent.toDouble()).round(2)
                    ]
                } else {
                    response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
                }
            } else {
                response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
            }
        }
    }
    
    public def _sell = { response, action, params, user ->
        def ticker
        def num
        def hasParams = false
        
        // validate the query params
        try {
            ticker = params.ticker.toUpperCase()
            num = params.num.toInteger()
            
            if (num <= 0 || ticker.length() <= 0) {
                throw new Exception()
            }
            
            hasParams = true
        } catch (Exception ex) {
            response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
        }
        
        // perform the actual investment
        if (hasParams) {
            def stock = financeService.getStock(ticker)
            
            if (stock != null) {
                if (user.sellStocks(stock, num)) {
                    def ownedStock = user.ownedStocks.find { it.getTicker().toUpperCase() == ticker.toUpperCase() }
                    
                    response.asset = [
                        company: [
                            ticker: stock.ticker,
                            name: stock.name,
                            lastSale: stock.lastSale,
                            marketCap: stock.marketCap,
                            ipoYear: stock.ipoYear,
                            sector: stock.sector,
                            industry: stock.industry,
                            exchange: stock.exchange
                        ],

                        numShares: ownedStock ? ownedStock.quantity : 0,
                        totalSpent: ownedStock ?  ownedStock.totalSpent.toDouble().trunc(2) : 0,
                        currentValue: ownedStock ? (stock.lastSale * ownedStock.quantity) : 0,
                        gain: ownedStock ? (((stock.lastSale * ownedStock.quantity) - ownedStock.totalSpent.toDouble()).round(2)) : 0
                    ]
                } else {
                    response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
                }
            } else {
                response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
            }
        }
    }
    
    public def _current = { response, action, params, user ->
        def assets = []
        
        user.getOwnedStocks().each { ownedStock ->
            def stock = financeService.getStock(ownedStock.getTicker())
            
            assets.add([
                company: [
                    ticker: stock.ticker,
                    name: stock.name,
                    lastSale: stock.lastSale,
                    marketCap: stock.marketCap,
                    ipoYear: stock.ipoYear,
                    sector: stock.sector,
                    industry: stock.industry,
                    exchange: stock.exchange
                ],
                
                numShares: ownedStock.quantity,
                totalSpent: ownedStock.totalSpent.toDouble().trunc(2),
                currentValue: stock.lastSale * ownedStock.quantity,
                gain: ((stock.lastSale * ownedStock.quantity) - ownedStock.totalSpent.toDouble()).round(2)
            ])
        }
        
        response.totalSpent = user.getPrettyMoneySpentOnPortfolio()
        response.totalWorth = user.getPrettyPortfolioValue()
        
        response.assets = assets
    }
    
    public def _history = { response, action, params, user ->
        def events = []
        
        user.getOrderedHistoryEvents().each { event ->
            def stock = financeService.getStock(event.getTicker())
            
            events.add([
                date: event.getDate().toString(),

                company: [
                    ticker: stock.ticker,
                    name: stock.name,
                    lastSale: stock.lastSale,
                    marketCap: stock.marketCap,
                    ipoYear: stock.ipoYear,
                    sector: stock.sector,
                    industry: stock.industry,
                    exchange: stock.exchange
                ],

                action: event.getWasPurchase() ? "purchase" : "sale",
                quantity: event.getQuantity(),
                balanceChange: event.getMoney().toDouble()
            ])
        }
        
        response.events = events
    }
}