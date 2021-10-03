# twst-wiki-parser

A simple formatter that takes in translators' dialogue and converts it into source code for a new page on the Twisted Wonderland wikia.

Link: https://myang5.github.io/twst-wiki-parser/

This project uses a modified version of the Chrome Picker from [React Color](https://github.com/casesandberg/react-color).

## Deployment

- Create a branch called `gh-pages` and push to the remote repo
- Go to the repo's Settings > Pages and insure that GitHub Pages recognizes the branch
- Whenever commits are pushed to the remote's `main` branch, `.github/workflows/deploy.yml` will take care of deploying the `dist` folder to GitHub Pages
