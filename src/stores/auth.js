import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter();
	const isAuthenticated = ref(false); // 로그인 상태를 추적
	const currentUser = ref(null); // 현재 로그인한 사용자 정보를 저장
	
	const registerUser = (PhoneNumber, PIN) => {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		const newUser = { PhoneNumber: PhoneNumber, PIN: PIN, id: Date.now() }; // id 추가
		users.push(newUser);
		localStorage.setItem('users', JSON.stringify(users));
	};
	
	const login = (PhoneNumber, PIN) => {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		const user = users.find(user => user.PhoneNumber === PhoneNumber);
		
		if (!user) {
			alert('등록되지 않은 전화번호입니다.');
		} else if (user.PIN !== PIN) {
			alert('PIN이 잘못되었습니다.');
		} else {
			isAuthenticated.value = true;
			currentUser.value = user; // .value로 설정
			console.log("Login successful, current user:", currentUser.value); // 현재 사용자 정보 확인
			localStorage.setItem('lastLoggedInUser', JSON.stringify(user));
			alert('로그인 성공!');
			router.push('/all-todos');
		}
	};
	
	const logout = () => {
		isAuthenticated.value = false;
		currentUser.value = null;
		localStorage.removeItem('lastLoggedInUser'); // 자동 로그인 정보 삭제
		alert('로그아웃 되었습니다.');
		router.push('/login');
	};
	
	const deleteAccount = () => {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		
		const user = users.find(user => user.PhoneNumber === currentUser.value.PhoneNumber && user.PIN === currentUser.value.PIN);
		
		if (user) {
			const index = users.indexOf(user);
			users.splice(index, 1); // 사용자를 목록에서 제거
			localStorage.setItem('users', JSON.stringify(users)); // 로컬 스토리지 업데이트
			
			// Pinia 상태 업데이트
			isAuthenticated.value = false;
			currentUser.value = null;
			
			alert('계정이 삭제되었습니다.');
			router.push('/login');
		} else {
			alert('전화번호 또는 PIN이 잘못되었습니다.');
		}
	};
	
	return { isAuthenticated, currentUser, deleteAccount, registerUser, login, logout };
});
