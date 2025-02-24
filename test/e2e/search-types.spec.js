const { test, expect } = require('@playwright/test')

const { changeContentType } = require('./utils')

/**
 * Using SSR:
 * 1. Can open 'all content' search page, and see search results.
 * 2. Can open 'image' search page, and see search results.
 * 3. Can open 'audio' content type page, and see search results.
 *
 * On client side:
 * 1. Can open 'all content' search page, and see search results.
 * 2. Can open 'image' search page, and see search results.
 * 3. Can open 'audio' search page, and see search results.
 * 4. Can open 'image' search page from the 'all content' page.
 * 5. Can open 'audio' search from the 'all content' page.
 *
 * Results include search meta information, media grid and Meta search form, can load more media if there are more media items.
 */

test.beforeEach(async ({ context }) => {
  // Block any audio (jamendo.com) requests for each test in this file.
  await context.route('**.jamendo.com**', (route) => route.abort())
})

const searchTypes = [
  {
    id: 'all',
    name: 'All content',
    url: '/search/?q=birds',
    canLoadMore: true,
    metaSourceCount: 7,
  },
  {
    id: 'image',
    name: 'Images',
    url: '/search/image?q=birds',
    canLoadMore: true,
    metaSourceCount: 7,
    results: /Over 10,000 results/,
  },
  {
    id: 'audio',
    name: 'Audio',
    url: '/search/audio?q=birds',
    canLoadMore: true,
    metaSourceCount: 3,
    results: /93 results/,
  },
]

async function checkLoadMore(page, searchType) {
  const loadMoreSection = await page.locator('[data-testid="load-more"]')
  if (!searchType.canLoadMore) {
    // When we expect the section not to be here, the test becomes very slow because
    // it waits until the end of the timeout (5 seconds).
    await expect(loadMoreSection).toHaveCount(0, { timeout: 300 })
  } else {
    await expect(loadMoreSection).toHaveCount(1)
    await expect(loadMoreSection).toContainText('Load more')
  }
}
async function checkMetasearchForm(page, searchType) {
  const metaSearchForm = await page.locator('[data-testid="meta-search-form"]')
  await expect(metaSearchForm).toHaveCount(1)

  const sourceButtons = await page.locator('.meta-search a')
  await expect(sourceButtons).toHaveCount(searchType.metaSourceCount)
}

async function checkSearchMetadata(page, searchType) {
  if (searchType.canLoadMore) {
    const searchResult = await page.locator('[data-testid="search-results"]')
    await expect(searchResult).toBeVisible()
    await expect(searchResult).not.toBeEmpty()
  }
}

async function checkPageMeta(page, searchType) {
  const urlParam = searchType.id === 'all' ? '' : searchType.id

  const expectedTitle = `birds | Openverse`
  const expectedURL = `/search/${urlParam}?q=birds`

  await expect(page).toHaveTitle(expectedTitle)
  await expect(page).toHaveURL(expectedURL)
}
async function checkSearchResult(page, searchType) {
  await checkSearchMetadata(page, searchType)
  await checkLoadMore(page, searchType)
  await checkMetasearchForm(page, searchType)
  await checkPageMeta(page, searchType)
}

for (const searchType of searchTypes) {
  test(`Can open ${searchType.name} search page on SSR`, async ({ page }) => {
    await page.goto(searchType.url)

    await checkSearchResult(page, searchType)
  })

  test(`Can open ${searchType.name} page client-side`, async ({ page }) => {
    // Audio is loading a lot of files, so we do not use it for the first SSR page
    const pageToOpen = searchType.id === 'all' ? searchTypes[1] : searchTypes[0]
    await page.goto(pageToOpen.url)
    await changeContentType(page, searchType.name)
    await checkSearchResult(page, searchType)
  })
}

for (let searchTypeName of ['audio', 'image']) {
  const searchType = searchTypes.find((type) => type.id === searchTypeName)
  test(`Can open ${searchTypeName} page from the all view`, async ({
    page,
  }) => {
    await page.goto('/search/?q=birds')
    const contentLink = await page.locator(
      `a[href*="/search/${searchTypeName}"][href$="q=birds"]`
    )
    await expect(contentLink).toContainText(searchType.results)
    await page.click(`a[href*="/search/${searchTypeName}"][href$="q=birds"]`)

    await expect(page).toHaveURL(searchType.url)
    await checkSearchResult(page, searchType)
  })
}
