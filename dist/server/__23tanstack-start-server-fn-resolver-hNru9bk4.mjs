//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-hNru9bk4.js
var manifest = { "f4ab91175279d24fdd2724e2cfe526fe74336bbdfd18bfac38060247ff17403a": {
	functionName: "sendContactMessage_createServerFn_handler",
	importer: () => import("./_ssr/contact.functions-CEPCIHaG.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
