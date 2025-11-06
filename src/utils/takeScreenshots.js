import { chromium } from 'playwright'

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  
  // Set viewport size to ensure consistent dimensions
  await page.setViewportSize({ width: 670, height: 1200 })
  
  await page.goto('http://localhost:3002/card')
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle')
  
  setInterval(async () => {
    try {
      // Get page dimensions to validate clip bounds
      const pageSize = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }))
      
      const clipConfig = { x: 0, y: 0, width: 670, height: 1200 }
      
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
        path: `browser-${Date.now()}.png`,
        clip: clipConfig
      })
      
      console.log(`Screenshot taken with clip: ${JSON.stringify(clipConfig)}`)
    } catch (error) {
      console.error('Screenshot failed:', error)
    }
  }, 500)
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
