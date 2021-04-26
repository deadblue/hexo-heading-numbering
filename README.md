# hexo-heading-numbering

![](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square)
![](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

Automatically add numbered index for the headings in hexo post.

## Usage

1. Run following command in your blog directory.

```shell
npm install github:deadblue/hexo-heading-numbering --save
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
