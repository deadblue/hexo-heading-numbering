# hexo-heading-numbering

![](https://img.shields.io/badge/Version-1.0.1-brightgreen?style=flat-square)
![](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

Automatically add numbered index for the headings in hexo post.

## Example

Assume the post is:

```markdown
# Top heading
## Sub heading
## Another sub heading
# Another top heading
```

Then it will be rendered as:

```text
1 Top heading
1.1 Sub heading
1.2 Another sub heading
2 Another top heading
```

## Usage

1. Run following command in your blog directory.

```shell
npm install hexo-heading-numbering --save
```

2. Add following content in `_config.yml` (under blog root directory).

```yaml
heading_numbering:
  enable: true
  separator: "."
  prefix: ""
  suffix: " "
```

3. Clean and rebuild.

```shell
hexo cl && hexo g
```

## Support

Hexo v5.x (Tested on v5.4.0)

## License

MIT
