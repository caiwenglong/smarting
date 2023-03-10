<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['handleSwitchMenu']);
const navInfos = reactive([
  { name: 'Ping检测', routePath: 'index.html', identity: 'ping' },
  { name: '端口检测', routePath: 'port.html', identity: 'port' },
  { name: '域名检测', routePath: 'domain.html', identity: 'domain' },
  { name: 'DNS检测', routePath: 'dns.html', identity: 'dns' },
  { name: '路由追踪', routePath: 'transroute.html', identity: 'transroute' },
]);

const activeIndex = ref(0);

const handleSwitchMenu = (param) => {
  emit('handleSwitchMenu', param);
};
</script>
<template>
  <div class="nav-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <template v-for="(navItem, idx) in navInfos" :key="navItem.routePath">
        <el-menu-item :index="idx" @click="handleSwitchMenu(navItem.identity)">
          <router-link :to="navItem.identity">{{ navItem.name }}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style>
.nav-wrapper .el-menu {
  padding: 0 42px;
}
</style>
