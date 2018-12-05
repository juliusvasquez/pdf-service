# ADL API Project

## Table of contents

- [Pre-requisites](#pre-requisites)
- [Development](#development)
- [Unit Testing](#unit-testing)
- [Production](#production)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Coding standards and style guidethanks](#coding-standards-and-style-guide)
- [Collaboration](#collaboration)
- [Git Branch Naming](#git-branch-naming)

##

## Pre-requisites

- [Git](https://git-scm.com/) - version-control system
- [Node.js and NPM](https://www.npmjs.com/get-npm)
  To check if you have Node.js and npm installed, run the
  ```bash
  > node - v
  > npm -v
  ```
- [Visual Studio Code](https://code.visualstudio.com) - source code editor

## Development

### Project Setup

```bash
> git clone git@github.com:tooltwist/adl-api.git
> cd adl-api
> npm install
```

#### Notes:

- Configure the environment variables by renaming the `.env_template` to `.env`
- `.env` is added in .gitignore file
- `.env` needs to be updated to the latest release configuration

| Commands           | Description                                        |
| :----------------- | :------------------------------------------------- |
| `npm run start`    | Start the server                                   |
| `npm run dev`      | Start the server in development mode.              |
| `npm run test`     | Run the unit tests                                 |
| `npm run lint`     | Run the _eslint_                                   |
| `npm run lint:fix` | Run the _eslint_ and try to fix issues as possible |

## Unit testing

This project is using MochaJS testing framework and ChaiJS assertion library.

- [Mocha](https://mochajs.org/) - JavaScript testing framework
- [ChaiJS](https://www.chaijs.com/api/) - assertion library

To run the unit test

```bash
> npm run test
```

To see the unit test coverage after running the test, simply open the html file in the browser

```bash
> cd coverage/index.html
```

## Production

Put the production notes here...

## Deployment

Put the deployment process here...

## Documentation

Put the API documentation details here....

## Coding standards and style guide

To write a clean, simple and maintainable code.

- [ESLint](https://eslint.org/docs/rules/) - JavaScript linting utility
- [Airbnb](https://github.com/airbnb/javascript) - JavaScript Style Guide

## Collaboration

Changes that needs to be merged in _development_ branch should be accepted using GitHub pull requests; for more information, see
[GitHub documentation - Creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

For a good pull request, we ask you provide the following:

1.  Include a clear description of your pull request in the description
    with the basic "what" and "why"s for the request. Use this template for all of your commits.

```
   # Title (Max 50 char)
   [type] [#ticket] Title here

   1. Link to ticket:

   2.Why is the change needed?

   3.How has it addressed an issue?

   # Type can be
   #    feat     (new feature)
   #    fix      (bug fix)
   #    refactor (refactoring code)
   #    style    (formatting, missing semi colons, etc; no code change)
   #    doc      (changes to documentation)
   #    test     (adding or refactoring tests; no production code change)
   #    version  (version bump/new release; no production code change)
   #    WIP      (Work In Progress; for intermediate commits to keep patches reasonably sized)
```

2. The commit/ pull request should include unit tests for the change. A new feature should
   have tests for the new feature and bug fixes should include a test that fails
   without the corresponding code change and passes after they are applied.
   The command `npm run test` will generate a `coverage/` folder that
   contains HTML pages of the code coverage, to better understand if everything
   you're adding is being tested.
3. If the commit/ pull request is a new feature, please include appropriate documentation
   in the `README.md` file as well.
4. To help ensure that your code is similar in style to the existing code,
   run the command `npm run lint` and fix any displayed issues.

## Git Branch Naming

### [type]/[ticket_number]

#### Branch type:

```
bug    - Code changes linked to a known issue.
feat   - New feature.
hotfix - Quick fixes to the codebase.
spike   - Experiments (will never be merged).
```

#### Examples:

```
feat/1234
spike/1234
bug/1234
```
