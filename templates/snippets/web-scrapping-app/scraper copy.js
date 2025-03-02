const puppeteer = require('puppeteer');
const fs = require('fs');

const locations = ['New York', 'Los Angeles', 'Chicago']; // Add your predefined locations

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    async function scrapeLocation(location) {
        console.log(`Searching for events in: ${location}`);
        await page.goto('https://www.abc.com/', { waitUntil: 'networkidle2' });

        await page.screenshot({ path: 'debug_page.png' });
        const content = await page.content();
        fs.writeFileSync('debug_page.html', content);


        // Enter location in the search bar
        const searchInputSelector = 'input[aria-label="Search"]';
        await page.waitForSelector(searchInputSelector);
        await page.type(searchInputSelector, location);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Get event links
        const eventLinks = await page.$$eval(
            'a.event-link-selector', // Replace with the actual selector for event links
            (links) => links.map((link) => link.href)
        );

        console.log(`Found ${eventLinks.length} events in ${location}`);
        let eventData = [];

        for (const link of eventLinks) {
            try {
                await page.goto(link, { waitUntil: 'networkidle2' });

                // Scrape event details
                const eventDetails = await page.evaluate(() => {
                    // Ensure selectors match the page structure
                    const section = Array.from(
                        document.querySelectorAll('.seat-section-selector'),
                        (el) => el.textContent.trim()
                    );

                    const row = Array.from(
                        document.querySelectorAll('.seat-row-selector'),
                        (el) => el.textContent.trim()
                    );

                    const price = Array.from(
                        document.querySelectorAll('.ticket-price'),
                        (el) => el.textContent.trim()
                    );

                    return section.map((sec, idx) => ({
                        section: sec,
                        row: row[idx] || 'N/A',
                        price: price[idx] || 'N/A',
                    }));
                });

                eventData.push({
                    event: link,
                    tickets: eventDetails,
                });

                console.log(`Scraped data for event: ${link}`);
            } catch (err) {
                console.error(`Error scraping event: ${link}, Error: ${err.message}`);
            }
        }

        return eventData;
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

    // Save data to JSON file
    fs.writeFileSync('event_data.json', JSON.stringify(allEventData, null, 2));
    console.log('Data saved to event_data.json');

    await browser.close();
})();
