import{o as i,e as c,j as v,q as M,r as m,k as K,s as z,x as oe,y as ne,z as le,A as x,B as re,C as Z,D as ae,E as ie,G as ue,I as ce,J as de,K as fe,L as pe,M as ve,d as V,h as O,a as F,m as me,t as R,i as E,w as J,v as he,N as ge,p as Q,O as be,l as Y,F as ee,c as G,P as ye}from"./index-396196b6.js";function we(r,n){return i(),c("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[v("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"})])}function ke(r,n){return i(),c("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[v("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})])}function te(r){var n;const e=x(r);return(n=e==null?void 0:e.$el)!=null?n:e}const se=re?window:void 0;function U(...r){let n,e,o,u;if(typeof r[0]=="string"||Array.isArray(r[0])?([e,o,u]=r,n=se):[n,e,o,u]=r,!n)return M;Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);const f=[],p=()=>{f.forEach(g=>g()),f.length=0},l=(g,d,b,_)=>(g.addEventListener(d,b,_),()=>g.removeEventListener(d,b,_)),h=Z(()=>[te(n),x(u)],([g,d])=>{if(p(),!g)return;const b=ae(d)?{...d}:d;f.push(...e.flatMap(_=>o.map(q=>l(g,_,q,b))))},{immediate:!0,flush:"post"}),t=()=>{h(),p()};return ie(t),t}const X=1;function _e(r,n={}){const{throttle:e=0,idle:o=200,onStop:u=M,onScroll:f=M,offset:p={left:0,right:0,top:0,bottom:0},eventListenerOptions:l={capture:!1,passive:!0},behavior:h="auto",window:t=se,onError:g=s=>{console.error(s)}}=n,d=m(0),b=m(0),_=K({get(){return d.value},set(s){I(s,void 0)}}),q=K({get(){return b.value},set(s){I(void 0,s)}});function I(s,B){var w,T,D;if(!t)return;const S=x(r);S&&((D=S instanceof Document?t.document.body:S)==null||D.scrollTo({top:(w=x(B))!=null?w:q.value,left:(T=x(s))!=null?T:_.value,behavior:x(h)}))}const C=m(!1),y=z({left:!0,right:!1,top:!0,bottom:!1}),k=z({left:!1,right:!1,top:!1,bottom:!1}),a=s=>{C.value&&(C.value=!1,k.left=!1,k.right=!1,k.top=!1,k.bottom=!1,u(s))},$=oe(a,e+o),L=s=>{var B;if(!t)return;const w=((B=s==null?void 0:s.document)==null?void 0:B.documentElement)||(s==null?void 0:s.documentElement)||te(s),{display:T,flexDirection:D}=getComputedStyle(w),S=w.scrollLeft;k.left=S<d.value,k.right=S>d.value;const j=Math.abs(S)<=(p.left||0),H=Math.abs(S)+w.clientWidth>=w.scrollWidth-(p.right||0)-X;T==="flex"&&D==="row-reverse"?(y.left=H,y.right=j):(y.left=j,y.right=H),d.value=S;let A=w.scrollTop;s===t.document&&!A&&(A=t.document.body.scrollTop),k.top=A<b.value,k.bottom=A>b.value;const N=Math.abs(A)<=(p.top||0),W=Math.abs(A)+w.clientHeight>=w.scrollHeight-(p.bottom||0)-X;T==="flex"&&D==="column-reverse"?(y.top=W,y.bottom=N):(y.top=N,y.bottom=W),b.value=A},P=s=>{var B;if(!t)return;const w=(B=s.target.documentElement)!=null?B:s.target;L(w),C.value=!0,$(s),f(s)};return U(r,"scroll",e?ne(P,e,!0,!1):P,l),le(()=>{try{const s=x(r);if(!s)return;L(s)}catch(s){g(s)}}),U(r,"scrollend",a,l),{x:_,y:q,isScrolling:C,arrivedState:y,directions:k,measure(){const s=x(r);t&&s&&L(s)}}}const Ue=({query:r})=>n=>ue(`list/${n}`,()=>{const e=ce(),o=de(),u=m(!1),f=m(""),p=m(1),l=m([]),h=m([]),t=m(0),g=m([]),d=m({});async function b(){y(),u.value=!0,p.value=1;try{const{items:a,filters:$}=await r({search:f.value,filters:d.value});l.value=a,t.value=l.value.length,h.value=l.value.slice((p.value-1)*20,p.value*20),g.value=$??[]}catch(a){console.error(a instanceof Error?a.message:"An unknown error occurred")}finally{u.value=!1}}async function _(){p.value+=1,h.value.push(...l.value.slice((p.value-1)*20,p.value*20))}function q(a){y(),f.value=a,b(),k(a)}function I({prop:a,value:$}){$.length===0?delete d.value[a]:d.value[a]=$}function C(){d.value={}}function y(){h.value=[],l.value=[],t.value=0}function k(a){o.push({query:a.length?{q:a}:{}})}return fe(()=>{const a=typeof e.query.q=="string"&&e.query.q?e.query.q:f.value;q(a)}),pe(()=>{var a,$;($=(a=ve())==null?void 0:a._s)==null||$.forEach(L=>{L.$id===`list/${n}`&&L.$dispose()})}),{items:h,itemsCount:t,search:f,loading:u,filters:g,filtersValues:d,fetch:b,loadMore:_,setSearch:q,setFilters:I,removeFilters:C}}),$e={class:"relative"},Se={class:"absolute left-0 flex items-center h-full px-2"},Ee={class:"absolute right-0 flex items-center h-full gap-2 px-3"},xe={key:0,class:"px-2 text-sm text-white rounded-md bg-black-200"},qe={class:"font-semibold"},Be={key:1,class:"w-20 h-6 px-2 rounded-md bg-black-200 animate-pulse"},Ae={key:2,class:"w-0.5 h-[calc(100%-20px)] rounded-full bg-black-200/20"},Ce=V({__name:"SearchBar",props:{query:{},total:{},scrolledDown:{type:Boolean},hasFilters:{type:Boolean},loading:{type:Boolean}},emits:["input","open-filters"],setup(r){const n=r,e=m(n.query||"");return Z(()=>n.query,o=>{e.value=o}),(o,u)=>(i(),c("div",{class:Q(["sticky top-0 left-0 right-0 px-5 pt-3 pb-2 duration-300",[o.scrolledDown?"bg-black-300 shadow-lg":"bg-transparent"]])},[v("div",$e,[v("div",Se,[O(F(ke),{class:"w-6 h-6 text-black-200"})]),v("div",Ee,[o.loading?(i(),c("div",Be)):(i(),c("p",xe,[me(" total "),v("span",qe,R(o.total),1)])),o.hasFilters?(i(),c("div",Ae)):E("",!0),o.hasFilters?(i(),c("button",{key:3,type:"button",class:"p-1 rounded-md hover:bg-black-200",onClick:u[0]||(u[0]=f=>o.$emit("open-filters"))},[O(F(we),{class:"w-6 h-6 text-black-100"})])):E("",!0)]),J(v("input",{"onUpdate:modelValue":u[1]||(u[1]=f=>e.value=f),class:"w-full h-full py-4 pl-12 text-white border-0 rounded-md outline-none bg-black-300 focus:outline-none sm:text-sm focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent",type:"text",placeholder:"Search...",onKeyup:u[2]||(u[2]=ge(f=>o.$emit("input",e.value),["enter"]))},null,544),[[he,e.value]])])],2))}}),Le={class:"flex flex-col"},Fe=["src","alt"],Te={key:0,class:"absolute flex gap-1 text-sm font-semibold text-white top-2 left-2"},De={class:"absolute flex gap-1 text-sm font-semibold text-white top-2 right-2"},Ie={key:0,class:"bg-[#ffd700] h-3 w-3 rounded-full",title:"Souvenir"},Ve={key:1,class:"bg-[#cf6a32] h-3 w-3 rounded-full",title:"StatTrak"},Me={key:2,class:"bg-[#8650ac] h-3 w-3 rounded-full",title:"Rare"},Oe={key:3,class:"bg-[#4d7455] h-3 w-3 rounded-full",title:"Rare"},Re=["title"],Pe=V({__name:"ItemCard",props:{id:{},name:{},image:{},souvenir:{type:Boolean},stattrak:{type:Boolean},rare:{type:Boolean},genuine:{type:Boolean}},emits:["show"],setup(r){const{getItemSteamPrice:n}=be();return(e,o)=>(i(),c("div",Le,[v("button",{type:"button",class:"relative block h-[12rem] p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-[#ff5e65] hover:border-[#ff5e65]",onClick:o[0]||(o[0]=u=>e.$emit("show"))},[v("img",{class:Q(["object-contain w-full pointer-events-none h-full py-4 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]",{"pb-0":e.id.includes("agent-")}]),src:e.image,alt:e.name},null,10,Fe),F(n)(e.name)?(i(),c("div",Te," € "+R(F(n)(e.name)),1)):E("",!0),v("div",De,[e.souvenir?(i(),c("div",Ie)):E("",!0),e.stattrak?(i(),c("div",Ve)):E("",!0),e.rare?(i(),c("div",Me)):E("",!0),e.genuine?(i(),c("div",Oe)):E("",!0)])]),v("div",null,[v("p",{class:"text-sm truncate px-0.5 mt-1.5 text-white",title:e.name},R(e.name),9,Re)])]))}}),je=v("div",{class:"block rounded-md animate-pulse h-5/6 bg-black-300"},null,-1),He=v("div",{class:"bg-black-300 rounded-md h-1/6 mt-1.5 animate-pulse"},null,-1),Ne=[je,He],We=V({__name:"ItemsSkeleton",props:{numberItems:{default:30}},setup(r){return(n,e)=>(i(!0),c(ee,null,Y(n.numberItems,o=>(i(),c("div",{key:`skeleton-${o}`,class:"flex flex-col min-h-[10rem]"},Ne))),128))}}),Ke={class:"relative flex-1 w-full"},ze={key:1,class:"py-10"},Xe=V({__name:"ItemsList",props:{items:{},itemsCount:{},loading:{type:Boolean},search:{},hasFilters:{type:Boolean,default:!1}},emits:["set-query","select","load-more","open-filters"],setup(r,{emit:n}){const e=n,o=m(null),{y:u}=_e(o),f=m(!1);function p(l){f.value=l,l===!0&&e("load-more")}return(l,h)=>(i(),c("div",Ke,[O(Ce,{query:l.search,"scrolled-down":F(u)>40,total:l.itemsCount,loading:l.loading,"has-filters":l.hasFilters,onInput:h[0]||(h[0]=t=>l.$emit("set-query",t)),onOpenFilters:h[1]||(h[1]=t=>l.$emit("open-filters"))},null,8,["query","scrolled-down","total","loading","has-filters"]),v("div",{ref_key:"el",ref:o,class:"grid w-full gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-dvh items-grid-small md:items-grid"},[(i(!0),c(ee,null,Y(l.items,t=>(i(),G(Pe,{id:t.id,key:t.id,name:t.name,image:t.image,souvenir:(t==null?void 0:t.souvenir)??!1,stattrak:(t==null?void 0:t.stattrak)??!1,rare:(t==null?void 0:t.rare)??!1,genuine:t.name.includes("Genuine"),onShow:g=>l.$emit("select",t.id)},null,8,["id","name","image","souvenir","stattrak","rare","genuine","onShow"]))),128)),l.loading?(i(),G(We,{key:0})):E("",!0),l.loading?E("",!0):J((i(),c("div",ze,null,512)),[[F(ye),p]])],512)]))}});export{Xe as _,Ue as c};
