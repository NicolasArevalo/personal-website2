import 'piccolore';
import { y as decodeKey } from './chunks/astro/server_ByrFftsg.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Br2hoIon.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/","cacheDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/node_modules/.astro/","outDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/dist/","srcDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/src/","publicDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/public/","buildClientDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/dist/client/","buildServerDir":"file:///C:/Users/inag4/Escritorio/Programacion/Blog/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"profesional/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profesional","isIndex":false,"type":"page","pattern":"^\\/profesional\\/?$","segments":[[{"content":"profesional","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profesional.astro","pathname":"/profesional","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sobre-mi/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sobre-mi","isIndex":false,"type":"page","pattern":"^\\/sobre-mi\\/?$","segments":[[{"content":"sobre-mi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sobre-mi.astro","pathname":"/sobre-mi","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/404.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/blog/[page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/profesional.astro",{"propagation":"none","containsHead":true}],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/sobre-mi.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/blog/[page]@_@astro":"pages/blog/_page_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/profesional@_@astro":"pages/profesional.astro.mjs","\u0000@astro-page:src/pages/sobre-mi@_@astro":"pages/sobre-mi.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DirETJdp.mjs","C:/Users/inag4/Escritorio/Programacion/Blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DW378sGD.mjs","C:\\Users\\inag4\\Escritorio\\Programacion\\Blog\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\inag4\\Escritorio\\Programacion\\Blog\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Dl4t7joN.mjs","C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/404.astro?astro&type=script&index=0&lang.ts":"_astro/404.astro_astro_type_script_index_0_lang.Dy3OSw8_.js","C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/profesional.astro?astro&type=script&index=0&lang.ts":"_astro/profesional.astro_astro_type_script_index_0_lang.BS5d-mW0.js","C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.D75R6ifK.js","C:/Users/inag4/Escritorio/Programacion/Blog/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.BL0CcFgN.js","C:/Users/inag4/Escritorio/Programacion/Blog/src/components/NewsletterCTA.astro?astro&type=script&index=0&lang.ts":"_astro/NewsletterCTA.astro_astro_type_script_index_0_lang.D1rJE_NV.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/404.astro?astro&type=script&index=0&lang.ts","window.location.replace(\"/\");"],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/profesional.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.querySelectorAll(\".badge\"),e=document.getElementById(\"prof-alert\");e&&t.length>0&&t.forEach(s=>{s.addEventListener(\"click\",l=>{l.preventDefault(),e.style.display=\"flex\",e.offsetHeight,e.classList.add(\"show-alert\"),setTimeout(()=>{e.classList.remove(\"show-alert\"),setTimeout(()=>{e.classList.contains(\"show-alert\")||(e.style.display=\"none\")},400)},3e3)})})});"],["C:/Users/inag4/Escritorio/Programacion/Blog/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"load-more-btn\");e&&e.addEventListener(\"click\",()=>{const t=Array.from(document.querySelectorAll(\".hidden-post\"));t.length>0&&(t.slice(0,5).forEach(n=>{n.classList.remove(\"hidden-post\")}),t.length<=5&&(e.style.display=\"none\"))})});"],["C:/Users/inag4/Escritorio/Programacion/Blog/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"mousedown\",e=>{if(e.target.closest(\"a, button, input, textarea, select, summary, details, nav, .navbar, header\"))return;const t=document.createElement(\"div\");t.className=\"global-click-ripple\",t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`;const n=50+Math.random()*100,a=Math.random()*Math.PI*2,s=Math.cos(a)*n,o=Math.sin(a)*n;t.style.setProperty(\"--tx\",`${s}px`),t.style.setProperty(\"--ty\",`${o}px`),document.body.appendChild(t),t.addEventListener(\"animationend\",()=>{t.remove()})});"],["C:/Users/inag4/Escritorio/Programacion/Blog/src/components/NewsletterCTA.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const n=document.getElementById(\"newsletter-form\"),e=document.getElementById(\"newsletter-alert\"),s=e?.querySelector(\"p\");n&&e&&s&&n.addEventListener(\"submit\",async a=>{a.preventDefault();const i=new FormData(n),t=n.querySelector(\"button\");if(!t)return;const l=t.textContent||\"\";t.textContent=\"Enviando...\",t.disabled=!0;try{const o=await fetch(\"/api/subscribe\",{method:\"POST\",body:i}),r=await o.json();o.ok?(s.textContent=r.message||\"¡Gracias por suscribirte!\",n.reset()):s.textContent=r.message||\"Hubo un error al suscribirte.\"}catch{s.textContent=\"Error de conexión. Intenta nuevamente.\"}finally{t.textContent=l,t.disabled=!1,e.style.display=\"flex\",e.offsetHeight,e.classList.add(\"show-alert\"),setTimeout(()=>{e.classList.remove(\"show-alert\"),setTimeout(()=>{e.style.display=\"none\"},400)},4e3)}})});"]],"assets":["/_astro/naiconWhite.T9GLcBOP.svg","/_astro/_page_.D0jJA1Gn.css","/_astro/_slug_.DaEufkaz.css","/_astro/sobre-mi.CVTvBWZG.css","/_astro/index.CoR0-LBb.css","/favicon.ico","/favicon.svg","/na.ico","/naicon.svg","/404.html","/profesional/index.html","/sobre-mi/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"gTWjyDo/Daeg9rPGtzg7xxFsy4952Re4hh6YvxhsfiQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
