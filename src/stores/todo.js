import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useTodoStore = defineStore('todo', () => {
	const todos = ref([]);
	const router = useRouter();
	
	// 모든 사용자의 TODO를 로컬 스토리지에서 로드
	const loadTodos = () => {
		const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
		console.log("Loaded todos:", storedTodos); // 로드된 후 로그 출력
		todos.value = storedTodos;
	};
	
	// 모든 사용자의 TODO를 로컬 스토리지에 저장
	const saveTodos = () => {
		console.log("Saving todos:", todos.value); // 데이터가 저장되기 전에 로그 출력
		localStorage.setItem('todos', JSON.stringify(todos.value));
	};
	
	const addTodo = (title) => {
		const newTodo = {
			id: Date.now(),
			title,
			status: 0, // 기본적으로 '진행 예정' 상태로 설정 (0)
		};
		todos.value.push(newTodo);
		console.log("Before saving todos:", todos.value); // 저장 전 로그 출력
		saveTodos(); // 로컬 스토리지에 저장
		router.push('/upcoming-todos');
	};
	
	const removeTodo = (id) => {
		todos.value = todos.value.filter(todo => todo.id !== id);
		saveTodos(); // 변경 사항을 저장
	};
	
	const updateTodoStatus = (id) => {
		const todo = todos.value.find(todo => todo.id === id);
		if (todo && todo.status < 2) {
			todo.status += 1; // 상태를 2(완료)까지만 변경
			console.log("Updated status to:", todo.status); // 디버깅 로그 추가
			saveTodos(); // 변경 사항을 저장
		}
	};
	
	return {
		todos,
		loadTodos,
		addTodo,
		removeTodo,
		updateTodoStatus,
	};
});
