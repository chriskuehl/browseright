<%@ page contentType="text/html; charset=utf-8" %><!doctype html>
<html>
  <head>
	<title><g:layoutTitle default="BrowseRight"/></title>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.png')}" type="image/x-icon">
	
	
	<style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }

      @media (max-width: 980px) {
        /* Enable use of floated navbar text */
        .navbar-text.pull-right {
          float: none;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    </style>
	
	<g:javascript library="bootstrap" />
	
	<g:layoutHead />
	<r:layoutResources />
  </head>
  
  <body>
	<!-- nav bar -->
	<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <g:link class="brand" uri="/dev/content">BrowseRight Content Editor</g:link>
          <div class="nav-collapse collapse">
            <p class="navbar-text pull-right">
              &copy; 2013 Chris Kuehl, Caleb Dotson
            </p>
            <ul class="nav">
              <!-- <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li> -->
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
	<!-- / nav bar -->
	
	<div class="container-fluid">
      <div class="row-fluid">
        <div class="span3">
          <div class="well sidebar-nav">
            <ul class="nav nav-list">
			  <g:each var="category" in="${org.browseright.Category.findAll()}">
				<li class="nav-header">${category.title}</li>
				
				<g:each var="section" in="${category.sections}">
				  <li><a href="#"><i class="icon-folder-open"></i> ${section.title}</a></li>
				  
				  <g:each var="item" in="${section.items}">
					<li><a style="padding-left: 40px" href="#"><i class="icon-file"></i> ${item.title}</a></li>
				  </g:each>
				  
				  <li><a style="padding-left: 40px" href="#"><i class="icon-plus-sign"></i> Add New Item</a></li>
				</g:each>
				
				<li><a href="#"><i class="icon-plus-sign"></i> Add New Section</a></li>
			  </g:each>
            </ul>
          </div><!--/.well -->
        </div><!--/span-->
        <div class="span9">
		  <g:layoutBody/>
		  <r:layoutResources />
		</div><!--/span-->
	  </div><!--/row-->
	</div><!--/.fluid-container-->
  </body>
</html>