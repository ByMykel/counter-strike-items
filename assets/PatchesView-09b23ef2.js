import{c as n,_ as m}from"./ItemsList.vue_vue_type_script_setup_true_lang-f8632812.js";import{b as c,d as l,u,c as p,a as t,o as d}from"./index-da932765.js";class f{async query({search:o}){let e=await c.get("https://bymykel.github.io/CSGO-API/api/en/patches.json").then(a=>a.data);return o&&(e=e.filter(a=>a.name.toLowerCase().includes(o.toLowerCase()))),{items:e}}}const g=l({__name:"PatchesView",setup(i){const o=u(),e=n({query:new f().query})("patches")();return e.fetch(),(a,s)=>(d(),p(m,{items:t(e).items,"items-count":t(e).itemsCount,loading:t(e).loading,search:t(e).search,onSetQuery:s[0]||(s[0]=r=>t(e).setSearch(r)),onSelect:s[1]||(s[1]=r=>t(o).getItemDetails(r)),onLoadMore:s[2]||(s[2]=r=>t(e).loadMore())},null,8,["items","items-count","loading","search"]))}});export{g as default};