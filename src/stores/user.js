import { defineStore } from "pinia";

import { auth } from "@/firebaseConfig.js";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useURLStore } from "./urls";

export const useUserStore = defineStore({
	id: "userStore",
	state: () => ({
		user: {},
		loadingUser: false,
		loadingSession: false,
	}),
	actions: {
		async registerUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				console.log(user);
			} catch (error) {
				console.error(error.code);
				return error.code;
			} finally {
				this.loadingUser = false;
			}
		},
		async emailSignIn(email, password) {
			this.loadingUser = true;
			try {
				this.user = await signInWithEmailAndPassword(
					auth,
					email,
					password
				)
					.then(({ user }) => user)
					.then(({ email, uid }) => ({ email, uid }));
			} catch (error) {
				console.error(error.code);
				return error.code;
			} finally {
				this.loadingUser = false;
			}
		},
		async userSignOut() {
			const URLStore = useURLStore();
			try {
				await signOut(auth);
				this.user = {};
				URLStore.$reset(); //*#-- Resets all data in the store to it's initial state 
			} catch (error) {
				console.error(error.code);
				return error.code;
			}
		},
		currentUser() {
			return new Promise((resolve, reject) => {
				const unsuscribe = onAuthStateChanged(
					auth,
					(user) => {
						if (user) {
							this.user = { email: user.email, uid: user.uid };
						} else {
							this.user = {};
						}
						resolve(user);
					},
					(e) => reject(e)
				);
				unsuscribe();
			});
		},
	},
	getters: {
		isUserLogged() {
			return !!Object.keys(this.user).length;
		},
	},
});
