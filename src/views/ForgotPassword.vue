<template>
  <div class="forgot-password-container">
    <div class="header">
      <router-link to="/login" class="logo-link">
        <Logo />
        <span>&lt; 비밀번호 찾기</span>
      </router-link>
    </div>

    <form @submit.prevent="findPassword" class="forgot-password-form">
      <div class="form-group">
        <label for="PhoneNumber">전화번호</label>
        <div class="input-with-button">
          <input
              v-model="PhoneNumber"
              type="tel"
              id="PhoneNumber"
              placeholder="전화번호를 입력해주세요"
              @input="formatPhoneNumber"
              required
          />
          <button type="button" @click="sendVerificationCode">인증번호 발급</button>
        </div>
      </div>

      <div class="form-group">
        <label for="verificationCode">인증번호</label>
        <div class="input-with-button">
          <input
              v-model="verificationCode"
              type="text"
              id="verificationCode"
              placeholder="인증번호를 입력해주세요"
              :disabled="!verificationSent"
              @input="formatAuth"
              required
          />
          <button type="button" @click="verifyCode" :disabled="!verificationSent">인증번호 확인</button>
        </div>
      </div>

      <button type="submit" class="find-password-button" :disabled="!codeVerified">비밀번호 찾기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo.vue';

const PhoneNumber = ref('');
const verificationCode = ref('');
const generatedCode = ref('');
const verificationSent = ref(false);
const codeVerified = ref(false);
const router = useRouter();

const formatPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
  if (input.length > 3 && input.length <= 7) {
    input = `${input.slice(0, 3)} ${input.slice(3)}`;
  } else if (input.length > 7) {
    input = `${input.slice(0, 3)} ${input.slice(3, 7)} ${input.slice(7, 11)}`;
  }
  PhoneNumber.value = input;
};

const sendVerificationCode = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.PhoneNumber === PhoneNumber.value);

  if (!existingUser) {
    alert('등록되지 않은 전화번호입니다.');
    return;
  }

  if (PhoneNumber.value) {
    generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString();
    verificationSent.value = true;
    alert(`인증번호가 발송되었습니다: ${generatedCode.value}`);
  }
};

const formatAuth = (event) => {
  const input = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
  verificationCode.value = input.slice(0, 6); // 최대 6자리까지만 허용
};

const verifyCode = () => {
  if (verificationCode.value === generatedCode.value) {
    codeVerified.value = true;
    alert('인증번호가 확인되었습니다.');
  } else {
    alert('인증번호가 일치하지 않습니다.');
  }
};

const findPassword = () => {
  if (codeVerified.value) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.PhoneNumber === PhoneNumber.value);

    if (user) {
      alert(`해당 전화번호의 비밀번호는: ${user.PIN} 입니다.`);
      router.push('/login');
    }
  } else {
    alert('인증번호를 확인해주세요.');
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.forgot-password-container {
  @include container-style($max-width-small);

  .header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: $base-padding * 2;
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;

    span {
      margin-left: $base-padding;
      font-size: 1.2em;
      font-weight: bold;
    }
  }

  .forgot-password-form {
    margin-top: $base-padding * 2;
  }

  .form-group {
    margin-bottom: $base-padding * 1.5;
    text-align: left;

    .label {
      display: block;
      font-weight: bold;
      margin-bottom: $base-padding / 2;
    }
  }

  .input-with-button {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      padding: $base-padding;
      border: 1px solid #ddd;
      border-radius: $border-radius-large 0 0 $border-radius-large;
    }

    button {
      @include button-style($primary-color, $primary-hover-color, $disabled-color);
      padding: $base-padding $base-padding * 2;
      border-radius: 0 $border-radius-large $border-radius-large 0;
    }
  }

  .find-password-button {
    @include button-style($secondary-color, $secondary-hover-color, $disabled-color);
    width: 100%;
    padding: $base-padding;
    border-radius: $border-radius-large;
    font-weight: bold;
  }
}
</style>

