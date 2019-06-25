import Vue from 'vue'
import { datetimeFilter } from 'filters/datetime'

export default () => {
  Vue.filter('datetime', datetimeFilter)
}
