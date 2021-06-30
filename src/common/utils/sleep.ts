export function sleep(timeout: number): void {
	(async () => {
		await new Promise((r) => setTimeout(r, timeout));
	})();
}