<template>
  <div class="profile-container">
    <h1>환영합니다, {{ authStore.currentUser?.PhoneNumber }}님!</h1>
    <p>이곳은 로그인 후 접속할 수 있는 홈 페이지입니다.</p>
    <button @click="authStore.logout">로그아웃</button>
    <button @click="authStore.deleteAccount">계정 삭제</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.profile-container {
  @include container-style($max-width-large);

  h1 {
    font-size: 2em;
    margin-bottom: $base-padding * 2;
  }

  p {
    font-size: 1.2em;
    margin-bottom: $base-padding * 2;
  }

  button {
    @include button-style($primary-color, $primary-hover-color);
    padding: $base-padding $base-padding * 2;
    font-size: 1em;
    border-radius: $border-radius-large;
  }
}
</style>

