import { placements as popoverPlacements } from '@popperjs/core'

export const propTypes = {
  visible: {
    type: Boolean,
    required: true,
  },
  hide: {
    type: /** @type {import('#app').PropType<() => void>} */ (Function),
    required: true,
  },
  hideOnEsc: {
    type: Boolean,
    default: true,
  },
  hideOnClickOutside: {
    type: Boolean,
    default: true,
  },
  autoFocusOnShow: {
    type: Boolean,
    default: true,
  },
  autoFocusOnHide: {
    type: Boolean,
    default: true,
  },
  triggerElement: {
    type: /** @type {import('#app').PropType<HTMLElement>} */ (
      process.server ? Object : HTMLElement
    ),
  },
  placement: {
    type: /** @type {import('#app').PropType<import('@popperjs/core').Placement>} */ (
      String
    ),
    default: 'bottom-end',
    validate: (v) => popoverPlacements.includes(v),
  },
  zIndex: {
    type: Number,
  },
}

/** @typedef {import('#app').ExtractPropTypes<typeof propTypes>} Props */
