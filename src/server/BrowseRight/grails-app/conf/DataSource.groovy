hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}

// environment specific settings
environments {
    development {
        dataSource {
            url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
			
			pooled = true
			driverClassName = "org.h2.Driver"
			username = "sa"
			password = ""
			
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
        }
    }
    
    production {
        dataSource {
            dbCreate = "update"
			
            url = System.env.JDBC_URL
            username = System.env.JDBC_USERNAME
            password = System.env.JDBC_PASSWORD
			
			// misc options
			pooled = true
			driverClassName = "com.mysql.jdbc.Driver"
			dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"

			// resolve an issue with stale connections and Grails due to automatic
			// connection pooling done by Grails (enabled above)
			// http://stackoverflow.com/questions/2740987/mysql-connection-timeout-issue-grails-application-on-tomcat-using-hibernate-an

			// run the evictor every 30 minutes and evict any connections older than 30 minutes.
			minEvictableIdleTimeMillis = 1800000
			timeBetweenEvictionRunsMillis = 1800000
			numTestsPerEvictionRun = 3

			// test the connection while its idle, before borrow and return it
			testOnBorrow = true
			testWhileIdle = true
			testOnReturn = true
			validationQuery = "SELECT 1"
        }
    }
}