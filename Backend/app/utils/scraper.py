import json
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

# URL to scrape
URL = "https://www.barandbench.com/collection/top-stories"

# Function to clean text (removes newlines and excessive spaces)
def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

# Main scraping function
def scrape_news():
    options = Options()
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--allow-running-insecure-content")
    options.add_argument("--headless")  # Run in headless mode
    options.add_argument("--disable-gpu")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    scraped_data = []

    try:
        # Load the webpage
        driver.get(URL)
        # Get page source and parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, "html.parser")
        news_cards = soup.find_all("div", class_="four-col-m_story-card-wrapper__1e8p0")

        for card in news_cards:
            headline_tag = card.find("h6")
            headline = clean_text(headline_tag.text) if headline_tag else "N/A"

            article_link_tag = card.find("a", attrs={"data-test-id": "arr--hero-image"})
            article_link = (
                article_link_tag["href"] if article_link_tag else "N/A"
            )

            scraped_data.append(
                {
                    "headline": headline,
                    "article_link": article_link,
                }
            )

    except Exception as e:
        print(f"Error: {e}")

    finally:
        driver.quit()

    return scraped_data