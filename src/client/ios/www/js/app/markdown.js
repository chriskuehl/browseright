var markdownConverter = Markdown.getSanitizingConverter();

function markdown(src) {
	return markdownConverter.makeHtml(src);
}
