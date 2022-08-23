import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
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

					//*#-- Different forEach
					qs.forEach((document) => {
						arr.push({
							id: document.id,
							editing: false,
							...document.data(),
						});
					});

					this.documents = [...arr];
				});
			} catch (error) {
				console.error(error.code);
				return error.code;
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

				this.documents.push({ editing: false, ...url });

				return docRef;
			} catch (error) {
				console.error(error.code);
				return error.code;
			} finally {
				this.loadingDocs = false;
			}
		},
		async deleteURL(id) {
			try {
				const docRef = doc(db, "urls", id);
				const docSpan = await getDoc(docRef);

				if (!docSpan.exists())
					throw new Error("Document to delete doesn't exist");
				if (docSpan.data().user !== auth.currentUser.uid)
					throw new Error("Document doesn't belong to current user");

				await deleteDoc(docRef);

				this.documents = this.documents.filter(
					(document) => document.id !== id
				);
			} catch (error) {
				console.error(error.code);
				return error.code;
			} finally {
			}
		},
		async editURL(id, url) {
			try {
				const docRef = doc(db, "urls", id);

				getDoc(docRef).then((document) => {
					if (!document.exists())
						throw new Error("Document to update doesn't exist");
					if (document.data().user !== auth.currentUser.uid)
						throw new Error(
							"Document doesn't belong to current user"
						);
				});

				await updateDoc(docRef, { name: url });

				this.documents = this.documents.map((item) =>
					item.id === id
						? { ...item, name: url, editing: false }
						: item
				);
			} catch (error) {
				console.error(error.code);
				return error.code;
			} finally {
			}
		},
	},
});
