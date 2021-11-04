<template>
    <div>
      <MyHeader></MyHeader>
      <router-view ></router-view>
    </div>
    
</template>

<script>
import MyHeader from "../menu.vue";
export default {
  components: {
    MyHeader,
  },
  name: 'App'
}
</script>
