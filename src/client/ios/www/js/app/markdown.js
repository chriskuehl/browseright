var markdownConverter = Markdown.getSanitizingConverter();

function markdown(src) {
	src = src.replace(/\\n/g, "\n");
	return markdownConverter.makeHtml(src);
}
