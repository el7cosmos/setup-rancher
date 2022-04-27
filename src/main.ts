import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {download} from './download'
import {getLatestVersion} from './get-latest-version'

async function run(): Promise<void> {
  try {
    const version =
      core.getInput('version') ||
      (await core.group('Get latest version from github release', async () => {
        const latestVersion = await getLatestVersion(core.getInput('token'))
        core.info(`Using version: ${latestVersion}`)
        return latestVersion
      }))
    const cache =
      tc.find('rancher', version) ||
      (await core.group('Cache not found, downloading', async () =>
        download(version)
      ))
    core.addPath(cache)
  } catch (e) {
    if (e instanceof Error || typeof e === 'string') {
      core.setFailed(e)
    } else {
      throw e
    }
  }
}

run()
