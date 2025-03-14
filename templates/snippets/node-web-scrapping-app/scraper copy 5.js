const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');

const locations = ['New York', 'Los Angeles', 'Chicago'];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Create output directory if it doesn't exist
    const outputDir = 'event_details';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    async function getEventDetails(page, url) {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract detailed event information
        const eventDetails = await page.evaluate(() => {
            // Extract overview information
            const title = document.querySelector('.sc-1eku3jf-14')?.textContent?.trim() || 'No title';
            const dateTime = document.querySelector('.sc-1eku3jf-16')?.textContent?.trim() || '';
            const venue = document.querySelector('.sc-1akkrr6-1')?.textContent?.trim() || '';

            // Extract all price cards
            const priceCards = Array.from(document.querySelectorAll('.sc-1cro0l1-0'));
            const prices = priceCards.map(card => ({
                section_description: card.querySelector('[data-bdd="quick-pick-item-desc"]')?.textContent?.trim() || '',
                ticket_type_description: card.querySelector('.ticket-type-description')?.textContent?.trim() || '',
                ticket_price: card.querySelector('[data-bdd="quick-pick-price-button"]')?.textContent?.trim() || ''
            }));

            // Get event image if available
            const imageUrl = document.querySelector('.sc-1eku3jf-11')?.src || '';

            return {
                title,
                date_time: dateTime,
                venue,
                image_url: imageUrl,
                prices,
                scraped_at: new Date().toISOString()
            };
        });

        return eventDetails;
    }

    async function scrapeLocation(location) {
        console.log(`Searching for events in: ${location}`);
        await page.goto('https://www.abc.com/', { waitUntil: 'networkidle2' });

        // Location search
        const locationInputSelector = 'input[aria-describedby="searchFormInput-error searchFormInput-success"]';
        await page.waitForSelector(locationInputSelector, { timeout: 60000 });
        await page.click(locationInputSelector);
        await page.type(locationInputSelector, location);
        await page.keyboard.press('Enter');

        // Search execution
        const searchInputSelector = 'input#searchFormInput-input';
        await page.waitForSelector(searchInputSelector, { timeout: 60000 });
        await page.click(searchInputSelector);
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');

        const searchButtonSelector = 'button[type="submit"]';
        await page.waitForSelector(searchButtonSelector);
        await page.click(searchButtonSelector);

        // Get event links
        const eventLinks = await page.evaluate(() => {
            const links = document.querySelectorAll('a[data-testid="event-list-link"]');
            return Array.from(links).map(link => link.href);
        });

        console.log(`Found ${eventLinks.length} events in ${location}`);

        // Process each event
        const locationEvents = [];
        for (const [index, eventUrl] of eventLinks.entries()) {
            try {
                console.log(`Processing event ${index + 1}/${eventLinks.length} in ${location}`);
                const eventDetails = await getEventDetails(page, eventUrl);

                // Create sanitized filename
                const sanitizedTitle = eventDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const fileName = `${sanitizedTitle}_${location.toLowerCase()}.json`;
                const filePath = path.join(outputDir, fileName);

                // Save individual event JSON file
                fs.writeFileSync(filePath, JSON.stringify(eventDetails, null, 2));
                console.log(`Saved details to ${fileName}`);

                locationEvents.push(eventDetails);
            } catch (err) {
                console.error(`Error processing event: ${eventUrl}`, err);
                await page.screenshot({ path: `error_${index}_${location}.png` });
            }
        }

        return locationEvents;
    }

    // Process all locations
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
            console.error(`Error scraping location: ${location}`, err);
            await page.screenshot({ path: `error_${location}.png` });
        }
    }

    // Save summary file
    fs.writeFileSync('all_events_summary.json', JSON.stringify(allEventData, null, 2));
    console.log('Scraping completed!');

    await browser.close();
})();