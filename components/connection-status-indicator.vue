<template>
  <div>
    <p>
      Connection status:
      <span
        class="csi-Connection_Status"
        :class="{'csi-Connection_Status-active': isConnected}"
      >
        <template v-if="isConnected">
          connected
        </template>
        <template v-else>
          not connected
        </template>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isConnected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.csi-Connection_Status {
  color: red;
}

.csi-Connection_Status-active {
  color: green;
}
</style>
