import * as github from '@actions/github';
import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token');

    const labels = core
      .getInput('labels')
      .split('\n')
      .filter(l => l !== '');
    const [owner, repo] = core.getInput('repo').split('/');
    const number =
      core.getInput('number') === ''
        ? github.context.issue.number
        : parseInt(core.getInput('number'));

    if (labels.length === 0) {
      return;
    }

    const client = github.getOctokit(githubToken);

    for (const label of labels) {
      try {
        const response = await client.rest.issues.removeLabel({
          name: label,
          owner,
          repo,
          issue_number: number
        });
      } catch (e) {
        core.warning(`Failed to remove label: ${label}: ${e}`);
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

run();
