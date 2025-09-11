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

## Development Notes

This appears to be a freshly initialized Zola project with the basic directory structure in place but no content, templates, or styles yet created. When working on this project, you'll typically be adding content to the `content/` directory, creating templates in `templates/`, and styling in `sass/`.