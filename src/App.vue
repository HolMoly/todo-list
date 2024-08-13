<template>
  <div>
    <!-- 로그인된 경우에만 탭을 표시 -->
    <nav v-if="authStore.isAuthenticated">
      <router-link to="/all-todos">모든 TODO</router-link>
      <router-link to="/upcoming-todos">진행 예정</router-link>
      <router-link to="/in-progress-todos">진행 중</router-link>
      <router-link to="/completed-todos">완료</router-link>
      <router-link to="/profile">프로필</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  const lastLoggedInUser = JSON.parse(localStorage.getItem('lastLoggedInUser'));

  // lastLoggedInUser가 유효한지 확인
  if (lastLoggedInUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.PhoneNumber === lastLoggedInUser.PhoneNumber);

    // 유저가 있고, 아직 인증되지 않은 경우에만 인증 절차 진행
    if (user && !authStore.isAuthenticated) {
      authStore.isAuthenticated = true;
      authStore.currentUser = user;
      router.push('/all-todos');
    }
  } else {
    console.warn("No last logged in user found.");
  }
});
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;

    &:hover {
      color: #0056b3;
    }
  }
}
</style>
