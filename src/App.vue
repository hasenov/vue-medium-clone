<template>
	<McvTopbar />

	<RouterView />
</template>

<script>
import McvTopbar from '@/components/Topbar.vue'

export default {
	name: 'McvApp',
	components: {
		McvTopbar
	}
}
</script>