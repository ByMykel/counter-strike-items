import{c,_ as d}from"./ItemsList.vue_vue_type_script_setup_true_lang-8f9b0f01.js";import{b as v,g as o,f as _,d as S,u as g,r as k,e as F,h as P,a as s,c as h,i as w,o as m}from"./index-728f4e8e.js";import{_ as x}from"./FiltersPanel.vue_vue_type_script_setup_true_lang-ed1a03b3.js";class C{async query({search:n,filters:e}){let t=await v.get("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/stickers.json").then(p=>p.data);const l=[{prop:"rarity",name:"Rarity",type:"multi-select",options:o(t,{type:"fromNestedSingleProperty",property:"rarity"})},{prop:"crates",name:"Crate",type:"multi-select",options:o(t,{type:"fromNestedProperty",property:"crates"})},{prop:"type",name:"Type",type:"multi-select",options:o(t,{type:"fromProperty",property:"type"})},{prop:"effect",name:"Effect",type:"multi-select",options:o(t,{type:"fromProperty",property:"effect"})},{prop:"tournament_event",name:"Tournament",type:"multi-select",options:o(t,{type:"fromProperty",property:"tournament_event"})},{prop:"tournament_team",name:"Team",type:"multi-select",options:o(t,{type:"fromProperty",property:"tournament_team"})},{prop:"tournament_player",name:"Player",type:"multi-select",options:o(t,{type:"fromProperty",property:"tournament_player"})}];return{items:_(t,n,e),filters:l}}}const I={class:"flex flex-row flex-1"},N=S({__name:"StickersView",setup(f){const n=g(),e=c({query:new C().query})("stickers")(),t=k(!1);function l(){n.deleteItem(),t.value=!0}function p(i){t.value=!1,n.getItemDetails(i)}function u({prop:i,value:r}){e.setFilters({prop:i,value:r}),e.fetch()}function y(){e.removeFilters(),e.fetch()}return(i,r)=>(m(),F("div",I,[P(d,{items:s(e).items,"items-count":s(e).itemsCount,loading:s(e).loading,search:s(e).search,"has-filters":s(e).filters.length>0,onSetQuery:r[0]||(r[0]=a=>s(e).setSearch(a)),onSelect:p,onLoadMore:r[1]||(r[1]=a=>s(e).loadMore()),onOpenFilters:r[2]||(r[2]=a=>l())},null,8,["items","items-count","loading","search","has-filters"]),t.value?(m(),h(x,{key:0,filters:s(e).filters,"filters-values":s(e).filtersValues,onSetFilters:u,onRemoveFilters:y,onClose:r[3]||(r[3]=a=>t.value=!1)},null,8,["filters","filters-values"])):w("",!0)]))}});export{N as default};