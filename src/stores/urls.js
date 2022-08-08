import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "@/firebaseConfig.js";
import { defineStore } from "pinia";
import { auth } from "@/firebaseConfig";

export const useURLStore = defineStore({
	id: "URLStore",
	state: () => ({
		documents: [],
		loadingDocs: false,
	}),
	actions: {
		async getURLS() {
			try {
				if (this.documents.length) {
					return;
				}

				this.loadingDocs = true;

				const { uid } = auth.currentUser;

				const col = collection(db, "urls");

				const q = query(col, where("user", "==", uid));

				await getDocs(q).then((qs) => {
					const arr = [];
					qs.forEach((doc) => {
						arr.push({ id: doc.id, ...doc.data() });
					});
					this.documents = [...arr];
				});
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingDocs = false;
			}
		},
	},
});
