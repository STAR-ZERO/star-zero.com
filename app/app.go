package app

import (
	"net/http"
	"html/template"
)

type Link struct {
	Name string
	URL  string
}

var links = []Link{
	{
		Name: "Twitter",
		URL:  "https://twitter.com/STAR_ZERO",
	},
	{
		Name: "GitHub",
		URL:  "https://github.com/STAR-ZERO",
	},
	{
		Name: "Medium",
		URL:  "https://medium.com/@star_zero",
	},
	{
		Name: "Hatena blog",
		URL:  "http://starzero.hatenablog.com",
	},
	{
		Name: "Tumblr",
		URL:  "https://tumblr.star-zero.com",
	},
}

func init() {
	http.HandleFunc("/", index)
}

func index(w http.ResponseWriter, _ *http.Request) {
	t := template.Must(template.ParseFiles("template/index.tmpl"))
	t.Execute(w, links)
}
