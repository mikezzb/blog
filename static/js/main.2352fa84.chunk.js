(this.webpackJsonpblog=this.webpackJsonpblog||[]).push([[0],{317:function(e,t,n){},338:function(e,t,n){},522:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(31),r=n.n(a),s=(n(317),n(312)),i=n(11),o=n(9),l=n.n(o),u=n(3),d=(n(338),n(26)),j=n(7),b=n(8),m=n(57),g=n(17),p=n.n(g),h=n(61),O=n(32),f=n(30),x=n.n(f),v=n(41),y=n(289),N=n.n(y),w=n(290),k=n.n(w),L=n(291),S=n.n(L),A=n(292),C=n.n(A),I=n(293),R=n.n(I),U=n(294),_=n.n(U),T=n(295),E=n.n(T),P=n(296),W=n.n(P),D=n(297),B=n.n(D),z=n(298),G=n.n(z),M=n(299),V=n.n(M),H=n(58),F=n.n(H),J=(n(489),n(13)),q=n.n(J),X=(n(490),"BLOG_LOADING"),Y="LOAD_BLOG_SUCCESS",K="ALL_LOADED",Q="ADD_POST",Z="DELETE_POST",$="UPDATE_POST";function ee(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return{type:X,isLoading:e}}function te(e){return{type:Y,posts:e}}var ne=n(2);var ce,ae,re,se=Object(i.b)((function(e){return{user:e.user.user}}),(function(e){return{addPost:function(t){e(function(e){return{type:Q,post:e}}(t))},updatePost:function(t){e(function(e){return{type:$,post:e}}(t))}}}))((function(e){var t=Object(j.f)(),n=Object(c.useRef)({}),a=new k.a({html:!0,linkify:!0,typographer:!0,highlight:function(e,t){if(t&&F.a.getLanguage(t))try{return F.a.highlight(t,e).value}catch(n){}return""}}).use(S.a).use(C.a).use(R.a).use(_.a).use(E.a).use(W.a).use(B.a).use(G.a).use(V.a),r=Object(c.useState)(!1),s=Object(b.a)(r,2),i=s[0],o=s[1],d=Object(c.useReducer)((function(e,t){return Object(u.a)(Object(u.a)({},e),t)}),{title:"",tags:"",category:null,backgroundURL:""}),m=Object(b.a)(d,2),g=m[0],p=m[1],h=function(){var t=Object(v.a)(x.a.mark((function t(){var n,c,a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=q.a.get("blogSaved"),c=n?JSON.parse(n):null,(e.selectedArticle||c)&&(a=e.selectedArticle||c,p({title:a.title,tags:a.tags,category:a.category,backgroundURL:a.backgroundURL}),o(Boolean(e.selectedArticle)));case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(c.useEffect)((function(){h()}),[e.selectedArticle]);var f=function(c){c.preventDefault();var a=g;a.content=n.current.getMdValue(),a.username=e.user.username,a.userIcon=e.user.iconURL,a.category=a.category||0;var r=i?"blogs/".concat(e.selectedArticle._id):"blogs/add";i?l.a.put(r,a).then((function(t){q.a.remove("blogSaved"),e.updatePost(Object(u.a)(Object(u.a)({},a),{},{_id:e.selectedArticle._id}))})).catch((function(e){alert(e)})):l.a.post(r,a).then((function(t){q.a.remove("blogSaved"),e.addPost(t.data)})).catch((function(e){alert(e)})),t.push("/")},y=window.matchMedia&&window.matchMedia("(max-width: 1260px)").matches;return Object(ne.jsxs)("div",{style:{minHeight:"100vh"},children:[Object(ne.jsx)("header",{className:"header",style:{height:"60px"},children:Object(ne.jsxs)("div",{className:"headerWrapper",style:{marginTop:"3px"},children:[Object(ne.jsx)(O.a,{onClick:function(){return t.goBack()},style:{position:"relative",fontSize:"30px",marginTop:"8px"}}),Object(ne.jsxs)("nav",{className:"navSession",style:{float:"right",marginRight:"0"},children:[Object(ne.jsx)("div",{className:"navItemContainer",onClick:function(){p({}),n.current.setText("")},children:Object(ne.jsx)("span",{className:"navItem",children:"Reset"})}),Object(ne.jsx)("div",{className:"navItemContainer",onClick:function(){var t=g;t.username=e.user.username,t.content=n.current.getMdValue(),t.category=t.category||0,q.a.set("blogSaved",t,{expires:3}),alert("Saved as Draft!")},children:Object(ne.jsx)("span",{className:"navItem",children:"Save"})}),Object(ne.jsx)("div",{className:"navItemContainer",onClick:f,children:Object(ne.jsx)("span",{className:"navItem",children:"Submit Post"})})]})]})}),Object(ne.jsxs)("section",{style:{alignContent:"center",paddingTop:"60px"},children:[Object(ne.jsxs)("form",{onSubmit:function(){return f()},style:{},children:[Object(ne.jsx)("div",{className:"inputFormWrapper",children:Object(ne.jsx)("input",{type:"text",required:!0,className:"form-control",placeholder:"Title",value:g.title,onChange:function(e){return p({title:e.target.value})}})}),Object(ne.jsx)("div",{className:"inputFormWrapper",children:Object(ne.jsx)("input",{type:"text",className:"form-control",placeholder:"Tags (Optional)",value:g.tags,onChange:function(e){return p({tags:e.target.value})}})}),Object(ne.jsx)("div",{className:"inputFormWrapper",children:Object(ne.jsx)("input",{type:"text",className:"form-control",placeholder:"Cover image URL (Optional)",value:g.backgroundURL,onChange:function(e){return p({backgroundURL:e.target.value})}})}),Object(ne.jsx)("div",{className:"inputFormWrapper",children:Object(ne.jsx)("input",{type:"number",className:"form-control",placeholder:"Set category (0-4) (Optional)",value:g.category,onChange:function(e){return p({category:e.target.value})}})})]}),Object(ne.jsx)(N.a,{ref:n,defaultValue:e.selectedArticle&&e.selectedArticle.content||JSON.parse(q.a.get("blogSaved")||"null")&&JSON.parse(q.a.get("blogSaved")||"null").content||"Content",renderHTML:function(e){return new Promise((function(t){setTimeout((function(){t(a.render(e))}),1e3)}))},config:{view:{menu:!0,md:!0,html:!y},imageUrl:"https://octodex.github.com/images/minion.png"}})]})]})})),ie=n(42),oe=n(43),le=oe.a.div(ae||(ae=Object(ie.a)(["\n  position: relative;\n  margin: 40vh auto;\n  width: 64px;\n  height: 64px;\n"]))),ue=oe.a.div(re||(re=Object(ie.a)(["\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: ",";\n  height: ",";\n  margin: 6px;\n  border: 6px solid ",";\n  border-radius: 50%;\n  animation: "," 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: "," transparent transparent transparent;\n  :nth-child(1) {\n    animation-delay: -0.45s;\n  }\n  :nth-child(2) {\n    animation-delay: -0.3s;\n  }\n  :nth-child(3) {\n    animation-delay: -0.15s;\n  }\n"])),(function(e){return"".concat(e.size).concat(e.sizeUnit)}),(function(e){return"".concat(e.size).concat(e.sizeUnit)}),(function(e){return e.color}),(function(e){return Object(oe.b)(ce||(ce=Object(ie.a)(["\n  0% {\n      transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"])))}),(function(e){return e.color})),de=function(e){var t=e.color,n=e.size,c=e.sizeUnit;return Object(ne.jsx)(le,{children:Object(ne.jsx)(ue,{color:t,size:n,sizeUnit:c})})};de.defaultProps={size:50,color:"#009cd8",sizeUnit:"px"};var je=de,be=n(40),me=n(303),ge=n(304),pe="DISPLAY_LOGIN",he="LOG_OUT";function Oe(e){return{type:pe,user:e}}var fe=Object.freeze({WRONG_PASSWORD:0,USER_DNE:1}),xe=Object(i.b)(null,(function(e){return{displayLogin:function(t){e(Oe(t))}}}))((function(e){var t=e.displayLogin,n=e.handler,a=Object(c.useState)(!1),r=Object(b.a)(a,2),s=r[0],i=r[1],o=Object(c.useReducer)((function(e,t){return Object(u.a)(Object(u.a)({},e),t)}),{email:"",password:"",username:"",iconURL:""}),d=Object(b.a)(o,2),j=d[0],m=d[1],g=s?"Not having an account? ":"Got an account? ",p=s?"Log in":"Sign up",h=[Object(ne.jsx)("div",{className:"form-group",children:Object(ne.jsx)("input",{type:"text",required:!0,className:"form-control",placeholder:"Username",value:j.username,onChange:function(e){return m({username:e.target.value})},style:{flexGrow:"1"}})},"usernameInputField")],O=[Object(ne.jsx)("div",{className:"form-group",children:Object(ne.jsx)("input",{type:"string",className:"form-control",placeholder:"User Icon URL (optional)",value:j.iconURL,onChange:function(e){return m({iconURL:e.target.value})},style:{flexGrow:"1"}})})];return Object(ne.jsx)("div",{className:"loginWrapper",children:Object(ne.jsxs)("div",{className:"loginCard",children:[Object(ne.jsxs)("div",{className:"divider",children:[Object(ne.jsx)("div",{className:"tagLogin",children:p}),Object(ne.jsx)("div",{className:"crossIcon",onClick:function(){return n()},style:{cursor:"pointer"},children:"X"})]}),Object(ne.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c,a,r="users/".concat(s?"login":"add");c=s?{email:j.email,password:j.password}:{email:j.email,password:j.password,username:j.username,iconURL:j.iconURL||"https://pbs.twimg.com/media/CdnxG1vXEAACpY7?format=jpg&name=240x240"},l.a.post(r,c).then((function(e){a=e.data,s?a===fe.WRONG_PASSWORD||a===fe.USER_DNE?alert(a===fe.WRONG_PASSWORD?"Wrong Password":"Email account does not exist"):(a=JSON.parse(a),q.a.set("loggedInUser",a,{expires:1}),t(a),alert("Logged in as ".concat(a.username))):(q.a.set("loggedInUser",c,{expires:1}),t(c),alert("Sign up successfully as ".concat(c.username)))})).catch((function(e){alert(e)})),m({email:"",password:"",username:""}),n()},style:{},children:[s?null:h," ",Object(ne.jsx)("div",{className:"form-group",children:Object(ne.jsx)("input",{type:"email",required:!0,className:"form-control",placeholder:"Email",value:j.email,onChange:function(e){return m({email:e.target.value})},style:{flexGrow:"1"}})}),Object(ne.jsx)("div",{className:"form-group",children:Object(ne.jsx)("input",{type:"password",required:!0,className:"form-control",placeholder:"Password",value:j.password,onChange:function(e){return m({password:e.target.value})},style:{flexGrow:"1"}})}),s?null:O," ",Object(ne.jsx)("div",{className:"form-group-submit",children:Object(ne.jsx)("input",{type:"submit",value:p,className:"submitButton"})}),Object(ne.jsxs)("div",{className:"switchLogin",children:[Object(ne.jsx)("p",{children:"".concat(g," ")}),Object(ne.jsx)("div",{className:"clickMe",onClick:function(){return i(!s)},children:"Click me >.<"})]})]})]})})}));function ve(e){var t=e.isArticle,n=e.tag,c=e.children,a=e.icon;return Object(ne.jsxs)("div",{className:"author ".concat(t?" article":""),children:[Object(ne.jsx)("img",{className:"icon",src:a,alt:"icon"}),Object(ne.jsx)("p",{className:"authorName",children:c}),n&&n.split(",").map((function(e){return Object(ne.jsx)("div",{className:"tagName",children:e},e)}))]})}function ye(e){var t=e.icon,n=e.isArticle,c=e.tag,a=e.date,r=e.username,s=e.children;return Object(ne.jsxs)("div",{className:"titleWrapper",children:[Object(ne.jsx)(ve,{icon:t,isArticle:n,tag:c,date:a,children:r}),Object(ne.jsx)("div",{className:"title",children:s})]})}var Ne=["linear-gradient(112.52858610298631deg, rgba(37, 46, 58,1) 4.927083333333334%,rgba(71, 84, 99,1) 97.84374999999999%)","linear-gradient(-244.39781244855823deg, rgba(42, 39, 107,1) -1.7083333333333144%,rgba(186, 213, 241,1) 95.79166666666667%)","linear-gradient(114.44637446788136deg, rgba(167, 204, 225,1) 4.927083333333334%,rgba(236, 246, 237,1) 97.84374999999999%)","linear-gradient(-244.5986685971718deg, rgba(246, 190, 212,1) 18.22265625%,rgba(249, 231, 148,1) 94.07552083333333%)"],we=function(e){return Ne[e]},ke=["All","Playground","Learning","ACG","Time Machine"];var Le=Object(i.b)((function(e){return{user:e.user}}),(function(e){return{displayLogin:function(t){e(Oe(t))}}}))((function(e,t){t.isArticleView;var n=Object(c.useState)(!1),a=Object(b.a)(n,2),r=a[0],s=a[1],i=Object(c.useState)(!1),o=Object(b.a)(i,2),l=o[0],d=o[1],j=Object(c.useState)(0),m=Object(b.a)(j,2),g=m[0],p=m[1],h=Object(c.useReducer)((function(e,t){return Object.keys(e).reduce((function(e,n){return Object(u.a)(Object(u.a)({},e),{},Object(be.a)({},n,t===n))}),{})}),{all:!0}),O=Object(b.a)(h,2),f=O[0],x=O[1],v=function(t){e.isArticleView?(e.updateCategory(t-1),e.goBack()):e.updateCategory(t-1),d(!1)},y=function(){var e=document.body.scrollTop||document.documentElement.scrollTop;p(e)},N=function(){return ke.map((function(e,t){return Object(ne.jsx)("div",{className:f[e]?"navItemContainerClicked":"navItemContainer",onClick:function(){return[x(e),v(t)]},children:Object(ne.jsx)("span",{className:"navItem",children:e})},e)}))};return Object(c.useEffect)((function(){e.isArticleView&&window.addEventListener("scroll",y);var t=q.a.get("loggedInUser");if(null!=t){var n=JSON.parse(t);e.displayLogin(n)}return function(){return window.removeEventListener("scroll",y)}}),[]),e.isArticleView?Object(ne.jsxs)("header",{className:"header",style:{position:"relative"},children:[Object(ne.jsx)("div",{className:"backgroundArticle",style:""===e.selectedArticle.backgroundURL?{background:we(e.selectedArticle.category)}:{backgroundImage:"linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(".concat(e.selectedArticle.backgroundURL,")")}}),Object(ne.jsx)("div",{className:"articleNavBackground".concat(g>400?" short":"")}),Object(ne.jsx)("div",{className:"headerWrapper",children:Object(ne.jsx)(ye,{icon:e.selectedArticle.userIcon,username:e.selectedArticle.username,isArticle:e.isArticleView,tag:e.selectedArticle.tags,date:e.selectedArticle.createdAt,children:e.selectedArticle.title})})]}):Object(ne.jsxs)("div",{children:[Object(ne.jsx)("header",{className:"header home",children:Object(ne.jsxs)("div",{className:"headerWrapper",style:{},children:[Object(ne.jsx)("div",{className:"logoWrapper",onClick:function(){e.user.loggedIn?e.userIconOnclick():(window.scrollTo(0,0),s(!0))},children:e.user.loggedIn?Object(ne.jsx)("img",{src:e.user.user.iconURL,alt:e.user.user.username,className:"headerIcon",style:{cursor:"pointer"}}):Object(ne.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/d/dc/Knockoff_Little_Totoro.svg",alt:"",className:"siteLogo",style:{cursor:"pointer"}})}),me.isMobile?Object(ne.jsx)(ge.slide,{right:!0,noOverlay:!0,isOpen:l,onStateChange:function(e){return d(e.isOpen)},onClick:function(){return d(!1)},children:N()},"menu"):Object(ne.jsx)("nav",{className:"navSession",children:N()})]})}),r?Object(ne.jsx)(xe,{handler:function(){return s(!1)}}):null]})})),Se=n(527),Ae=n(525),Ce=n(526),Ie=function(e){var t=e.language,n=e.value,c=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?Ae.a:Ce.a;return Object(ne.jsx)(Se.a,{language:t,style:c,children:n})},Re=function(e){return e>9?"".concat(e):"0".concat(e)};m.propTypes={value:p.a.string.isRequired};var Ue=function(e){return Object(ne.jsx)("img",Object(u.a)(Object(u.a)({},e),{},{style:{maxWidth:"100%"}}))};var _e=Object(i.b)((function(e,t){return{blog:e.blog,user:e.user.user||{}}}),(function(e){return{deletePost:function(t){e(function(e){return{type:Z,id:e}}(t))}}}))((function(e){var t=Object(j.f)(),n=Object(j.g)().id,a=Object(c.useState)([]),r=Object(b.a)(a,2),s=r[0],i=r[1],o=Object(c.useState)(""),u=Object(b.a)(o,2),g=u[0],p=u[1],f=Object(c.useState)(!1),x=Object(b.a)(f,2),v=x[0],y=x[1],N=function(){l.a.post("comments/",{article_id:n}).then((function(e){return i(e.data)})).catch((function(e){alert(e)}))};Object(c.useEffect)((function(){N(),window.scrollTo(0,0)}),[]);var w=e.blog.posts.find((function(e){return e._id===n}));return v?Object(ne.jsx)(se,{goBack:function(){return y(!1)},selectedArticle:w}):e.blog.loading?Object(ne.jsx)(je,{}):Object(ne.jsxs)("div",{className:"article",children:[Object(ne.jsx)(Le,{updateCategory:e.updateCategory,goBack:e.goBack,isArticleView:!0,selectedArticle:w,articleIndex:e.blog.posts.findIndex((function(e){return e._id===n}))}),Object(ne.jsx)("div",{children:Object(ne.jsxs)("div",{className:"contentWrapper",children:[Object(ne.jsxs)("div",{className:"articleNavInner",style:{width:"90%",color:"white"},children:[Object(ne.jsx)(d.b,{to:"/",children:Object(ne.jsx)(O.a,{style:{cursor:"pointer",zIndex:100,position:"relative",fontSize:"30px",marginTop:"12px"}})}),w.username===e.user.username&&Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)(O.b,{onClick:function(){return y(!v)},style:{paddingLeft:"20px",float:"right",cursor:"pointer",color:"white",zIndex:100,fontSize:"25px",marginTop:"15px"}}),Object(ne.jsx)(h.a,{onClick:function(){l.a.post("blogs/delete",{article_id:n}).then((function(n){n.data?(t.push("/"),e.deletePost(n.data)):alert(n.data)})).catch((function(e){alert(e)}));l.a.post("comments/deleteAll",{article_id:n}).then((function(){})).catch((function(e){console.warn(e)}))},style:{float:"right",cursor:"pointer",color:"white",zIndex:100,fontSize:"30px",marginTop:"12px"}})]})]}),Object(ne.jsx)("div",{className:"blogWrapper",children:Object(ne.jsx)("div",{className:"blog",children:Object(ne.jsx)(m,{escapeHtml:!1,renderers:{code:Ie,image:Ue},source:w.content,style:{whiteSpace:"initial"}})})}),Object(ne.jsx)("div",{className:"replyBackground",children:Object(ne.jsxs)("div",{className:"replyWrapper",children:[Object(ne.jsx)("div",{className:"replyTag",children:"Replies:"}),s.map((function(t){return Object(ne.jsx)("div",{style:{cursor:"auto",marginTop:"30px"},className:"blockWrapper reply",children:Object(ne.jsxs)("div",{className:"blockInnerWrapper",style:{padding:"5px 8px"},children:[Object(ne.jsxs)("div",{className:"author",children:[Object(ne.jsx)("img",{className:"icon",src:t.userIcon,alt:"icon"}),Object(ne.jsx)("p",{className:"authorName",children:t.username}),Object(ne.jsx)("div",{className:"tagName",children:(n=new Date(t.createdAt),"".concat(n.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")," ").concat(Re(n.getHours()),":").concat(Re(n.getMinutes())))}),t.username===e.user.username&&Object(ne.jsx)("div",{onClick:function(){return e=t._id,void l.a.post("comments/delete",{comment_id:e}).then((function(e){!0===e.data?N():alert(e.data)})).catch((function(e){alert("Please Login Before Comment \n".concat(e))}));var e},style:{cursor:"pointer",float:"right",width:"16px",height:"16px",marginLeft:"auto",marginTop:"10px"},children:Object(ne.jsx)(h.a,{})})]}),Object(ne.jsx)("div",{className:"blockContent",style:{margin:"10px 7px",maxHeight:"none",textOverflow:"clip",whiteSpace:"normal",overflow:"visible"},children:t.content})]})});var n})),Object(ne.jsxs)("form",{onSubmit:function(t){t.preventDefault();var c={content:g,username:e.user.username,userIcon:e.user.iconURL,article_id:n};l.a.post("comments/add",c).then((function(){p(""),N()})).catch((function(e){alert(e)}))},children:[Object(ne.jsx)("div",{className:"form-group",style:{width:"100%"},children:Object(ne.jsx)("textarea",{required:!0,className:"form-control",placeholder:e.user.username?"\u5049\u8ad6":"Please login before posting comment",value:g,onChange:function(e){return p(e.target.value)},disabled:!e.user.username,style:{flexGrow:"1",minHeight:"60px"}})}),Object(ne.jsx)("div",{className:"form-group-submit",style:{width:"100%"},children:Object(ne.jsx)("input",{type:"submit",value:"Submit",className:"submitButton"})})]})]})})]})})]})})),Te=function(e){return e.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")};function Ee(e){var t=e.tag,n=e.date,c=e.icon,a=e.username,r=e.content,s=e.background,i=e.title,o=e.category,l="0"!==s&&""!==s;return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)("div",{className:"blockCover".concat(l?"":" noImage"),style:l?{backgroundPosition:"center",backgroundImage:"linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url(".concat(s,")")}:{background:we(o)}},"".concat(n,"-").concat(i)),Object(ne.jsxs)("span",{children:[Object(ne.jsx)(ve,{tag:t,icon:c,children:a}),Object(ne.jsx)("div",{className:"blockTitle",children:i}),Object(ne.jsx)("div",{className:"blockContent",children:r.split(/\n/).map((function(e,t){return t<4&&""!==e&&"".concat(e.replace(/#|\*|!\[\]|>|^\s*\n/gm,"").replace(/^\s/m,""),"\n")}))}),Object(ne.jsx)("span",{children:Te(new Date(n))})]})]})}var Pe=Object(i.b)((function(e,t){return{blog:e.blog,user:e.user}}),(function(e){return{blogLoading:function(){e(ee())},loadBlogSuccess:function(t){e(te(t))},allLoaded:function(){e(function(){return{type:K,loaded:!(arguments.length>0&&void 0!==arguments[0])||arguments[0]}}())}}}))((function(e){var t=Object(c.useState)(!1),n=Object(b.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(!1),i=Object(b.a)(s,2),o=i[0],u=i[1],j=Object(c.useState)(-1),m=Object(b.a)(j,2),g=m[0],p=m[1],h=function t(){if(document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight<=100&&(window.removeEventListener("scroll",t),!e.blog.loaded)){var n={dateBefore:e.blog.posts[e.blog.posts.length-1].createdAt};l.a.post("blogs/",n).then((function(n){n.data&&n.data.length?(e.loadBlogSuccess(n.data),window.addEventListener("scroll",t)):(r(!0),e.allLoaded())})).catch((function(e){alert(e)}))}};return Object(c.useEffect)((function(){return e.blog.loaded?r(!0):!1===e.blog.loading&&window.addEventListener("scroll",h),function(){return window.removeEventListener("scroll",h)}}),[e.blog,h]),Object(ne.jsxs)("div",{children:[o&&Object(ne.jsx)("div",{className:"userMenuContainer",children:Object(ne.jsxs)("div",{mode:"inline",className:"menuWrapper",children:[Object(ne.jsx)(d.b,{to:"/edit",className:"menuItem",onClick:function(){u(!1)},children:"Add Post"},"Add Post"),Object(ne.jsx)("div",{className:"menuItem",onClick:function(){return[p(-2===g?-1:-2),u(!1)]},children:"View My Posts"},"View My Posts"),Object(ne.jsx)("div",{className:"menuItem",onClick:function(){e.logout(),p(-1),q.a.remove("loggedInUser"),u(!1),alert("Logged out successfully!")},children:"Log Out"},"Log Out")]})}),Object(ne.jsx)(Le,{cookies:e.cookies,updateCategory:p,isArticleView:!1,userIconOnclick:function(){return u(!o)}}),Object(ne.jsx)("div",{className:"blockView",children:e.blog.loading?Object(ne.jsx)(je,{}):e.blog.posts.filter((function(t){return g===t.category||-1===g||-2===g&&e.user.user.username===t.username})).map((function(t){return Object(ne.jsx)(d.b,{className:"blockWrapper",to:{pathname:"/article/".concat(t._id),index:e.blog.posts.findIndex((function(e){return e.createdAt===t.createdAt}))},children:Object(ne.jsx)(Ee,{category:t.category,tag:t.tags,date:t.createdAt,icon:t.userIcon,username:t.username,content:t.content,background:t.backgroundURL,articleIndex:e.blog.posts.findIndex((function(e){return e.createdAt===t.createdAt})),title:t.title},t.createdAt)},t._id)}))}),a&&Object(ne.jsx)("div",{className:"end",children:"-END-"}),!a&&!e.blog.loading&&Object(ne.jsx)("div",{className:"end",onClick:function(){var t={dateBefore:e.blog.posts[e.blog.posts.length-1].createdAt};l.a.post("blogs/",t).then((function(t){t.data&&t.data.length?(e.loadBlogSuccess(t.data),window.addEventListener("scroll",h)):(r(!0),e.allLoaded())})).catch((function(e){alert(e)}))},style:{cursor:"pointer"},children:"Load More"})]})})),We=Object(i.b)(null,(function(e){return{logout:function(){e({type:he})}}}))((function(e){return Object(ne.jsx)("div",{className:"app",children:Object(ne.jsx)(d.a,{children:Object(ne.jsxs)(j.c,{children:[Object(ne.jsx)(j.a,{exact:!0,path:"/",children:Object(ne.jsx)(Pe,Object(u.a)({},e))}),Object(ne.jsx)(j.a,{exact:!0,path:"/article/:id",children:Object(ne.jsx)(_e,Object(u.a)({},e))}),Object(ne.jsx)(j.a,{exact:!0,path:"/edit",children:Object(ne.jsx)(se,Object(u.a)({},e))})]})})})})),De=n(25),Be=n(309),ze=n.n(Be),Ge=n(310),Me=n(311),Ve={blog:{loading:!1,posts:[],loaded:!1},user:{loggedIn:!1,user:[]}};var He=Object(De.combineReducers)({blog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve.blog,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case X:return Object(u.a)(Object(u.a)({},e),{},{loading:t.isLoading});case Y:return Object(u.a)(Object(u.a)({},e),{},{posts:e.posts.concat(t.posts),loading:!1});case K:return Object(u.a)(Object(u.a)({},e),{},{loaded:!0});case Q:return Object(u.a)(Object(u.a)({},e),{},{posts:[t.post].concat(e.posts)});case $:return Object(u.a)(Object(u.a)({},e),{},{posts:e.posts.map((function(e){return e._id===t.post._id?Object(u.a)(Object(u.a)({},e),t.post):e}))});case Z:return Object(u.a)(Object(u.a)({},e),{},{posts:e.posts.filter((function(e){return e._id!==t.id}))});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve.user,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case pe:return Object(u.a)(Object(u.a)({},e),{},{user:t.user,loggedIn:!0});case he:return{state:e};default:return e}}});l.a.defaults.baseURL="https://nhfxrk08p1.execute-api.ap-northeast-1.amazonaws.com/dev/";var Fe,Je=Object(De.createStore)(He,Object(Me.composeWithDevTools)(Object(De.applyMiddleware)(Ge.a,ze()())));Je.dispatch((Fe={dateBefore:"2030-05-17T12:18:08.801+00:00"},function(){var e=Object(v.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(ee()),e.prev=1,e.next=4,l.a.post("blogs/",Fe);case 4:n=e.sent,t(te(n.data)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),t(ee(!1));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())),r.a.render(Object(ne.jsx)(i.a,{store:Je,children:Object(ne.jsx)(We,{})}),document.getElementById("root")),Object(s.a)()}},[[522,1,2]]]);
//# sourceMappingURL=main.2352fa84.chunk.js.map