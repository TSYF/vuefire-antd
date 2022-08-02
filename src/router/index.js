import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useUserStore } from "../stores/user";

export const requireAuth = async () => {
	const userStore = useUserStore();
	userStore.loadingSession = true;
	const user = await userStore.currentUser();
	userStore.loadingSession = false;
	if (!user) {
		return { name: "login" };
	}
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			beforeEnter: requireAuth,
		},
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/LoginView.vue"),
		},
		{
			path: "/register",
			name: "register",
			component: () => import("@/views/RegisterView.vue"),
		},
	],
});

export default router;
