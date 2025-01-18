import{c as _,_ as d}from"./ItemsList.vue_vue_type_script_setup_true_lang-fe7ac468.js";import{g as v,b as S,t as o,e as i,f as g,d as k,u as F,r as h,h as P,i as w,a as s,c as x,j as C,o as c}from"./index-1bd73e3e.js";import{_ as I}from"./FiltersPanel.vue_vue_type_script_setup_true_lang-c8e20270.js";class L{async query({search:l,filters:e}){const n=v();let t=await S.get(`https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${n}/stickers.json`).then(f=>f.data);const m=[{prop:"rarity",name:o("filter_rarity"),type:"multi-select",options:i(t,{type:"fromNestedSingleProperty",property:"rarity"})},{prop:"crates",name:o("filter_crate"),type:"multi-select",options:i(t,{type:"fromNestedProperty",property:"crates"})},{prop:"type",name:o("filter_type"),type:"multi-select",options:i(t,{type:"fromProperty",property:"type"})},{prop:"effect",name:o("filter_effect"),type:"multi-select",options:i(t,{type:"fromProperty",property:"effect"})},{prop:"tournament_event",name:o("filter_tournament"),type:"multi-select",options:i(t,{type:"fromProperty",property:"tournament_event"})},{prop:"tournament_team",name:o("filter_team"),type:"multi-select",options:i(t,{type:"fromProperty",property:"tournament_team"})},{prop:"tournament_player",name:o("filter_player"),type:"multi-select",options:i(t,{type:"fromProperty",property:"tournament_player"})}];return{items:g(t,l,e),filters:m}}}const $={class:"flex flex-row flex-1"},b=k({__name:"StickersView",setup(u){const l=F(),e=_({query:new L().query})("stickers")(),n=h(!1);function t(){l.deleteItem(),n.value=!0}function m(a){n.value=!1,l.getItemDetails(a)}function f({prop:a,value:r}){e.setFilters({prop:a,value:r}),e.fetch()}function y(){e.removeFilters(),e.fetch()}return(a,r)=>(c(),P("div",$,[w(d,{items:s(e).items,"items-count":s(e).itemsCount,loading:s(e).loading,search:s(e).search,"has-filters":s(e).filters.length>0,onSetQuery:r[0]||(r[0]=p=>s(e).setSearch(p)),onSelect:m,onLoadMore:r[1]||(r[1]=p=>s(e).loadMore()),onOpenFilters:r[2]||(r[2]=p=>t())},null,8,["items","items-count","loading","search","has-filters"]),n.value?(c(),x(I,{key:0,filters:s(e).filters,"filters-values":s(e).filtersValues,onSetFilters:f,onRemoveFilters:y,onClose:r[3]||(r[3]=p=>n.value=!1)},null,8,["filters","filters-values"])):C("",!0)]))}});export{b as default};
