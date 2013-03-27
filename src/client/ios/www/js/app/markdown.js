var markdownConverter = Markdown.getSanitizingConverter();

function markdown(src) {
	src = src.replace(/\\n/g, "\n");
	src = markdownConverter.makeHtml(src);
	src = src.replace(/\[YOUTUBE:(.*?)\]/g, "<iframe width=\"1280\" height=\"720\" src=\"http://www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>");
	
	return src;
}
// <iframe width="1280" height="720" src="http://www.youtube.com/embed/luL9ETS6TOc" frameborder="0" allowfullscreen></iframe>