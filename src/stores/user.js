import { defineStore } from "pinia";

import { auth, db } from "@/firebaseConfig.js";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useURLStore } from "./urls";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import router from "../router";

export const useUserStore = defineStore({
	id: "userStore",
	state: () => ({
		user: {},
		loadingUser: false,
		loadingSession: false,
	}),
	actions: {
		async setUser(user) {
			try {
				const docRef = doc(db, "users", user.uid);
				const docSpan = await getDoc(docRef);
				
				if (!docSpan.exists()) {
					await setDoc(docRef, user);
				}
				
				this.user = user;
			} catch (error) {
				console.error(error);
			}
		},
		async registerUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
			} catch (error) {
				console.error(error.code);
				return Promise.reject(error.code);
			} finally {
				this.loadingUser = false;
			}
		},
		async emailSignIn(email, password) {
			this.loadingUser = true;
			try {
				await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
				router.push({ name: "home" });
			} catch (error) {
				console.error(error.code);
				return Promise.reject(error.code);
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
				return Promise.reject(error.code);
			}
		},
		currentUser() {
			return new Promise((resolve, reject) => {
				const unsuscribe = onAuthStateChanged(
					auth,
					async (user) => {
						if (user) {
							await this.setUser({
								uid: user.uid,
								email: user.email,
								displayName: user.displayName,
								photoURL: user.photoURL,
							});
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
