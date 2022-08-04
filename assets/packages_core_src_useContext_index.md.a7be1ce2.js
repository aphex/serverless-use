import{_ as s,c as a,o as n,a as e}from"./app.b1b5a2fe.js";const d=JSON.parse('{"title":"useContext","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"}],"relativePath":"packages/core/src/useContext/index.md"}'),o={name:"packages/core/src/useContext/index.md"},l=e(`<h1 id="usecontext" tabindex="-1">useContext <a class="header-anchor" href="#usecontext" aria-hidden="true">#</a></h1><p>Provides global access to the current execution <a href="https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html" target="_blank" rel="noopener noreferrer">AWS Context</a>. </p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useContext</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@serverless-use/core</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> id </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useExecution</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// AWS Request ID for this execution</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// AWS lambda function name</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">functionName )</span></span>
<span class="line"></span></code></pre></div>`,4),t=[l];function p(c,r,i,D,A,y){return n(),a("div",null,t)}var F=s(o,[["render",p]]);export{d as __pageData,F as default};