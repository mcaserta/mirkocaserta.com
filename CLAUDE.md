# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a personal website built with Zola, a fast static site generator written
in Rust. The site is configured to be deployed to `https://mirkocaserta.com`.

## Development Commands

**Build the site:**

```bash
zola build
```

**Serve locally with auto-reload:**

```bash
zola serve
```

**Check project without rendering (validates links):**

```bash
zola check
```

## Project Structure

- `config.toml` - Main configuration file with site settings
- `content/posts/` - Blog posts (Markdown)
- `content/pages/` - Standalone pages (Markdown)
- `themes/modern-i18n/templates/` - Tera templates
- `themes/modern-i18n/sass/main.scss` - Styles
- `themes/modern-i18n/static/js/theme.js` - Theme switching JS
- `themes/modern-i18n/i18n/` - Translation files (en.toml, it.toml, es.toml)
- `static/` - Static assets (images, downloads, etc.)

## Configuration

The site is configured in `config.toml` with:

- Sass compilation enabled
- Search index building enabled
- Syntax highlighting enabled for code blocks
- Base URL set to production domain

## Theme Features

The site uses the "modern-i18n" theme with the following features:

### Internationalization

- **Multilingual support** for English (default), Italian, and Spanish
- Language switcher in the footer
- Localized navigation labels and content
- Separate language configurations in config.toml

### Design & Typography

- **Modern font stacks** based on modernfontstacks.com
- Primary font: Classical Humanist (Optima, Candara, 'Noto Sans',
  source-sans-pro, sans-serif)
- Code font: Monospace Code (ui-monospace, 'Cascadia Code', 'Source Code Pro',
  Menlo, Consolas, 'DejaVu Sans Mono', monospace)
- **Dark/Light theme switching** with OS preference auto-detection
- **Responsive design** optimized for all screen sizes

### Content Management

- **Blog post listing** on homepage with recent posts
- **Category and tag support** with dedicated archive pages
- **Post navigation** between previous/next articles
- **Reading time estimation**
- Support for featured images, summaries, and metadata

### Development Notes

- Templates are located in `themes/modern-i18n/templates/`
- Styles are in `themes/modern-i18n/sass/main.scss`
- JavaScript for theme switching in `themes/modern-i18n/static/js/theme.js`
- Sample content created in `content/posts/`
- Taxonomies configured for categories and tags

## Important Development Guidelines

### Shell Command Usage

**DO NOT use shell commands directly via Bash tool** like `find`, `grep`, `ls`,
`cat`, `head`, `tail`, etc. Instead use Claude Code's internal tools:

- Use `Glob` instead of `find` to locate files
- Use `Grep` instead of `grep` to search file contents
- Use `Read` instead of `cat`, `head`, `tail` to read files
- Use `Bash` only for actual build/run commands like `zola build`, `zola serve`,
  etc.

### Content Translations (MANDATORY)

**Every post and page MUST exist in all 3 languages: English (default), Italian,
and Spanish.**

When creating or editing content, always produce all language variants:

```
content/posts/
  my-post.md       # English (default)
  my-post.it.md    # Italian
  my-post.es.md    # Spanish

content/pages/
  my-page.md       # English (default)
  my-page.it.md    # Italian
  my-page.es.md    # Spanish
```

Each file must have its own frontmatter with a translated `title`,
`description`, and body content. Categories and tags should also be translated
where appropriate.

When asked to write a new post or page, always create all 3 files. When editing
an existing post or page, apply the change across all language variants.

### Markdown Formatting (MANDATORY)

After creating or modifying any `.md` file, **always format it** before
considering the task done:

1. **If `prettier` is available locally**, run:
   ```bash
   prettier --write path/to/file.md
   ```
2. **If `prettier` is not available**, format the file manually following the
   rules in `.prettierrc`:
   - `proseWrap: always` — wrap prose at the print width
   - `printWidth: 80` — 80 characters per line
   - `tabWidth: 2` — 2-space indentation
   - `useTabs: false` — spaces only, no tabs

### i18n Reference

- Translation string files: `themes/modern-i18n/i18n/{en,it,es}.toml`
- Template translation function:
  `{{ trans(key="key_name", default="Fallback") }}`
- Language config is in `config.toml` under `[languages.en]`, `[languages.it]`,
  `[languages.es]`
