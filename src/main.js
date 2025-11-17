import {createSSRApp} from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import NologoFooter from "./components/nologo-footer.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia()).use(NologoFooter)
	return {
		app,
	};
}
