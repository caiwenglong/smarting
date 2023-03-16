<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import PageNav from '@/components/PageNav.vue';


    let currentPath = ref('');
    const router = useRouter();
    onBeforeUnmount(() => {
      // 移除路由变化事件的监听器，以防止内存泄漏
      router.afterEach(handleRouteChange)
    })

    const handleRouteChange = (to, from) => {
      currentPath.value = to.path.subStr(1) // 打印目标路由的路径
    }

    router.afterEach(handleRouteChange)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <PageNav ref="pageNav" :currentPath="currentPath"></PageNav>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.el-header {
  padding: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
