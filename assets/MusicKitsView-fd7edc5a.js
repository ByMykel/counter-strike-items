import{c as n,_ as m}from"./ItemsList.vue_vue_type_script_setup_true_lang-4840376b.js";import{b as u,d as c,u as l,c as d,a as t,o as f}from"./index-665fc23a.js";class p{async query(i){let e=await u.get("https://bymykel.github.io/CSGO-API/api/en/music_kits.json").then(o=>o.data);return i&&(e=e.filter(o=>o.name.toLowerCase().includes(i.toLowerCase()))),{items:e}}}const g=c({__name:"MusicKitsView",setup(r){const i=l(),e=n({query:new p().query})("music-kits")();return e.fetch(),(o,s)=>(f(),d(m,{items:t(e).items,"items-count":t(e).itemsCount,loading:t(e).loading,search:t(e).search,onSetQuery:s[0]||(s[0]=a=>t(e).setSearch(a)),onSelect:s[1]||(s[1]=a=>t(i).getItemDetails(a)),onLoadMore:s[2]||(s[2]=a=>t(e).loadMore())},null,8,["items","items-count","loading","search"]))}});export{g as default};
