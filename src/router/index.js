import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Profile from '@/views/Profile.vue';
import AllTodos from '@/views/AllTodos.vue';
import UpcomingTodos from '@/views/UpcomingTodos.vue';
import InProgressTodos from '@/views/InProgressTodos.vue';
import CompletedTodos from '@/views/CompletedTodos.vue';

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: Login },
	{ path: '/signup', component: Signup },
	{ path: '/forgot-password', component: ForgotPassword },
	{ path: '/profile', component: Profile },
	{ path: '/all-todos', component: AllTodos },
	{ path: '/upcoming-todos', component: UpcomingTodos },
	{ path: '/in-progress-todos', component: InProgressTodos },
	{ path: '/completed-todos', component: CompletedTodos },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	if (!authStore.isAuthenticated && to.path !== '/login' && to.path !== '/signup' && to.path !== '/forgot-password') {
		next('/login');
	} else if (authStore.isAuthenticated && to.path === '/login') {
		next('/all-todos');
	} else {
		next();
	}
});
export default router;
