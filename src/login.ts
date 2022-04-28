import * as exec from '@actions/exec'

export async function login(
  url: string,
  token: string,
  context?: string
): Promise<void> {
  const args = ['login', url, '--token', token]

  if (context) {
    args.push('--context', context)
  }

  await exec.exec('rancher', args)
}
