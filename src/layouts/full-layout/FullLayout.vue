<template>
  <div>
    <header>
      <Header/>
    </header>
    <main id="mainContent">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'full-layout',
  components: {
    Header
  }
}
</script>

<style>
#mainContent{
  height: calc(100vh - 40px);
}
</style>