# ghost-app-frontmatter

Ghost app to enable front matter on ghost posts

This app allow you to use frontmatter (yaml) in the post description, then you could access to extra data in the property data of the post

## Example

You can use fron matter using the `+++`delimiter (should be configurable soon)

```markdown
+++
yaml_key: 'Awesome Data'
another_key: 10
another_key2: 10
+++

# My Blog Post

Front matter is awesome
```

Then you could use the `data`property of the post object in yours template

post.hbs
```handlebars
<div>{{data.yaml_key}}</div>
```



