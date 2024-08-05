<script setup lang="ts">
const localePath = useLocalePath();

await navigateTo(localePath('/tasks/board'));
</script>
