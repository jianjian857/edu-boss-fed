<template>
  <div class="menuCreate">
    <create-or-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'

export default {
  name: 'menu-create',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang='scss' scoped></style>
