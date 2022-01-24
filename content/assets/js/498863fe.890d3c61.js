"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3512],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,u=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),f=c(n),d=o,y=f["".concat(u,".").concat(d)]||f[d]||p[d]||s;return n?r.createElement(y,i(i({ref:t},l),{},{components:n})):r.createElement(y,i({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=f;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var c=2;c<s;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2570:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return l},default:function(){return f}});var r=n(7462),o=n(3366),s=(n(7294),n(3905)),i=["components"],a={sidebar_position:1},u="Reusing Tasks",c={unversionedId:"how-tos/reusing-tasks",id:"how-tos/reusing-tasks",isDocsHomePage:!1,title:"Reusing Tasks",description:"A powerful feature of Conductor is that it supports and enables re-usability out of the box. Task workers typically",source:"@site/docs/how-tos/reusing-tasks.md",sourceDirName:"how-tos",slug:"/how-tos/reusing-tasks",permalink:"/content/docs/how-tos/reusing-tasks",editUrl:"https://github.com/orkes-io/docs/edit/main/docs/how-tos/reusing-tasks.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"howtoSideBar",previous:{title:"Monitoring Task Queues",permalink:"/content/docs/how-tos/monitoring-task-queues"},next:{title:"Dynamic vs Switch Tasks",permalink:"/content/docs/how-tos/dynamic-vs-switch-tasks"}},l=[],p={toc:l};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,s.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"reusing-tasks"},"Reusing Tasks"),(0,s.kt)("p",null,"A powerful feature of Conductor is that it supports and enables re-usability out of the box. Task workers typically\nperform a unit of work and is usually a part of a larger workflow. Such workers are often re-usable in multiple\nworkflows. Once a task is defined, you can use it across as any workflow."),(0,s.kt)("p",null,"When re-using tasks, it's important to think of situations that a multi-tenant system faces. All the work assigned to\nthis worker by default goes to the same task scheduling queue. This could result in your worker not being polled quickly\nif there is a noisy neighbour in the ecosystem. One way you can tackle this situation is by re-using the worker code,\nbut having different task names registered for different use cases. And for each task name, you can run an appropriate\nnumber of workers based on expected load."))}f.isMDXComponent=!0}}]);