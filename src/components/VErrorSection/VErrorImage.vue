<template>
  <figure class="error-image">
    <img :src="image.src" :alt="$t(image.alt)" :title="$t(image.alt)" />
    <figcaption class="attribution" v-html="image.attribution" />
  </figure>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

import { errorCodes } from '~/constants/errors'
import { getAttributionMarkup } from '~/utils/attribution-html'

import imageInfo from '~/assets/error_images/image_info.json'

/**
 * Displays a sad image to convey the absence of results for a search term.
 */
export default {
  name: 'VErrorImage',
  props: {
    errorCode: {
      type: String,
      required: true,
      validator: (val) => errorCodes.includes(val),
    },
  },
  setup(props) {
    const images = Object.fromEntries(
      imageInfo.errors.map((errorItem) => {
        let image = errorItem.image
        image = {
          ...image,
          src: require(`~/assets/error_images/${image.file}.jpg`),
          alt: `error-images.${image.id}`,
          attribution: getAttributionMarkup(image),
        }
        return [errorItem.error, image]
      })
    )
    const image = computed(() => images[props.errorCode])

    return {
      image,
    }
  },
}
</script>

<style scoped lang="scss">
::v-deep .attribution {
  @apply text-dark-charcoal-70;

  a {
    @apply text-current underline;
  }
}
</style>
