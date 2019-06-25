<template>
  <base-event-template @close="$emit('close')">
    <template slot="title">
      New event was created
    </template>
    <template slot="content">
      <p>
        <span class="ce-Attribute">Start date and time:</span>
        {{ notification.start_datetime|datetime }}
      </p>
      <p>
        <span class="ce-Attribute">End date and time:</span>
        {{ notification.end_datetime|datetime }}
      </p>
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
  }
}
</script>

<style lang="scss" scoped>
/* styles */
</style>
