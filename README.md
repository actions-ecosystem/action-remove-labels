# Action Remove Labels

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]
[![license][license-badge]][license]

![screenshot](./docs/assets/screenshot.png)

This is a GitHub Action to remove GitHub labels to an issue or a pull request.

This action extract the number from an issue or a pull request which has triggered this by default.
It means you don't need to care about something annoying like whether you should use `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}`.

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|      NAME       |                                           DESCRIPTION                                           |   TYPE   | REQUIRED |                                     DEFAULT                                     |
| --------------- | ----------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------- |
| `github_token`  | A GitHub token.                                                                                 | `string` | `false`   | `${{ github.token }}`                                                                           |
| `labels`        | The labels' name to be removed. Must be separated with line breaks if there're multiple labels. | `string` | `true`   | `N/A`                                                                           |
| `number`        | The number of the issue or pull request.                                                        | `number` | `false`  | `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}`                                                                           |
| `repo`          | The owner and repository name. e.g.) `Codertocat/Hello-World`                                   | `string` | `false`  |  `N/A` |
| `fail_on_error` | Whether the action fails or not when getting errors. [true,false]                               | `bool`   | `false`  | `false`                                                                         |

## Example

### Remove a single label with a comment

```yaml
name: Remove Label

on: [issue_comment]

jobs:
  remove_label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-ecosystem/action-remove-labels@v1
        if: ${{ startsWith(github.event.comment.body, '/remove-labels') }}
        with:
          labels: bug
```

### Remove multiple labels with a comment

```yaml
name: Remove Labels

on: [issue_comment]

jobs:
  remove_labels:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-ecosystem/action-remove-labels@v1
        if: ${{ startsWith(github.event.comment.body, '/remove-labels') }}
        with:
          labels: |
            documentation
            changelog
```

## License

Copyright 2020 The Actions Ecosystem Authors.

Action Remove Labels is released under the [Apache License 2.0](./LICENSE).

<!-- badge links -->

[actions-workflow-test]: https://github.com/actions-ecosystem/action-remove-labels/actions?query=workflow%3ATest
[actions-workflow-test-badge]: https://img.shields.io/github/workflow/status/actions-ecosystem/action-remove-labels/Test?label=Test&style=for-the-badge&logo=github

[release]: https://github.com/actions-ecosystem/action-remove-labels/releases
[release-badge]: https://img.shields.io/github/v/release/actions-ecosystem/action-remove-labels?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/actions-ecosystem/action-remove-labels?style=for-the-badge
