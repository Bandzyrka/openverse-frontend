export const propTypes = {
  mediaResults: {
    type: /** @type {import('../../store/types').MediaResult[]} */ (Object),
    required: true,
  },
  fetchState: {
    type: /** @type {import('../../store/types').FetchState[]} */ (Object),
    required: true,
  },
  isFilterVisible: {
    type: Boolean,
    required: false,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  supported: {
    type: Boolean,
    required: false,
  },
}

/** @typedef {import('#app').ExtractPropTypes<typeof propTypes>} Props */
