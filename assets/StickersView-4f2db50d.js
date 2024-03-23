import{c as d,_ as S}from"./ItemsList.vue_vue_type_script_setup_true_lang-cdbd0f91.js";import{b as _,d as v,u as k,r as w,e as g,f as h,a,c as C,g as I,o as f}from"./index-e8dbe1f1.js";import{u as c,_ as F}from"./FiltersPanel.vue_vue_type_script_setup_true_lang-0ab92ff3.js";class b{async query({search:l,filters:t}){let n=await _.get("https://bymykel.github.io/CSGO-API/api/en/stickers.json").then(e=>e.data);const i=[{prop:"rarity",name:"Rarity",type:"multi-select",options:c(n.map(e=>({id:e.rarity.id,name:e.rarity.name})),"id")},{prop:"crates",name:"Crate",type:"multi-select",options:c(n.flatMap(e=>(e==null?void 0:e.crates)??[]),"id")},{prop:"type",name:"Type",type:"multi-select",options:[...new Set(n.filter(e=>e.type!=null).map(e=>e.type))].map(e=>({id:e,name:e}))},{prop:"effect",name:"Effect",type:"multi-select",options:[...new Set(n.filter(e=>e.effect!=null).map(e=>e.effect))].map(e=>({id:e,name:e}))},{prop:"tournament_event",name:"Tournament",type:"multi-select",options:[...new Set(n.filter(e=>e.tournament_event!=null).map(e=>e.tournament_event))].map(e=>({id:e,name:e}))},{prop:"tournament_team",name:"Team",type:"multi-select",options:[...new Set(n.filter(e=>e.tournament_team!=null).map(e=>e.tournament_team))].map(e=>({id:e,name:e}))},{prop:"tournament_player",name:"Player",type:"multi-select",options:[...new Set(n.filter(e=>e.tournament_player!=null).map(e=>e.tournament_player))].map(e=>({id:e,name:e}))}];return(l||Object.keys(t).length>0)&&(n=n.filter(e=>{const m=e.name.toLowerCase().includes(l.toLowerCase()),o=Object.keys(t).every(s=>{const r=e[s],u=t[s];return r?Array.isArray(r)?r.map(p=>p.id).some(p=>u.includes(p)):typeof r=="string"||typeof r=="boolean"?u.includes(r.toString()):u.includes(r.id):!1});return m&&o})),{items:n,filters:i}}}const x={class:"flex flex-row flex-1"},O=v({__name:"StickersView",setup(y){const l=k(),t=d({query:new b().query})("stickers")(),n=w(!1);function i(){l.deleteItem(),n.value=!0}function e(o){n.value=!1,l.getItemDetails(o)}function m({prop:o,value:s}){t.setFilters({prop:o,value:s}),t.fetch()}return t.fetch(),(o,s)=>(f(),g("div",x,[h(S,{items:a(t).items,"items-count":a(t).itemsCount,loading:a(t).loading,search:a(t).search,"has-filters":a(t).filters.length>0,onSetQuery:s[0]||(s[0]=r=>a(t).setSearch(r)),onSelect:e,onLoadMore:s[1]||(s[1]=r=>a(t).loadMore()),onOpenFilters:s[2]||(s[2]=r=>i())},null,8,["items","items-count","loading","search","has-filters"]),n.value?(f(),C(F,{key:0,filters:a(t).filters,"filters-values":a(t).filtersValues,onSetFilters:m,onClose:s[3]||(s[3]=r=>n.value=!1)},null,8,["filters","filters-values"])):I("",!0)]))}});export{O as default};
