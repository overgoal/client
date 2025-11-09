import { chromium } from 'playwright'

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  
  // Set viewport size to ensure consistent dimensions
  await page.setViewportSize({ width: 536, height: 760 })
  
  await page.goto('https://localhost:3002/card')
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle')
  
  let index = 0;
  setInterval(async () => {
    try {
      // Get page dimensions to validate clip bounds
      const pageSize = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }))
      
      const clipConfig = { x: 0, y: 0, width: 536, height: 760 }
      
      // Validate clip bounds
      if (clipConfig.x + clipConfig.width > pageSize.width) {
        console.warn('Clip width exceeds page width, adjusting...')
        clipConfig.width = pageSize.width - clipConfig.x
      }
      
      if (clipConfig.y + clipConfig.height > pageSize.height) {
        console.warn('Clip height exceeds page height, adjusting...')
        clipConfig.height = pageSize.height - clipConfig.y
      }
      
      await page.screenshot({
        path: `card-body-2-${index++}.png`,
        clip: clipConfig
      })
      
      console.log(`Screenshot taken with clip: ${JSON.stringify(clipConfig)}`)
    } catch (error) {
      console.error('Screenshot failed:', error)
    }
  }, 1000)
}

// Handle cleanup on process termination
process.on('SIGINT', async () => {
  console.log('Closing browser...')
  if (browser) {
    await browser.close()
  }
  process.exit(0)
})

takeScreenshots().catch(console.error)
