<template>
	<a-row :style="{
		padding: '3rem'
	}">
		<a-col
			:xs="{ span: 24 }"
			:lg="{ span: 12, offset: 6 }"
		>
			<a-form
				:model="user"
				name="login"
				autocomplete="on"
				layout="vertical"
				@finish="login()"
			>
				<a-form-item
					name="email"
					:rules="{
						required: true,
						message: 'Email must not be empty and must be valid',
						type: 'email',
						whitespace: true
					}"
				>
					<a-input
						v-model:value="user.email"
						placeholder="Email"
						type="email"
					/>
				</a-form-item>
				<a-form-item
					name="password"
					:rules="{
						required: true,
						message: '6 character minimum password must not be empty',
						len: 6,
						whitespace: true
					}"
				>
					<a-input-password
						v-model:value="user.password"
						placeholder="Password"
					/>
				</a-form-item>
				<a-form-item>
					<a-button
						html-type="submit"
						:disabled="userStore.loadingUser"
					>
						Submit
					</a-button>
				</a-form-item>
			</a-form>
		</a-col>
	</a-row>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js"
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const userStore = useUserStore();

const router = useRouter();

const login = () => {
	userStore.emailSignIn(user.email, user.password)
		.then(() => {
			router.push({ name: "home" })
			user.email = "";
			user.password = "";
		});
};

const user = reactive({
	email: '',
	password: '',
})
</script>

<style lang="scss" scoped>
</style>
