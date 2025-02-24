<template>
  <main class="bg-yellow h-screen relative page-404 overflow-x-hidden">
    <VLink href="/" class="relative z-10 text-dark-charcoal">
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      <span class="sr-only">Openverse</span>
      <span
        class="flex flex-row pt-6 lg:pt-8 ms-6 lg:ms-10 h-auto w-30 text-dark-charcoal"
        aria-hidden="true"
      >
        <OpenverseLogo />
        <OpenverseBrand class="ms-1" />
      </span>
    </VLink>
    <Oops
      aria-hidden="true"
      class="absolute opacity-5 fill-dark-charcoal -mt-[10%] -ml-[20%] lg:mx-auto w-[140%] lg:w-full px-6 lg:px-16 z-0 pointer-events-none"
    />
    <header
      class="absolute lg:max-w-2xl space-y-4 lg:space-y-6 top-1/4 z-10 left-0 right-0 mx-auto px-6 lg:px-0"
    >
      <h1 class="mb-6 lg:mb-10 lg:leading-tight text-3xl lg:text-6xl">
        {{ $t('404.title') }}
      </h1>
      <p class="font-semibold">
        <i18n path="404.main">
          <template #link>
            <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
            <VLink
              class="underline text-current hover:text-current active:text-current"
              href="/"
              >Openverse</VLink
            >
            <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
          </template>
        </i18n>
      </p>
      <VSearchBar
        :value="searchTerm"
        :label-text="$t('404.search-placeholder')"
        field-id="404-search"
        :placeholder="$t('404.search-placeholder')"
        size="standalone"
        @input="setSearchTerm"
        @submit="handleSearch"
      />
    </header>
  </main>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

import { MEDIA, SEARCH } from '~/constants/store-modules'
import { FETCH_MEDIA, UPDATE_QUERY } from '~/constants/action-types'

import VSearchBar from '~/components/VHeader/VSearchBar/VSearchBar'
import VLink from '~/components/VLink.vue'

import Oops from '~/assets/oops.svg?inline'
import OpenverseLogo from '~/assets/logo.svg?inline'
import OpenverseBrand from '~/assets/brand.svg?inline'

const VFourOhFour = defineComponent({
  name: 'VFourOhFour',
  components: {
    OpenverseLogo,
    OpenverseBrand,
    Oops,
    VLink,
    VSearchBar,
  },
  props: ['error'],
  setup() {
    const { app, store } = useContext()
    const router = useRouter()

    const searchTerm = ref('')
    const setSearchTerm = (value) => {
      searchTerm.value = value
    }

    const handleSearch = async () => {
      if (searchTerm.value === '') return

      await store.dispatch(`${SEARCH}/${UPDATE_QUERY}`, {
        q: searchTerm.value,
      })
      await store.dispatch(`${MEDIA}/${FETCH_MEDIA}`, {
        query: { q: searchTerm.value },
      })

      router.push(
        app.localePath({
          path: `/search`,
          query: { q: searchTerm.value },
        })
      )
    }

    return {
      searchTerm,
      setSearchTerm,
      handleSearch,
    }
  },
  head: {
    meta: [
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#ffe033',
      },
    ],
  },
})
export default VFourOhFour
</script>

<style>
/* Override the default search bar styles.
   Maybe in the future this would warrant a
   variant of the searchbar, but that seems
   excessive for this one-off usage.
*/
.page-404 .search-bar > div:not(:focus):not(:focus-within) {
  border-color: black;
}
.page-404
  .search-bar:not(:hover)
  button:not(:hover):not(:focus):not(:focus-within) {
  border-color: black;
  border-inline-start-color: transparent;
}
.page-404 .search-bar button {
  border-width: 1px;
}
</style>
