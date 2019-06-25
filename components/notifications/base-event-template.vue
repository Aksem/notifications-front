<template>
  <el-card>
    <template slot="header">
      <slot name="title" />
      <el-button
        class="ce-CloseButton"
        type="text"
        icon="el-icon-close"
        @click="$emit('close')"
      />
    </template>
    <div>
      <slot name="content" />
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="scss">
.ce-Attribute {
  font-weight: 600;
}

.ce-CloseButton {
  float: right;
  padding: 3px 0;
}
</style>
