import { chromium } from 'playwright'

async function takeScreenshots() {
  const browser = await chromium.launch({ 
    headless: true,
    // Enable GPU for better rendering quality
    args: ['--force-color-profile=srgb', '--disable-blink-features=AutomationControlled']
  })
  
  const page = await browser.newPage({
    // Set viewport with high device scale factor for retina-quality screenshots
    viewport: { 
      width: 536, 
      height: 760 
    },
    // Simulate retina display (3x for maximum quality - will capture at 1608x2280)
    deviceScaleFactor: 3,
    // Enable high-quality rendering
    isMobile: false,
    hasTouch: false
  })
  
  await page.goto('https://localhost:3002/card', {
    waitUntil: 'networkidle'
  })
  
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready)
  
  // Additional wait for any animations or WebGL rendering
  await page.waitForTimeout(1000)
  
  let index = 0
  setInterval(async () => {
    try {
      // Wait a brief moment for any dynamic content updates
      await page.waitForTimeout(100)
      
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
        clip: clipConfig,
        type: 'png', // PNG for lossless quality
        // Removed encoding: 'base64' - save directly as PNG file for maximum quality
        omitBackground: false, // Include background for full fidelity
        animations: 'disabled' // Disable animations for crisp screenshots
      })
      
      console.log(`Screenshot ${index} taken with clip: ${JSON.stringify(clipConfig)} at 3x resolution`)
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
