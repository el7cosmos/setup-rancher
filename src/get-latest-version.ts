import * as github from '@actions/github'

export async function getLatestVersion(token: string): Promise<string> {
  const octokit = github.getOctokit(token)

  const {data} = await octokit.rest.repos.getLatestRelease({
    owner: 'rancher',
    repo: 'cli'
  })
  return data.tag_name
}
