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

        // Wait for and interact with the search input
        const searchInputSelector = 'input#search-bar'; // Update based on actual selector
        await page.waitForSelector(searchInputSelector, { timeout: 60000 });
        await page.type(searchInputSelector, location);
        await page.keyboard.press('Enter');

        // Wait for search results to load
        const eventLinkSelector = 'a.event-card-link'; // Update based on actual selector
        await page.waitForSelector(eventLinkSelector, { timeout: 60000 });

        // Fetch event links
        const eventLinks = await page.$$eval(eventLinkSelector, (links) =>
            links.map((link) => ({
                title: link.textContent.trim(),
                url: link.href,
            }))
        );

        console.log(`Found ${eventLinks.length} events in ${location}`);
        return eventLinks;
    }

    let allEventData = [];
    for (const location of locations) {
        try {
            const locationData = await scrapeLocation(location);
            allEventData.push({ location, events: locationData });
        } catch (err) {
            console.error(`Error scraping location: ${location}, Error: ${err.message}`);
        }
    }

    fs.writeFileSync('event_data.json', JSON.stringify(allEventData, null, 2));
    console.log('Data saved to event_data.json');
    await browser.close();
})();
