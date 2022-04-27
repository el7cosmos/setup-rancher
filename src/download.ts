import * as tc from '@actions/tool-cache'
import os from 'os'

export async function download(version: string): Promise<string> {
  let platform: string = os.platform()
  if (platform === 'win32') {
    platform = 'windows'
  }

  const url = `https://github.com/rancher/cli/releases/download/${version}/rancher-${platform}-amd64-${version}.tar.gz`

  const tool = await tc.downloadTool(url)
  const path = await tc.extractTar(tool)
  return tc.cacheFile(
    `${path}/rancher-${version}/rancher`,
    'rancher',
    'rancher',
    version
  )
}
