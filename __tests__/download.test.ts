import * as tc from '@actions/tool-cache'
import * as os from 'os'
import {download} from '../src/download'

jest.mock('@actions/tool-cache')
jest.mock('os')

const TEST_CASES: [typeof process.platform][] = [
  ['aix'],
  ['darwin'],
  ['win32'],
  ['linux']
]
test.concurrent.each(TEST_CASES)('download', async platform => {
  jest.spyOn(tc, 'cacheFile').mockResolvedValue('/path/to/file')
  jest.spyOn(os, 'platform').mockReturnValue(platform)

  const VERSION = '0.0.1'

  await expect(download(VERSION)).resolves.toBe('/path/to/file')
})
