import Vuex from 'vuex'
import { fireEvent, render, screen } from '@testing-library/vue'
import { createLocalVue } from '@vue/test-utils'

import VueI18n from 'vue-i18n'
import { createPinia, PiniaVuePlugin } from 'pinia'

import { IMAGE } from '~/constants/media'
import store from '~/store/search'
import { FETCH_MEDIA } from '~/constants/action-types'

import messages from '~/locales/en.json'

import { useFilterStore } from '~/stores/filter'

import VSearchGridFilter from '~/components/VFilters/VSearchGridFilter.vue'

describe('VSearchGridFilter', () => {
  let options = {}
  let storeMock
  let localVue
  let pinia
  let filterStore
  const routerMock = { push: jest.fn() }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(PiniaVuePlugin)
    pinia = createPinia()
    localVue.use(VueI18n)
    const i18n = new VueI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages: { en: messages },
    })
    storeMock = new Vuex.Store({
      modules: {
        search: {
          namespaced: true,
          state: {
            searchType: IMAGE,
            query: { q: '' },
          },
          mutations: store.mutations,
          actions: store.actions,
          getters: store.getters,
        },
        media: {
          namespaced: true,
          state: {
            imagesCount: 2,
          },
          actions: {
            [FETCH_MEDIA]: jest.fn(),
          },
        },
      },
    })

    options = {
      localVue,
      pinia,
      i18n,
      mocks: {
        $router: routerMock,
        $store: storeMock,
        $nuxt: {
          context: {
            i18n: { t: (s) => s },
            store: storeMock,
          },
        },
      },
    }
    filterStore = useFilterStore(pinia)
  })

  it('toggles filter', async () => {
    render(VSearchGridFilter, options)
    const checked = screen.queryAllByRole('checkbox', { checked: true })
    expect(checked.length).toEqual(0)
    await fireEvent.click(screen.queryByLabelText(/commercial/i))
    // `getBy` serves as expect because it throws an error if no element is found
    screen.getByRole('checkbox', { checked: true })
    screen.getByLabelText(/commercial/, { checked: true })
  })

  it('clears filters', async () => {
    filterStore.toggleFilter({ filterType: 'licenses', code: 'by' })
    await render(VSearchGridFilter, options)
    // if no checked checkboxes were found, this would raise an error
    screen.getByRole('checkbox', { checked: true })

    await fireEvent.click(screen.getByText('filter-list.clear'))
    const checkedFilters = screen.queryAllByRole('checkbox', { checked: true })
    const uncheckedFilters = screen.queryAllByRole('checkbox', {
      checked: false,
    })

    expect(checkedFilters.length).toEqual(0)
    // Filters are reset with the initial `filterData`
    expect(uncheckedFilters.length).toEqual(24)
  })
})
