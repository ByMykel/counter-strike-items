import{c as y,_ as d}from"./ItemsList.vue_vue_type_script_setup_true_lang-9ab10c04.js";import{b as v,g as p,f as S,d as _,u as g,r as C,e as F,h,a as r,c as w,i as x,o as m}from"./index-396196b6.js";import{_ as I}from"./FiltersPanel.vue_vue_type_script_setup_true_lang-100d06b8.js";class k{async query({search:o,filters:e}){let s=await v.get("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json").then(l=>l.data);const a=[{prop:"contains",name:"Contains",type:"multi-select",options:p(s,{type:"fromNestedProperty",property:"contains"})},{prop:"contains_rare",name:"Contains special",type:"multi-select",options:p(s,{type:"fromNestedProperty",property:"contains_rare"})},{prop:"type",name:"Type",type:"multi-select",options:p(s,{type:"fromProperty",property:"type"})}];return{items:S(s,o,e),filters:a}}}const $={class:"flex flex-row flex-1"},P=_({__name:"CratesView",setup(c){const o=g(),e=y({query:new k().query})("crates")(),s=C(!1);function a(){o.deleteItem(),s.value=!0}function l(n){s.value=!1,o.getItemDetails(n)}function f({prop:n,value:t}){e.setFilters({prop:n,value:t}),e.fetch()}function u(){e.removeFilters(),e.fetch()}return(n,t)=>(m(),F("div",$,[h(d,{items:r(e).items,"items-count":r(e).itemsCount,loading:r(e).loading,search:r(e).search,"has-filters":r(e).filters.length>0,onSetQuery:t[0]||(t[0]=i=>r(e).setSearch(i)),onSelect:l,onLoadMore:t[1]||(t[1]=i=>r(e).loadMore()),onOpenFilters:t[2]||(t[2]=i=>a())},null,8,["items","items-count","loading","search","has-filters"]),s.value?(m(),w(I,{key:0,filters:r(e).filters,"filters-values":r(e).filtersValues,onSetFilters:f,onRemoveFilters:u,onClose:t[3]||(t[3]=i=>s.value=!1)},null,8,["filters","filters-values"])):x("",!0)]))}});export{P as default};
