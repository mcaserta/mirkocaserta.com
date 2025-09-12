# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Zola, a fast static site generator written in Rust. The site is configured to be deployed to `https://mirkocaserta.com`.

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

This is a standard Zola static site with the following structure:

- `config.toml` - Main configuration file with site settings
- `content/` - Markdown content files and pages (currently empty)
- `templates/` - Tera templates for rendering pages (currently empty)
- `sass/` - Sass/SCSS stylesheets (currently empty)
- `static/` - Static assets like images, fonts, etc. (currently empty)

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
- Primary font: Classical Humanist (Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif)
- Code font: Monospace Code (ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace)
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

**DO NOT use shell commands directly via Bash tool** like `find`, `grep`, `ls`, `cat`, `head`, `tail`, etc. Instead use Claude Code's internal tools:

- Use `Glob` instead of `find` to locate files
- Use `Grep` instead of `grep` to search file contents  
- Use `Read` instead of `cat`, `head`, `tail` to read files
- Use `Bash` only for actual build/run commands like `zola build`, `zola serve`, etc.

### Internationalization (i18n) Implementation

The theme is prepared for i18n but currently uses English-only strings for stability. To implement proper internationalization:

#### 1. Translation Files
Translation files are in the `themes/modern-i18n/i18n/` directory:
- `en.toml` - English translations
- `it.toml` - Italian translations  
- `es.toml` - Spanish translations

#### 2. Configuration Setup
To enable i18n, uncomment and configure these lines in `config.toml`:
```toml
default_language = "en"

[languages.en]
taxonomies = [
    {name = "categories", paginate_by = 10},
    {name = "tags", paginate_by = 10},
]

[languages.it]
taxonomies = [
    {name = "categories", paginate_by = 10},
    {name = "tags", paginate_by = 10},
]

[languages.es]  
taxonomies = [
    {name = "categories", paginate_by = 10},
    {name = "tags", paginate_by = 10},
]
```

#### 3. Template Usage
Replace hardcoded English strings with `trans()` function calls:
```html
<!-- Instead of: -->
<h1>Welcome to my website</h1>

<!-- Use: -->
<h1>{{ trans(key="welcome_title", default="Welcome to my website") }}</h1>
```

#### 4. Content Structure
For multilingual content, create language-specific files:
```
content/
  _index.md          # Default language
  _index.it.md       # Italian version
  _index.es.md       # Spanish version
  posts/
    welcome.md       # Default language
    welcome.it.md    # Italian version  
    welcome.es.md    # Spanish version
```

#### 5. Testing i18n
After enabling i18n configuration:
1. Run `zola check` to validate configuration
2. Run `zola build` to ensure all translations resolve
3. Test language switching functionality