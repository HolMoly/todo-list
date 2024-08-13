<template>
  <div>
    <h1>완료된 TODO</h1>
    <ul>
      <li v-for="todo in completedTodos" :key="todo.id">
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
import { computed } from 'vue';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const completedTodos = computed(() => {
  return todoStore.todos.filter(todo => todo.status === 2); // status 2 = 완료
});

const changeStatus = (id) => {
  todoStore.updateTodoStatus(id);
};

const removeTodo = (id) => {
  todoStore.removeTodo(id);
};

const getStatusLabel = (status) => {
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
  padding: $base-padding / 2;
  margin-right: $base-padding;
}

button {
  @include button-style($primary-color, $primary-hover-color);
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: $base-padding;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: $base-padding;
    }
  }
}
</style>

