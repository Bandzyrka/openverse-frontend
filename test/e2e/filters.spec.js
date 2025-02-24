const { test, expect } = require('@playwright/test')

const {
  assertCheckboxStatus,
  openFilters,
  mockProviderApis,
  changeContentType,
} = require('./utils')

// Cannot require media constants because they use `export`
const ALL_MEDIA = 'all'
const AUDIO = 'audio'
const IMAGE = 'image'
const supportedSearchTypes = [ALL_MEDIA, AUDIO, IMAGE]

test.beforeEach(async ({ context }) => {
  await mockProviderApis(context)
})

/**
 * @param page
 * @param {'checked'|'notChecked'|'total'} checked
 * @param {number} count
 * @returns {Promise<void>}
 */
const assertCheckboxCount = async (page, checked, count) => {
  let checkedString = {
    checked: ':checked',
    notChecked: ':not(:checked)',
    total: '',
  }[checked]
  const locatorString = `input[type="checkbox"]${checkedString}`
  await expect(page.locator(locatorString)).toHaveCount(count, { timeout: 200 })
}

const FILTER_COUNTS = {
  [ALL_MEDIA]: 11,
  [AUDIO]: 23,
  [IMAGE]: 70,
}

for (const searchType of supportedSearchTypes) {
  test(`correct total number of filters is displayed for ${searchType}`, async ({
    page,
  }) => {
    const searchTypePath = searchType === ALL_MEDIA ? '' : searchType
    const searchUrl = `/search/${searchTypePath}/?q=cat`
    await page.goto(searchUrl)

    await openFilters(page)

    await assertCheckboxCount(page, 'total', FILTER_COUNTS[searchType])
  })
}

test('initial filters are applied based on the url', async ({ page }) => {
  await page.goto(
    '/search/?q=cat&license_type=commercial&license=cc0&searchBy=creator'
  )
  await openFilters(page)
  const expectedFilters = ['cc0', 'commercial', 'creator']

  for (let checkbox of expectedFilters) {
    await assertCheckboxStatus(page, checkbox)
  }
})
test('common filters are retained when media type changes from all media to single type', async ({
  page,
}) => {
  await page.goto(
    '/search/?q=cat&license_type=commercial&license=cc0&searchBy=creator'
  )
  await openFilters(page)
  const expectedFilters = ['cc0', 'commercial', 'creator']

  await changeContentType(page, 'Images')

  await expect(page).toHaveURL(
    '/search/image?q=cat&license_type=commercial&license=cc0&searchBy=creator'
  )
  for (let checkbox of expectedFilters) {
    await assertCheckboxStatus(page, checkbox)
  }
})

test('common filters are retained when media type changes from single type to all media', async ({
  page,
}) => {
  await page.goto(
    '/search/audio?q=cat&license_type=commercial&license=cc0&searchBy=creator'
  )
  await openFilters(page)

  for (let checkbox of ['cc0', 'commercial', 'creator']) {
    await assertCheckboxStatus(page, checkbox)
  }

  await changeContentType(page, 'All content')

  await expect(page).toHaveURL(
    '/search/?q=cat&license_type=commercial&license=cc0&searchBy=creator'
  )

  for (let checkbox of ['cc0', 'commercial', 'creator']) {
    await assertCheckboxStatus(page, checkbox)
  }
})

test('selecting some filters can disable dependent filters', async ({
  page,
}) => {
  await page.goto('/search/audio?q=cat&license_type=commercial')
  await openFilters(page)

  // by-nc is special because we normally test for fuzzy match, and by-nc matches 3 labels.
  const byNc = page.locator('input[value="by-nc"]')
  await expect(byNc).toBeDisabled()
  for (let checkbox of ['by-nc-sa', 'by-nc-nd']) {
    await assertCheckboxStatus(page, checkbox, 'disabled')
  }
  await assertCheckboxStatus(page, 'commercial')

  await page.click('label:has-text("commercial")')

  await assertCheckboxStatus(page, 'commercial', 'unchecked')
  await expect(byNc).not.toBeDisabled()
  for (let checkbox of ['commercial', 'by-nc-sa', 'by-nc-nd']) {
    await assertCheckboxStatus(page, checkbox, 'unchecked')
  }
})

test('filters are updated when media type changes', async ({ page }) => {
  await page.goto('/search/image?q=cat&aspect_ratio=tall&license=cc0')
  await openFilters(page)

  await assertCheckboxStatus(page, 'tall')
  await assertCheckboxStatus(page, 'cc0')

  await changeContentType(page, 'Audio')

  await expect(page).toHaveURL('/search/audio?q=cat&license=cc0')

  await expect(page.locator('label:has-text("Tall")')).toHaveCount(0, {
    timeout: 300,
  })
  await assertCheckboxStatus(page, 'cc0')
})

test('new media request is sent when a filter is selected', async ({
  page,
}) => {
  await page.goto('/search/image?q=cat')
  await openFilters(page)

  await assertCheckboxStatus(page, 'cc0', 'unchecked')

  const [response] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('cc0')),
    page.click('label:has-text("CC0")'),
  ])

  await assertCheckboxStatus(page, 'cc0')
  // Remove the host url and path because when proxied, the 'http://localhost:49152' is used instead of the
  // real API url
  const queryString = response.url().split('/images/')[1]
  expect(queryString).toEqual('?q=cat&license=cc0')
})
