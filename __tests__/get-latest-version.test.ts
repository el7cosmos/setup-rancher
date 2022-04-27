import {getLatestVersion} from '../src/get-latest-version'

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn().mockReturnValue({
    rest: {
      repos: {
        getLatestRelease: jest.fn().mockResolvedValue({
          data: {
            tag_name: '0.0.1'
          }
        })
      }
    }
  })
}))

test('getLatestVersion', async () => {
  await expect(getLatestVersion('token')).resolves.toBe('0.0.1')
})
