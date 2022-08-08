import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore/lite";
import { db } from "@/firebaseConfig.js";
import { defineStore } from "pinia";
import { auth } from "@/firebaseConfig";
import { nanoid } from "nanoid";

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
					qs.forEach((document) => {
						arr.push({ id: document.id, ...document.data() });
					});
					this.documents = [...arr];
				});
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingDocs = false;
			}
		},
		async addURL(urlName) {
			try {
				this.loadingDocs = true;

				const url = {
					name: urlName,
					short: nanoid(6),
					user: auth.currentUser.uid,
				};

				const col = collection(db, "urls");

				const docRef = await addDoc(col, url);

				console.table(docRef);

				this.documents.push(url);
			} catch (error) {
				console.error(error);
			} finally {
				this.loadingDocs = false;
			}
		},
		async deleteURL(id) {
			try {
				this.loadingDocs = true;
				const docRef = doc(db, "urls", id);
				await deleteDoc(docRef);
				this.documents = this.documents.filter(
					(document) => document.id !== id
				);
			} catch (error) {
				console.error(error);
			} finally {
				this.loadingDocs = false;
			}
		},
	},
});
