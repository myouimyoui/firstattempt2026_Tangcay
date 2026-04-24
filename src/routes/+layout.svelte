<script>
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.then((reg) => console.log("[SW] Registered:", reg.scope))
				.catch((err) => console.error("[SW] Registration failed:", err));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="/icons/addu-seal-192.png" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="#004080" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<link rel="apple-touch-icon" href="/icons/addu-seal.png" />
</svelte:head>

{@render children()}