<template>
  <!-- Should be wrapped by a fixed-width parent -->
  <div class="relative h-0 w-full pt-full bg-yellow" :title="helpText">
    <!-- Programmatic thumbnail -->
    <svg class="absolute inset-0" :viewBox="`0 0 ${canvasSize} ${canvasSize}`">
      <template v-for="i in dotCount">
        <circle
          v-for="j in dotCount"
          :key="`${i}-${j}`"
          class="fill-dark-charcoal"
          :cx="offset(j)"
          :cy="offset(i)"
          :r="radius(i, j)"
        />
      </template>
    </svg>

    <div v-show="audio.thumbnail && isOk" class="thumbnail absolute inset-0">
      <img
        ref="imgEl"
        class="h-full w-full object-cover object-center overflow-clip"
        :src="audio.thumbnail"
        :alt="helpText"
        @load="handleLoad"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, useContext, computed } from '@nuxtjs/composition-api'

import { rand, hash } from '~/utils/prng'
import { lerp, dist, bezier } from '~/utils/math'

/**
 * Displays the cover art for the audio in a square aspect ratio.
 */
export default {
  name: 'VAudioThumbnail',
  props: {
    /**
     * the details of the audio whose artwork is to be shown; The properties
     * `thumbnail`, `title` and `creator` are used.
     */
    audio: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { i18n } = useContext()
    const helpText = computed(() =>
      i18n.t('audio-thumbnail.alt', {
        title: props.audio.title,
        creator: props.audio.creator,
      })
    )

    /* Switching */

    const imgEl = ref(null)
    const isOk = ref(false)
    const handleLoad = () => {
      isOk.value = true
    }
    onMounted(() => {
      isOk.value = imgEl.value.complete && imgEl.value.naturalWidth
    })

    /* Artwork */

    const dotCount = 10
    const canvasSize = 768
    const minRadius = 2
    const maxRadius = 27

    const random = rand(hash(props.audio.title ?? ''))
    const ctrlPts = Array.from({ length: 4 }, (_, idx) => [
      random() * canvasSize,
      (idx / 3) * canvasSize,
    ])

    const pointCount = dotCount + 1
    const bezierPoints = bezier(ctrlPts, pointCount)

    const offset = (i) => {
      return i * (canvasSize / (dotCount + 1))
    }
    const radius = (i, j) => {
      const bezierPoint = bezierPoints[i]
      const distance = dist([0, bezierPoint], [0, offset(j)])
      const maxFeasibleDistance = canvasSize * ((dotCount - 1) / (dotCount + 1))
      return lerp(maxRadius, minRadius, distance / maxFeasibleDistance)
    }

    return {
      imgEl,
      isOk,
      handleLoad,

      canvasSize,
      dotCount,
      offset,
      radius,
      helpText,
    }
  },
}
</script>
