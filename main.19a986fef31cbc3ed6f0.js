(()=>{"use strict";var e,t={1570:(e,t,a)=>{var n=a(3696),s=a(7470);const r=[{status:"completed",createdAt:new Date(2024,1,1,1,1,1),content:"Test task"},{status:"active",createdAt:new Date(2024,1,1,1,1,1),content:"Test task"},{status:"active",createdAt:new Date(2024,1,1,1,1,1),content:"Test task"},{status:"completed",createdAt:new Date(2024,1,1,1,1,1),content:"Test task"},{status:"completed",createdAt:new Date(2024,1,1,1,1,1),content:"Test task"}].map((e=>({...e,id:(1e3*Math.random()).toString(36)}))),c=(0,n.createContext)({tasks:r,setTasks:()=>{},active:"all",setActive:()=>{}});var o=a(9369);const l=["all","active","completed"].map((e=>({name:e,id:(1e3*Math.random()).toString(36)}))),u="TasksFilter__filters___A32Pc",i="TasksFilter__selected___G38II",_=()=>{const[e,t]=(0,n.useState)(l[0].id),{setActive:a}=(0,n.useContext)(c);function s(e,n,s){e.target instanceof HTMLElement&&(e.target.classList.add(i),t(n),function(e){a(e)}(s))}return n.createElement("ul",{className:u},l.map((t=>n.createElement("li",{key:t.id},n.createElement("button",{onClick:e=>s(e,t.id,t.name),className:(0,o.A)({[i]:t.id===e})},t.name)))))},m="Footer__footer___fuYeo",d="Footer__todo-count___NYgnr",f="Footer__clear-completed___s85HR",k=()=>{const{setTasks:e,tasks:t}=(0,n.useContext)(c),[a,s]=(0,n.useState)(t.reduce(((e,t)=>"active"===t.status?e+1:e),0));return(0,n.useEffect)((()=>{s(t.reduce(((e,t)=>"active"===t.status?e+1:e),0))}),[t]),n.createElement("footer",{className:m},n.createElement("span",{className:d},a," items left"),n.createElement(_,null),n.createElement("button",{className:f,onClick:function(){e((e=>e.filter((e=>"completed"!==e.status))))}},"Clear completed"))},p="NewTaskForm__header___bu0zn",v="NewTaskForm__title___BYYcu",E="NewTaskForm__new-todo___SrpAm",T=()=>n.createElement("header",{className:p},n.createElement("h1",{className:v},"todos"),n.createElement("input",{className:E,placeholder:"What needs to be done?",autoFocus:!0}));var N=a(3535);function h(e){let{elementRef:t,enabled:a=!0,triggerRef:s,onOutsideClick:r}=e;const c=function(e){const t=(0,n.useRef)(e);(0,n.useLayoutEffect)((()=>{t.current=e}),[]);const a=(0,n.useCallback)((function(){for(var e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];return t.current.apply(null,a)}),[t]);return a}(r);(0,n.useEffect)((()=>{if(!a)return;const e=e=>{const{target:a}=e;if(!(e.target instanceof Node))return;if(!t.current)return;const n=[t.current];s?.current&&n.push(s.current),n.some((e=>e.contains(a)))||c(e)};return document.addEventListener("touchstart",e),document.addEventListener("mousedown",e),()=>{document.addEventListener("touchstart",e),document.addEventListener("mousedown",e)}}),[t,s,a,c])}const g="Task__editing___mAlAU",A="Task__edit___xhduD",b="Task__view___ymlPN",C="Task__toggle___pCWte",y="Task__label___knMkC",w="Task__created___uJ9fy",x="Task__description___xt4kB",O="Task__completed___UILeT",S="Task__icon___ImxAI",F="Task__icon-destroy___q8855",L="Task__icon-edit___e3Zgy",R=e=>{let{status:t,id:a,children:s,createdAt:r}=e;const{tasks:l,setTasks:u}=(0,n.useContext)(c),[i,_]=(0,n.useState)(!1),[m,d]=(0,n.useState)(l.find((e=>e.id===a))?.content||""),f=(0,n.useRef)(null);return h({elementRef:f,onOutsideClick:function(){u((e=>e.map((e=>e.id===a?{...e,content:f.current?.value||""}:e)))),_(!1)},enabled:i}),n.createElement("li",{className:(0,o.A)({[g]:i},{[O]:"completed"===t})},n.createElement("div",{className:b},n.createElement("input",{className:C,type:"checkbox"}),n.createElement("label",{className:y},n.createElement("span",{className:x},s),n.createElement("span",{className:w},(0,N.m)(r,{addSuffix:!0}))),n.createElement("button",{className:(0,o.A)(S,L),onClick:()=>_((e=>!e))}),n.createElement("button",{className:(0,o.A)(S,F),onClick:function(){u((e=>e.filter((e=>e.id!==a))))}})),i&&n.createElement("input",{type:"text",className:A,value:m,onChange:e=>d(e.target.value),ref:f}))},D="TaskList__todo-list___oRKAk",I=()=>{const{tasks:e,active:t}=(0,n.useContext)(c),[a,s]=(0,n.useState)(e);return(0,n.useEffect)((()=>{s(e.filter((e=>"all"===t||t===e.status)))}),[t,e]),n.createElement("ul",{className:D},a.map((e=>n.createElement(R,{key:e.id,createdAt:e.createdAt,status:e.status,id:e.id},e.content))))},P=()=>{const[e,t]=(0,n.useState)(r),[a,s]=(0,n.useState)("all");return n.createElement(c.Provider,{value:{setTasks:t,tasks:e,active:a,setActive:s}},n.createElement("section",{className:"todoapp"},n.createElement(T,null),n.createElement("section",{className:"main"},n.createElement(I,null),n.createElement(k,null))))};(0,s.H)(document.getElementById("root")).render(n.createElement(P,null))}},a={};function n(e){var s=a[e];if(void 0!==s)return s.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,a,s,r)=>{if(!a){var c=1/0;for(i=0;i<e.length;i++){a=e[i][0],s=e[i][1],r=e[i][2];for(var o=!0,l=0;l<a.length;l++)(!1&r||c>=r)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(o=!1,r<c&&(c=r));if(o){e.splice(i--,1);var u=s();void 0!==u&&(t=u)}}return t}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[a,s,r]},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var s,r,c=a[0],o=a[1],l=a[2],u=0;if(c.some((t=>0!==e[t]))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(l)var i=l(n)}for(t&&t(a);u<c.length;u++)r=c[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(i)},a=self.webpackChunk=self.webpackChunk||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})(),n.O(void 0,[407],(()=>n(1001)));var s=n.O(void 0,[407],(()=>n(1570)));s=n.O(s)})();