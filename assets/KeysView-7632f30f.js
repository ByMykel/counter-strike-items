import{c,_ as p}from"./ItemsList.vue_vue_type_script_setup_true_lang-fce18afe.js";import{b as y,g as d,f as v,d as S,u as g,r as k,e as _,h,a as s,c as w,i as x,o as f}from"./index-01bcbc57.js";import{_ as C}from"./FiltersPanel.vue_vue_type_script_setup_true_lang-15e7ac39.js";class F{async query({search:o,filters:e}){let r=await y.get("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keys.json").then(n=>n.data);const l=[{prop:"crates",name:"Crate",type:"multi-select",options:d(r,{type:"fromNestedProperty",property:"crates"})}];return{items:v(r,o,e),filters:l}}}const I={class:"flex flex-row flex-1"},V=S({__name:"KeysView",setup(m){const o=g(),e=c({query:new F().query})("keys")(),r=k(!1);function l(){o.deleteItem(),r.value=!0}function n(i){r.value=!1,o.getItemDetails(i)}function u({prop:i,value:t}){e.setFilters({prop:i,value:t}),e.fetch()}return(i,t)=>(f(),_("div",I,[h(p,{items:s(e).items,"items-count":s(e).itemsCount,loading:s(e).loading,search:s(e).search,"has-filters":s(e).filters.length>0,onSetQuery:t[0]||(t[0]=a=>s(e).setSearch(a)),onSelect:n,onLoadMore:t[1]||(t[1]=a=>s(e).loadMore()),onOpenFilters:t[2]||(t[2]=a=>l())},null,8,["items","items-count","loading","search","has-filters"]),r.value?(f(),w(C,{key:0,filters:s(e).filters,"filters-values":s(e).filtersValues,onSetFilters:u,onClose:t[3]||(t[3]=a=>r.value=!1)},null,8,["filters","filters-values"])):x("",!0)]))}});export{V as default};
