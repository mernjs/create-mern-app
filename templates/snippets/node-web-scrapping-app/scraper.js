const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Configure Puppeteer
puppeteer.use(StealthPlugin());

// Locations to scrape and date range
const LOCATIONS = ['California'];
const DATE_RANGE = 'All Dates'; // You can specify a range like "This Week", "This Month", or an exact date
const OUTPUT_DIR = 'event_details';

// Ensure output directory exists
function ensureOutputDirectory() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
}

// Utility to sanitize file names
function sanitizeFileName(title, location) {
    return `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${location.toLowerCase()}.json`;
}

// Helper function to introduce a delay (in milliseconds)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract event details from an event page
async function extractEventDetails(page, url) {
    console.log(`Navigating to event page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Introduce a delay to ensure page is fully loaded
    await delay(5000); // Adjust the delay time (in milliseconds) as needed

    return page.evaluate(() => {
        const getText = (selector) => document.querySelector(selector)?.textContent?.trim() || '';

        // Extract event details
        const title = getText('.sc-1eku3jf-14');
        const dateTime = getText('.sc-1eku3jf-16');
        const venue = getText('.sc-1akkrr6-1');
        const imageUrl = document.querySelector('.sc-1eku3jf-11')?.src || '';

        // Extract ticket pricing details
        const priceCards = Array.from(document.querySelectorAll('.sc-1cro0l1-0'));
        const prices = priceCards.map((card) => ({
            section_description: getText('[data-bdd="quick-pick-item-desc"]', card),
            ticket_type_description: getText('.ticket-type-description', card),
            ticket_price: getText('[data-bdd="quick-pick-price-button"]', card),
        }));

        return {
            title,
            date_time: dateTime,
            venue,
            image_url: imageUrl,
            prices,
            scraped_at: new Date().toISOString(),
        };
    });
}

// Select the date range (e.g., All Dates, This Week, This Month, etc.)
async function selectDateRange(page, dateRange) {
    console.log(`Selecting date range: ${dateRange}`);
    const datePickerButton = 'button.sc-max2bn-5.euKjop';
    await page.waitForSelector(datePickerButton);
    await page.click(datePickerButton);

    // Wait for the date picker to appear
    await delay(2000);

    // Handle different date range options (adjust selector as per the UI structure)
    if (dateRange === 'All Dates') {
        console.log('All Dates selected by default');
        // If no specific selection needed, you can proceed to the next step
    } else if (dateRange === 'This Week') {
        // Add logic to select "This Week" if it's a button or dropdown option
        // Adjust this as per your site's structure
    } else if (dateRange === 'This Month') {
        // Add logic to select "This Month" if it's a button or dropdown option
        // Adjust this as per your site's structure
    } else {
        // Add logic to select a specific date if needed
    }

    await delay(2000); // Give time for selection to be applied
}

// Scrape all events for a given location
async function scrapeLocationEvents(page, location, dateRange) {
    console.log(`Starting search for events in: ${location}`);
    await page.goto('https://www.abc.com/search?q=California&sort=date&startDate=2024-11-25&endDate=2024-11-25', { waitUntil: 'networkidle2' });

    // Perform location search
    // const locationInputSelector = 'input[aria-describedby="searchFormInput-error searchFormInput-success"]';
    // await page.waitForSelector(locationInputSelector);
    // await page.type(locationInputSelector, location);
    // await page.keyboard.press('Enter');

    // Wait for search to finish
    // const searchInputSelector = 'input#searchFormInput-input';
    // await page.waitForSelector(searchInputSelector);
    // await page.click(searchInputSelector);
    // await page.keyboard.down('Control');
    // await page.keyboard.press('A');
    // await page.keyboard.up('Control');
    // await page.keyboard.press('Backspace');

    // Click the "Search" button
    // const searchButtonSelector = 'button[type="submit"]';
    // await page.waitForSelector(searchButtonSelector);
    // await page.click(searchButtonSelector);

    // Select the desired date range
    // await selectDateRange(page, dateRange);

    // Wait for events to load
    await page.waitForSelector('a[data-testid="event-list-link"]');

    // Collect event links
    let eventLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[data-testid="event-list-link"]')).map((link) => link.href);
    });

    console.log(`Found ${eventLinks.length} events initially in ${location}`);

    // Load more events if necessary
    let moreEventsButtonSelector = 'button.PaginationButton__ShowMoreButton-sc-1npc1aj-3.iAuxTF';
    let hasMoreEvents = true;

    while (hasMoreEvents) {
        try {
            console.log('Clicking "More Events" to load more events...');
            await page.click(moreEventsButtonSelector);
            await delay(5000);

            const newEventLinks = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a[data-testid="event-list-link"]')).map((link) => link.href);
            });

            if (newEventLinks.length > eventLinks.length) {
                eventLinks = newEventLinks;
                console.log(`Loaded ${eventLinks.length} events so far.`);
            } else {
                console.log('No more events to load.');
                hasMoreEvents = false;
            }
        } catch (error) {
            console.error('Error clicking the "More Events" button:', error);
            hasMoreEvents = false;
        }
    }

    const locationEvents = [];
    for (const [index, eventUrl] of eventLinks.entries()) {
        console.log(`Processing event ${index + 1}/${eventLinks.length} in ${location}`);
        try {
            const eventDetails = await extractEventDetails(page, eventUrl);

            const fileName = sanitizeFileName(eventDetails.title, location);
            const filePath = path.join(OUTPUT_DIR, fileName);
            fs.writeFileSync(filePath, JSON.stringify({ ...eventDetails, eventUrl }, null, 2));
            console.log(`Saved event details to: ${fileName}`);

            locationEvents.push({ ...eventDetails, eventUrl });
        } catch (error) {
            console.error(`Error processing event at ${eventUrl}:`, error);
            await page.screenshot({ path: `error_${index}_${location}.png` });
        }
    }

    return locationEvents;
}

// Main scraping function
async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    ensureOutputDirectory();

    const allEventData = [];

    for (const location of LOCATIONS) {
        try {
            const locationEvents = await scrapeLocationEvents(page, location, DATE_RANGE);
            allEventData.push({
                location,
                events: locationEvents,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error(`Error scraping events for location: ${location}`, error);
            await page.screenshot({ path: `error_${location}.png` });
        }
    }

    // Save summary data
    const summaryFilePath = path.join(OUTPUT_DIR, 'all_events_summary.json');
    fs.writeFileSync(summaryFilePath, JSON.stringify(allEventData, null, 2));
    console.log(`Scraping completed. Summary saved to: ${summaryFilePath}`);

    await browser.close();
}

// Run the scraper
main().catch((error) => {
    console.error('Error in scraping process:', error);
});
