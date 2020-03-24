!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("SpringSDK",[],t):"object"==typeof exports?exports.SpringSDK=t():e.SpringSDK=t()}(window,function(){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=require("request-promise-native")},function(e,t,r){e.exports=r(2)},function(e,t,r){"use strict";r.r(t);var s=r(0);class n{constructor(e){this.Get=((e,t)=>{return new Promise((r,n)=>{this.getHeader(t).then(t=>{s.get(e,{headers:t}).promise().then(e=>{r(JSON.parse(e))},n)},n)})}),this.Delete=((e,t)=>{return new Promise((r,n)=>{this.getHeader(t).then(t=>{s.delete(e,{headers:t}).promise().then(e=>{r(JSON.parse(e))},n)},n)})}),this.Patch=((e,t,r)=>{return new Promise((n,o)=>{this.getHeader(r).then(r=>{s.patch(e,{headers:r,body:t}).promise().then(e=>{n(JSON.parse(e))},o)},o)})}),this.MakeCall=((e,t,r,n)=>{return new Promise((t,o)=>{this.getHeader(r).then(r=>{s.get(e,{headers:r,method:n}).promise().then(e=>{t(JSON.parse(e))},o)},o)})}),this.getHeader=(e=>{return null==e&&(e=[]),null==e.accept&&(e.accept="application/json"),null==e["Content-Type"]&&(e["Content-Type"]="application/json"),new Promise((t,r)=>{null==e.Authorization?this.Authenticator.AccessToken().then(r=>{e.Authorization=`bearer ${r}`,t(e)},r):t(e)})}),this.Authenticator=e}Put(e,t,r){return new Promise((n,o)=>{this.getHeader(r).then(r=>{s.put(e,{headers:r,body:t}).promise().then(e=>{n(JSON.parse(e))},o)},o)})}Post(e,t,r){return new Promise((n,o)=>{this.getHeader(r).then(r=>{s.post(e,{headers:r,body:t}).promise().then(e=>{n(JSON.parse(e))},o)},o)})}}class o{}o.GetRequestor=(e=>"undefined"==typeof window?new n(e):(SpringCM.API,null));class i{}i.uuid={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},i.isUUID=(e=>{var t=i.uuid.all;return t&&t.test(e)}),r.d(t,"SpringCMService",function(){return u});class u{constructor(e,t){this.ApplicationVersion="v201411",this.Requestor=o.GetRequestor(e),this.Datacenter=t,this.GetObjectAPIUrl=`https://api${this.Datacenter}.springcm.com/${this.ApplicationVersion}`,this.GetDownloadAPIUrl=`https://apiupload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`,this.GetDownloadAPIUrl=`https://apidownload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`}GetCurrentAccount(){return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current`)}UpdateAccount(e){return this.Requestor.Patch(e.Href,e)}GetCurrentAccountAttributeGroups(){return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current/attributegroups`)}GetAllDocLauncherConfigs(){return this.Requestor.Get(`${this.GetObjectAPIUrl}/doclauncherconfigurations`)}GetAllPermissionSets(){return this.Requestor.Get(`${this.GetObjectAPIUrl}/permissionsets`)}GetDocLauncherTask(e){let t=e;return i.isUUID(e)&&(t=`${this.GetObjectAPIUrl}/doclauncherTask/${e}`),this.Requestor.Get(t)}CreateDocLauncherTask(e){return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocLauncherTask`,e)}GetAllContacts(){return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts`)}GetContactById(e){return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts/{Id}`)}CreateContact(e){return this.Requestor.Post(`${this.GetObjectAPIUrl}/contacts/`,e)}UpdateContact(e){return this.Requestor.Put(e.Href,e)}DeleteContact(e){return this.Requestor.Delete(e.Href)}GetWorkflow(e){let t=e;return i.isUUID(e)&&(t=`${this.GetObjectAPIUrl}/workflows/${e}`),this.Requestor.Get(t)}StartWorkflow(e){return this.Requestor.Post(`${this.GetObjectAPIUrl}/workflows/`,e)}SignalWorkflow(e,t){return this.Requestor.Post(`${e.Href}/signal`,`{"data":"${t}" }`)}DeleteWorkflow(e){return this.Requestor.Delete(e.Href)}GetWorkflowQueue(e){let t=e;i.isUUID(e)&&(t=`${this.GetObjectAPIUrl}/workflowqueues/${e}`)}GetWorkflowQueueWorkItems(e){let t=e;i.isUUID(e)&&(t=`${this.GetObjectAPIUrl}/workflowqueues/${e}/workitems`)}GetWorkItem(e,t=!1,r=!1,s=!1,n=!1,o=!1){let u=e;i.isUUID(e)&&(u=`${this.GetObjectAPIUrl}/workitems/${e}`);let c=[];if(t&&c.push("Assignee"),r&&c.push("Documents"),s&&c.push("AssigneeInstructions"),n&&c.push("Workflow"),o&&c.push("Selections"),0==c.length)return this.Requestor.Get(u);let a=`expand=${c.join(",")}`;return this.Requestor.Get(`${u}?expand=${a}`)}}}])});
//# sourceMappingURL=SpringSDKNode.bundle.js.map