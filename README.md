# Action Remove Labels

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]

![screenshot](./docs/assets/screenshot.png)

This is a GitHub Action to remove GitHub labels to an issue or a pull request.

This action extract the number from an issue or a pull request which has triggered this by default.
It means you don't need to care about something annoying like whether you should use `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}`.

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|      Key       | Required |                                 Default                                  |                                 Note                                 |
| -------------- | -------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `github_token` | `true`   | N/A                                                                      | Must be in form of `github_token: ${{ secrets.github_token }}`.      |
| `labels`       | `true`   | N/A                                                                      | Must be in form of a string with line breaks. See the example below. |
| `repo`         | `false`  | `${{ github.repository }}`                                               | The owner and repository name. e.g. `Codertocat/Hello-World`.        |
| `number`       | `false`  | The number of the issue or pull request which has triggered this action. |                                                                      |

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
          github_token: ${{ secrets.github_token }}
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
          github_token: ${{ secrets.github_token }}
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
