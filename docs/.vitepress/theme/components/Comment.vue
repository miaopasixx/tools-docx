<template>
	<div class="comments">
		<!-- params generate in https://giscus.app/zh-CN -->
		<Giscus
			v-if="showComment"
			repo="miaopasixx/tools-docx"
			repo-id="R_kgDOOVHh4g"
			category="Announcements"
			category-id="DIC_kwDOOVHh4s4Co-7d"
			mapping="url"
			:term="term"
			strict="0"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="bottom"
			:theme="theme"
			lang="zh-Hans"
			loading="lazy"
			crossorigin="anonymous"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, computed } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

const route = useRoute();
const { isDark } = useData();

const term = computed(() => route.path.slice(-3));
const theme = computed(() => (isDark.value ? "noborder_dark" : "noborder_light"));

// language变化不会触发重新加载，这里v-if强制刷新
const showComment = ref(true);
watch(
	() => route.path,
	() => {
		showComment.value = false;
		nextTick(() => {
			showComment.value = true;
		});
	},
	{
		immediate: true,
	}
);
</script>
<style lang="scss" scoped>
.comments {
	margin-top: 80px;
}
</style>
