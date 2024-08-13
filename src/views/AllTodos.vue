<template>
  <div>
    <h1>모든 TODO</h1>
    <form @submit.prevent="handleAddTodo">
      <input v-model="newTodo" placeholder="새로운 TODO 입력" />
      <button type="submit">추가</button>
    </form>

    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <span>{{ todo.title }}</span>
        <button @click="changeStatus(todo.id)">
          {{ getStatusLabel(todo.status) }}
        </button>
        <button @click="removeTodo(todo.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();
const newTodo = ref('');

onMounted(() => {
  todoStore.loadTodos(); // 컴포넌트가 로드될 때 TODO 목록 불러오기
});

const handleAddTodo = () => {
  if (newTodo.value.trim() !== '') {
    todoStore.addTodo(newTodo.value);
    newTodo.value = ''; // 입력 필드 초기화
  }
};

const removeTodo = (id) => {
  todoStore.removeTodo(id);
};

const changeStatus = (id) => {
  todoStore.updateTodoStatus(id);
};

const getStatusLabel = (status) => {
  console.log("Current status:", status);  // 디버깅용 로그
  switch (status) {
    case 0:
      return '진행 예정';
    case 1:
      return '진행 중';
    case 2:
      return '완료';
    default:
      return '알 수 없음';
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

input {
  padding: $padding-small;
  margin-right: $padding-medium;
}

button {
  @include button-style($primary-color, $primary-hover-color);
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: $padding-medium;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: $padding-medium;
    }
  }
}
</style>
