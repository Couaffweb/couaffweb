(this.webpackJsonpserviceweb=this.webpackJsonpserviceweb||[]).push([[8],{278:function(e,t,c){"use strict";c.r(t);var a=c(32),s=c(0),n=c(37),i=c(41),r=c.n(i),o=c(36),d=c(31),l=c(35),j=c(3);t.default=function(e){var t=e.location,c=e.history,i=Object(s.useState)(!1),b=Object(a.a)(i,2),h=b[0],O=b[1],u=Object(s.useState)([]),m=Object(a.a)(u,2),x=m[0],p=m[1],f=Object(s.useState)(0),v=Object(a.a)(f,2),g=v[0],N=v[1],w=Object(s.useState)(parseInt(Object(d.t)(c.location.search,"page"))||1),y=Object(a.a)(w,2),S=y[0],k=y[1],T=Object(s.useState)(1),A=Object(a.a)(T,2),P=A[0],C=A[1];Object(s.useEffect)((function(){_()}),[S]),Object(s.useEffect)((function(){if(t.search){var e=new URLSearchParams(t.search).get("code");e&&(O(!0),(a={code:e},Object(d.e)(l.z,a)).then((function(e){var t=e.data,a=e.message;n.store.addNotification(Object(d.h)({title:"Success",message:a})),Object(d.x)(t),c.push("/earning")})).catch((function(e){var t=e.message;n.store.addNotification(Object(d.h)({title:"error",message:t,type:"danger"}))})).finally((function(){O(!1)})))}var a}),[t.search]);var _=function(){var e;O(!0),(e={page:S,limit:20},Object(d.d)(l.m,e)).then((function(e){var t=e.data,c=t.walletAmount,a=void 0===c?0:c,s=t.allTransection,n=void 0===s?[]:s,i=t.pagination,r=void 0===i?{}:i;N(a),C(r.totalPage),p(n)})).catch((function(e){var t=e.message;n.store.addNotification(Object(d.h)({title:"error",message:t,type:"danger"}))})).finally((function(){O(!1)}))},B=Object(s.useCallback)((function(e){k(e)}),[k]);return Object(j.jsxs)("div",{className:"container container-all",children:[Object(j.jsx)(o.u,{isShow:h}),Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-lg-12",children:Object(d.j)().stripe_id?Object(j.jsxs)("div",{className:"strip-account-div",children:[Object(j.jsxs)("h5",{children:[Object(j.jsx)("br",{})," You can only withdrawal amount when you have more then 10 $"]}),Object(j.jsx)("button",{disabled:g<10,onClick:function(){r()({title:"Are you sure want to withdrawal amount?",text:"",icon:"warning",buttons:!0,dangerMode:!0}).then((function(e){e?(O(!0),Object(d.e)(l.b).then((function(e){var t=e.message,c=e.data;x.unshift(c),N(0),r()("success",t,"success")})).catch((function(e){var t=e.message;n.store.addNotification(Object(d.h)({title:"error",message:t,type:"danger"}))})).finally((function(){O(!1)}))):r()("Proccess cancel")}))},className:"btn btn-primary",children:"Withdrawal Amount"})]}):Object(j.jsxs)("div",{className:"strip-account-div",children:[Object(j.jsx)("h2",{children:"Please connect your stripe account for withdrawal"}),Object(j.jsxs)("a",{href:"https://connect.stripe.com/oauth/authorize?response_type=code&client_id=".concat("ca_JU1cXiz0KEKy2y1WnKaTSt0aHCF4IUth","&scope=read_write"),children:[Object(j.jsx)(o.j,{url:"/assest/images/connectButton.png"})," "]})]})}),Object(j.jsx)("div",{className:"col-lg-12",children:Object(j.jsxs)("div",{className:"card",children:[Object(j.jsxs)("div",{className:"card-header card-header-fix",children:[Object(j.jsx)("div",{children:"My Transactions"}),Object(j.jsx)("div",{children:Object(j.jsxs)("strong",{children:["Amount Avaiable : ",Object(d.u)(g)," "]})})]}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsxs)("table",{className:"table table-striped table-responsive-sm table-responsive-md",children:[Object(j.jsx)("thead",{className:"thead-dark",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scope:"col",className:"td-center",children:"#"}),Object(j.jsx)("th",{scope:"col",className:"td-center",children:"Booking Id"}),Object(j.jsx)("th",{scope:"col",className:"td-center",children:"Amount"}),Object(j.jsx)("th",{scope:"col",className:"td-center",children:"Transaction Type"}),Object(j.jsx)("th",{scope:"col",className:"td-center",children:"Total Balance"}),Object(j.jsx)("th",{scope:"col",className:"td-center",children:"Date"})]})}),Object(j.jsx)("tbody",{children:x.map((function(e,t){var c=e.id,a=e.bookingId,s=e.created,n=e.amount,i=e.transactionType,r=e.totalBalance;return Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scope:"row",children:t+1}),Object(j.jsx)("td",{className:"td-center",children:a}),Object(j.jsx)("td",{className:"td-center",children:Object(d.u)(n)}),Object(j.jsxs)("td",{className:"td-center",children:[0===i?"Credit":"Withdrawal",Object(j.jsx)("i",{className:"ml-1 fa fa-arrow-".concat(0===i?"up":"down"),"aria-hidden":"true"})]}),Object(j.jsx)("td",{className:"td-center",children:Object(d.u)(r)}),Object(j.jsx)("td",{className:"td-center",children:Object(d.m)(s)})]},c)}))})]}),0===x.length&&Object(j.jsx)("h2",{className:"error-text d-flex justify-content-center",children:"No Record found"}),Object(j.jsx)("div",{className:"pagination-div",children:Object(j.jsx)(o.s,{className:"pagination2",currentPage:S,pageRangeDisplayed:5,totalPage:P,onChange:B})})]})]})})]})]})}}}]);
//# sourceMappingURL=provider-earning.2e380fcb.chunk.js.map