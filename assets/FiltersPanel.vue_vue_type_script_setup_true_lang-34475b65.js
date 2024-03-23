import{o as a,e as r,j as l,d as m,r as k,F as _,k as f,l as g,t as v,h as c,i as w,a as b,m as y,n as h}from"./index-74c56bc0.js";function $(p,s){return a(),r("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[l("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})])}const C=["value","checked","onChange"],V=m({__name:"MultiSelectFilter",props:{options:{},values:{}},emits:["update:values"],setup(p,{emit:s}){const t=k(p.values),e=n=>{const d=t.value.indexOf(n);d===-1?t.value.push(n):t.value.splice(d,1),s("update:values",t.value)},u=n=>t.value.includes(n);return(n,d)=>(a(),r("div",null,[(a(!0),r(_,null,f(n.options,(i,x)=>(a(),r("label",{key:x,class:"flex items-center gap-2 p-2 text-gray-300 rounded-md cursor-pointer hover:bg-black-300"},[l("input",{type:"checkbox",class:"w-4 h-4 text-[#ff5e65] border-gray-300 rounded focus:ring-[#ff5e65]",value:i.id,checked:u(i.id),onChange:P=>e(i.id)},null,40,C),g(" "+v(i.name),1)]))),128))]))}}),F={key:0},B=m({__name:"FiltersPanelControl",props:{prop:{},name:{},type:{},options:{},values:{}},emits:["close","update:values"],setup(p){return(s,o)=>s.type==="multi-select"?(a(),r("div",F,[c(V,{options:s.options,values:s.values,"onUpdate:values":o[0]||(o[0]=t=>s.$emit("update:values",{prop:s.prop,value:t}))},null,8,["options","values"])])):w("",!0)}}),N={class:"h-dvh md:border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative z-50 bg-black-400"},j={class:"flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"},O=l("p",{class:"ml-4 truncate text-black-100"}," Filters ",-1),S={class:"h-[calc(100vh-69px)] py-4 pt-0 overflow-x-hidden"},z=["onClick"],M={class:"text-sm font-normal text-black-100"},D=m({__name:"FiltersPanel",props:{filters:{},filtersValues:{}},emits:["close","set-filters"],setup(p){const s=k({});return(o,t)=>(a(),r("div",N,[l("div",j,[l("button",{class:"disabled:cursor-wait",onClick:t[0]||(t[0]=e=>o.$emit("close"))},[c(b(y),{class:"w-6 h-6 text-white"})]),O]),l("div",S,[l("div",null,[(a(!0),r(_,null,f(o.filters,e=>{var u;return a(),r("div",{key:e.prop},[l("button",{class:"sticky top-0 flex items-center justify-between w-full p-4 font-semibold text-gray-100 border-b-2 border-black-300 bg-black-400",onClick:n=>s.value[e.prop]=!s.value[e.prop]},[l("div",null,[g(v(e.name)+" ",1),l("span",M,"("+v((u=o.filtersValues[e.prop])!=null&&u.length?`${o.filtersValues[e.prop].length}/${e.options.length}`:e.options.length)+")",1)]),c(b($),{class:h(["w-6 h-6 duration-300 text-black-200",{"rotate-180":s.value[e.prop]}])},null,8,["class"])],8,z),s.value[e.prop]?(a(),r("div",{key:0,class:h(["p-4",{"border-b-2 border-black-300":s.value}])},[c(B,{prop:e.prop,name:e.name,type:e.type,options:e.options,values:o.filtersValues[e.prop]??[],"onUpdate:values":t[1]||(t[1]=n=>o.$emit("set-filters",n))},null,8,["prop","name","type","options","values"])],2)):w("",!0)])}),128))])])]))}});export{D as _};