<template>
  <base-event-template @close="$emit('close')">
    <template slot="title">
      Event was updated
    </template>
    <template slot="content">
      <template v-if="eventChanges.start_datetime">
        <p v-if="eventChanges.start_datetime[0] === null">
          <span class="ce-Attribute">Start date and time</span> were unset
        </p>
        <p v-else-if="eventChanges.start_datetime[1] === null">
          <span class="ce-Attribute">Start date and time</span> were set to {{ eventChanges.start_datetime[0]|datetime }}
        </p>
        <p v-else>
          <span class="ce-Attribute">Start date and time</span> were changed from {{ eventChanges.start_datetime[1]|datetime }}
          to {{ eventChanges.start_datetime[0]|datetime }}
        </p>
      </template>

      <template v-if="eventChanges.end_datetime">
        <p v-if="eventChanges.end_datetime[0] === null">
          <span class="ce-Attribute">End date and time</span> were unset
        </p>
        <p v-else-if="eventChanges.end_datetime[1] === null">
          <span class="ce-Attribute">End date and time</span> were set to {{ eventChanges.end_datetime[0]|datetime }}
        </p>
        <p v-else>
          <span class="ce-Attribute">End date and time</span> were changed from {{ eventChanges.end_datetime[1]|datetime }}
          to {{ eventChanges.end_datetime[0]|datetime }}
        </p>
      </template>
    </template>
  </base-event-template>
</template>

<script>
import BaseEventTemplate from './base-event-template'

export default {
  components: {
    BaseEventTemplate
  },
  props: {
    notification: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    /* Object with keys of notification */
    eventChanges() {
      const result = {}

      for (const key of ['start_datetime', 'end_datetime']) {
        if (this.notification[`${key}_old`] !== this.notification[`${key}_new`]) {
          result[key] = [this.notification[`${key}_new`], this.notification[`${key}_old`]]
        }
      }

      return result
    }
  }
}
</script>

<style lang="scss" scoped>
/* styles */
</style>
