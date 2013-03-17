var markdownConvertor = Markdown.getSanitizingConverter();

function markdown(src) {
	return markdownConverter.makeHtml(src);
}
