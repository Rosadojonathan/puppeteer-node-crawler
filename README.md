# puppeteer-node-crawler

This is a Puppeteer Crawler that I used for AdWords monitoring.

Used as an API from Google Apps Scripts call, the crawler visits product pages from active AdWords campaigns
and stays on the page for a few seconds to wait for the content to load. Once the content is rendered
it checks if the product has enough stock left, otherwise it pushes a message to Slack.
