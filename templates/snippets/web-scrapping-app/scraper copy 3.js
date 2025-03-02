const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

const locations = ['New York', 'Los Angeles', 'Chicago'];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    async function scrapeLocation(location) {
        console.log(`Searching for events in: ${location}`);
        await page.goto('https://www.abc.com/', { waitUntil: 'networkidle2' });

        // Debug initial page state
        await page.screenshot({ path: `debug_${location}_initial.png` });
        const content = await page.content();
        fs.writeFileSync(`debug_${location}_initial.html`, content);

        // Wait for and interact with the location search input
        const locationInputSelector = 'input[aria-describedby="searchFormInput-error searchFormInput-success"]';
        // const locationInputSelector = 'input[aria-label="City or Zip Code"]';
        await page.waitForSelector(locationInputSelector, { timeout: 60000 });
        await page.click(locationInputSelector);
        await page.type(locationInputSelector, location);
        await page.keyboard.press('Enter');

        // Wait for and interact with the event search input
        const searchInputSelector = 'input#searchFormInput-input';
        await page.waitForSelector(searchInputSelector, { timeout: 60000 });

        // Clear existing search text if any
        await page.click(searchInputSelector);
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');

        // Click the search button
        const searchButtonSelector = 'button[type="submit"]';
        await page.waitForSelector(searchButtonSelector);
        await page.click(searchButtonSelector);

        // Wait for event results to load (you'll need to update this selector based on the results page)
        const eventCardSelector = '[data-test="event-card"]'; // Update this based on actual results page
        try {
            await page.waitForSelector(eventCardSelector, { timeout: 30000 });
        } catch (error) {
            console.log(`No events found or different layout for ${location}`);
            return [];
        }

        // Extract event information
        const events = await page.evaluate((selector) => {
            const eventCards = document.querySelectorAll(selector);
            return Array.from(eventCards).map(card => {
                return {
                    title: card.querySelector('[data-test="event-name"]')?.textContent?.trim() || 'No title',
                    venue: card.querySelector('[data-test="venue-name"]')?.textContent?.trim() || 'No venue',
                    date: card.querySelector('[data-test="event-date"]')?.textContent?.trim() || 'No date',
                    url: card.querySelector('a')?.href || ''
                };
            });
        }, eventCardSelector);

        console.log(`Found ${events.length} events in ${location}`);
        return events;
    }

    let allEventData = [];
    for (const location of locations) {
        try {
            const locationData = await scrapeLocation(location);
            allEventData.push({
                location,
                events: locationData,
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            console.error(`Error scraping location: ${location}, Error: ${err.message}`);
            // Take screenshot on error for debugging
            await page.screenshot({ path: `error_${location}.png` });
        }
    }

    // Save the data
    const outputFile = 'event_data.json';
    fs.writeFileSync(outputFile, JSON.stringify(allEventData, null, 2));
    console.log(`Data saved to ${outputFile}`);

    await browser.close();
})();