# wxz12345.github.io

Xizhi Wang 的个人学术主页：https://wxz12345.github.io

纯静态页面（HTML + CSS + 少量 JS），没有构建步骤，GitHub Pages 直接托管。

## 文件结构

```
index.html                     # 全部内容都在这里
assets/css/style.css           # 样式（配色变量在文件开头的 :root 中）
assets/js/main.js              # 语言切换、深色模式、BibTeX 展开、滚动动画
assets/img/                    # 头像、favicon、论文 teaser 图
```

## 常见修改

- **中英双语**：每段文字都有两份，`data-l="en"` 是英文，`data-l="zh"` 是中文，改的时候两份一起改。
- **头像**：把照片放到 `assets/img/avatar.jpg`，再把 `index.html` 里的 `avatar-placeholder.svg` 改成 `avatar.jpg`。
- **新增论文**：复制 `<article class="pub">…</article>` 整块并修改；顶会可以用 `venue venue--top` 高亮。
- **新增动态**：在 News 部分复制一个 `<li class="news__item">`。
- 在 `index.html` 里搜索 `TODO` 可以找到所有还没填的占位内容。

本地预览：

```bash
python3 -m http.server 8000
```

论文、最新动态和 Google Scholar 引用统计均为静态内容，不会自动同步；更新时需修改 `index.html`，中英文内容一起维护。
