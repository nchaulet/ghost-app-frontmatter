var App       = require('ghost-app'),
    Showdown  = require('showdown-ghost'),
    converter = new Showdown.converter({extensions: ['ghostgfm', 'footnotes', 'highlight']}),
    matter    = require('gray-matter');

var parseFrontMatter = function(post) {
    post.markdown = post.markdown.replace(/^\n/, '');
    var parsed = matter(post.markdown, {
        delims: ['+++', '+++']
    });
    post.markdown = parsed.content;
    post.html = converter.makeHtml(post.markdown);
    post.data = parsed.data;
};

var cleanDescription = function(description) {
    return description.replace(/\+\+\+[\S\s]*\+\+\+/m, '');
};

var MyApp = App.extend({
    install: function () {},
    uninstall: function () {},

    activate: function () {
        this.ghost.filters.register('prePostsRender', function (posts) {
            if (posts instanceof Array) {
                posts.forEach(function(post) {
                    parseFrontMatter(post);
                });
            } else {
                parseFrontMatter(posts);
            }

            return posts;
        });

        this.ghost.filters.register('rss.feed', function(feed) {

            feed.items.forEach(function(item) {
                var contentEncoded    = item.custom_elements[0]['content:encoded'];
                contentEncoded._cdata = cleanDescription(contentEncoded._cdata);
                item.description      = cleanDescription(item.description);
            })
            return feed;
        });
    },

    deactivate: function () {}
});

module.exports = MyApp;
