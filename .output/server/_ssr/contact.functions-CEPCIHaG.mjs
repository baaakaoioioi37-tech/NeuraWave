import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as string, t as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact.functions-CEPCIHaG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var schema = object({
	name: string().trim().min(1).max(100),
	email: string().trim().email().max(255),
	message: string().trim().min(1).max(2e3)
});
var sendContactMessage_createServerFn_handler = createServerRpc({
	id: "f4ab91175279d24fdd2724e2cfe526fe74336bbdfd18bfac38060247ff17403a",
	name: "sendContactMessage",
	filename: "src/lib/contact.functions.ts"
}, (opts) => sendContactMessage.__executeServer(opts));
var sendContactMessage = createServerFn({ method: "POST" }).inputValidator((input) => schema.parse(input)).handler(sendContactMessage_createServerFn_handler, async ({ data }) => {
	const accessKey = globalThis.process?.env?.WEB3FORMS_ACCESS_KEY;
	if (!accessKey) return {
		ok: false,
		error: "El servicio de envío no está configurado. Añade WEB3FORMS_ACCESS_KEY en los secretos del proyecto."
	};
	const res = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			access_key: accessKey,
			subject: `Nueva queja/sugerencia de ${data.name}`,
			from_name: "Formulario IA Web",
			email: data.email,
			name: data.name,
			message: data.message,
			to: "alanjexux@gmail.com"
		})
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok || !json.success) return {
		ok: false,
		error: json.message ?? "No se pudo enviar el mensaje."
	};
	return { ok: true };
});
//#endregion
export { sendContactMessage_createServerFn_handler };
