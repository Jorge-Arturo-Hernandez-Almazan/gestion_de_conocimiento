<template>
    <div>
      <MyNavBar></MyNavBar>
      <MyHeader></MyHeader>
      <router-view ></router-view>
    </div>
    
</template>

<script>
import MyHeader from "./menu.vue";
import MyNavBar from "./navbar.vue";
export default {
  components: {
    MyNavBar,
    MyHeader,
  },
  name: 'App'
}
</script>
