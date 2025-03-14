# GitHub Pages Deployment Instructions

This document provides instructions for deploying your portfolio website to GitHub Pages.

## Repository Setup

1. Create a new GitHub repository with one of these naming patterns:
   - For a user site: `yourusername.github.io`
   - For a project site: Any name (e.g., `portfolio`)

2. Initialize your local repository and push to GitHub:
```bash
cd /path/to/portfolio_website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

## Configuration Files (Already Prepared)

The following files have been prepared for GitHub Pages deployment:

1. **next.config.js** - Configured for static export
   - If using a project site (yourusername.github.io/portfolio), uncomment and set the basePath

2. **.github/workflows/deploy.yml** - GitHub Actions workflow for automatic deployment
   - Builds and deploys your site to the gh-pages branch when you push to main

3. **public/.nojekyll** - Prevents GitHub from processing your site with Jekyll

## GitHub Pages Setup

1. After pushing your code to GitHub:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Set the source to "GitHub Actions"

2. GitHub Actions will automatically build and deploy your site when you push to the main branch.

3. Your site will be available at:
   - User site: https://yourusername.github.io
   - Project site: https://yourusername.github.io/repository-name

## Troubleshooting

- If images don't load, check that the paths are correct with the basePath
- If you encounter build errors, check the GitHub Actions logs
- For custom domains, add a CNAME file to your public directory
