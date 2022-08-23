<template>
	<div style="margin-top: 1rem">
		<p v-if="URLStore.loadingDocs">Loading...</p>
		<ul
			v-else
			style="list-style-type: none; padding: 0;"
		>
			<a-space direction="vertical">
				<li
					v-for="document of documents"
					:key="document.id"
				>
					<a-card :title="'URL: ' + document.name">
						<template #extra>
							<a-space>
								<a-popconfirm
									danger
									@confirm="deleteConfirm(document.id)"
									@cancel="deleteCancel()"
									title="Are you sure about that?"
								>
									<template #icon>
										<question-circle-outlined style="color: red" />
									</template>
									<a-button
										danger
										:disabled="URLStore.loadingCDDocs"
										:loading="URLStore.loadingCDDocs"
									>
										Delete
									</a-button>
								</a-popconfirm>
								<a-button
									type="primary"
									@click="document.editing = true"
								>
									Edit
								</a-button>
							</a-space>
						</template>
						<p v-if="!document.editing">ID: {{ document.id }}</p>
						<p v-if="!document.editing">SHORT:{{ document.short }}</p>
						<p v-if="!document.editing">USER: {{ document.user }}</p>
						<EditURL
							v-else
							:doc="document"
						/>
					</a-card>
				</li>
			</a-space>
		</ul>
	</div>
</template>

<script setup>
import { useURLStore } from "@/stores/urls.js";
import { computed } from "vue";
import EditURL from "./EditURL.vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const URLStore = useURLStore();

const documents = computed(() => URLStore.documents);

URLStore.getURLS();

const deleteConfirm = async id => {
	URLStore.deleteURL(id)
		.then(_ => message.success("URL Successfully Deleted"))
		.catch(_ => message.error("Something went wrong... :c"))
}

const deleteCancel = _ => message.info("Deletion Cancelled")
</script>

<style scoped>
</style>
