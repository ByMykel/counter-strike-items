if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const u=e=>i(e,r),a={module:{uri:r},exports:t,require:u};s[r]=Promise.all(l.map((e=>a[e]||u(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AgentsView-effd28e9.js",revision:null},{url:"assets/CollectiblesView-268d1867.js",revision:null},{url:"assets/CollectionsView-3be8c244.js",revision:null},{url:"assets/CratesView-e45610da.js",revision:null},{url:"assets/FiltersPanel.vue_vue_type_script_setup_true_lang-34475b65.js",revision:null},{url:"assets/GraffitiView-0eddf4c7.js",revision:null},{url:"assets/HomeView-ab80256d.js",revision:null},{url:"assets/index-74c56bc0.js",revision:null},{url:"assets/index-a26e3ed3.css",revision:null},{url:"assets/ItemsList.vue_vue_type_script_setup_true_lang-4c788c47.js",revision:null},{url:"assets/KeysView-1135a3cc.js",revision:null},{url:"assets/MusicKitsView-a16e8411.js",revision:null},{url:"assets/PatchesView-dadb0706.js",revision:null},{url:"assets/SkinsView-1ac8edec.js",revision:null},{url:"assets/StickersView-c97af2ca.js",revision:null},{url:"index.html",revision:"da9096012e980657b0677fe229b6a81c"},{url:"registerSW.js",revision:"34909c7bf71986330539b1e4325dde1b"},{url:"favicon.ico",revision:"30985f5f7b74c1ab282cbeba66e3fa63"},{url:"pwa-192x192.png",revision:"1322cbba3af7a501a295fcf37b3d8ecc"},{url:"pwa-512x512.png",revision:"9b9f5f3434a7d8bad6277ae1aa3099ec"},{url:"manifest.webmanifest",revision:"6e6d366ca61b7c74ce8f8f62c0e23b59"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));