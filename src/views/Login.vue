<template>
  <div class="login-container">
    <Logo />
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="PhoneNumber">전화번호</label>
        <input
            v-model="PhoneNumber"
            type="tel"
            id="PhoneNumber"
            placeholder="전화번호를 입력해주세요"
            @input="formatPhoneNumber"
            required
        />
      </div>
      <div class="form-group">
        <label for="PIN">PIN</label>
        <input
            v-model="PIN"
            type="password"
            id="PIN"
            placeholder="PIN을 입력해주세요"
            @input="formatPIN"
            maxlength="4"
            required
        />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>

    <div class="login-footer">
      <router-link to="/signup">회원가입</router-link>
      <router-link to="/forgot-password">비밀번호 찾기</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Logo from '@/components/Logo.vue';

const PhoneNumber = ref('');
const PIN = ref('');

const authStore = useAuthStore();

const formatPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
  if (input.length > 3 && input.length <= 7) {
    input = `${input.slice(0, 3)} ${input.slice(3)}`;
  } else if (input.length > 7) {
    input = `${input.slice(0, 3)} ${input.slice(3, 7)} ${input.slice(7, 11)}`;
  }
  PhoneNumber.value = input;
};

const formatPIN = (event) => {
  const input = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
  PIN.value = input.slice(0, 4); // 최대 4자리까지만 허용
};

const handleLogin = () => {
  authStore.login(PhoneNumber.value, PIN.value);
};
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.login-container {
  @include container-style($max-width-small);

  .login-form {
    margin-top: $base-padding * 2;

    .form-group {
      margin-bottom: $base-padding * 1.5;

      label {
        display: block;
        font-weight: bold;
        margin-bottom: $base-padding / 2;
      }

      input {
        width: 100%;
        padding: $base-padding;
        border: 1px solid #ddd;
        border-radius: $border-radius-large;
        box-sizing: border-box;
      }
    }

    .login-button {
      margin-top: $base-padding * 2;
      width: 100%;
      @include button-style($primary-color, $primary-hover-color);
      font-weight: bold;
    }
  }

  .login-footer {
    margin-top: $base-padding * 2;

    a {
      margin: 0 $base-padding;
      color: $primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>



