import { chromium } from 'playwright'

export const initBrowser = async () => {
  return await chromium.launch({
    // headless: false
    headless: false
    // proxy: {
    // 	server: 'https://fi-hel.prod.surfshark.com:443',
    // 	username: 'y8wGddwfQty4J5PHW9XqGy6n',
    // 	password: 'kyxzy972Swkz38nALPLYMDvc'
    // }
  })

  // const browserServer = await chromium.launchServer()
  // const wsEndpoint = browserServer.wsEndpoint()
  // console.log('wsEndpoint:', wsEndpoint)
  // // Use web socket endpoint later to establish a connection.
  // const browser = await chromium.connect(wsEndpoint)
  // // Close browser instance.
  // return browser
}

export const ping = async () => {
  const url = 'https://www.google.com/'
  const browser = await initBrowser()

  const page = await browser.newPage()
  await page.goto(url)

  const result = page.getByText('Google')

  console.log('[ping] result:', result)

  return result
}
