var markdownConverter = Markdown.getSanitizingConverter();

function markdown(src) {
	src = src.replace(/\\n/g, "\n");
	src = markdownConverter.makeHtml(src);
	src = src.replace(/\[YOUTUBE:(.*?)\]/g, "<iframe width=\"1280\" height=\"720\" src=\"http://www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>");
	//src = src.replace(/\[YOUTUBE:(.*?)\]/g, "<video width=\"1280\" height=\"720\" controls><source src=\"videos/$1.mp4\" type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'></video>")
		
	return src;
}

function markdownLittle(src) {
	src = src.replace("\n", "");
	src = markdownConverter.makeHtml(src);
	src = src.replace(/<p>(.*)<\/p>/g, "$1");
	
	return src;
}