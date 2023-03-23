<template>
    <div>
        <h1>Profile</h1>
        <h2>{{ user.displayName }}</h2>
        <img :src="user.photoURL" alt="Profile Photo">
        <br>
        <em>{{ user.email }}</em>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";

const { user } = useUserStore();

</script>

<style lang='scss' scoped>

</style>