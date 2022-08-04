import{_ as s,c as n,o as a,a as e}from"./app.b1b5a2fe.js";const F=JSON.parse('{"title":"useExecution","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"Create and End an Execution Scope","slug":"create-and-end-an-execution-scope"},{"level":3,"title":"Execution cleanup","slug":"execution-cleanup"}],"relativePath":"packages/core/src/useExecution/index.md"}'),l={name:"packages/core/src/useExecution/index.md"},o=e(`<h1 id="useexecution" tabindex="-1">useExecution <a class="header-anchor" href="#useexecution" aria-hidden="true">#</a></h1><p>Utility to manage the execution scope of the Lambda. This is automatically managed by the <code>use</code> function that wraps a handler.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><h3 id="create-and-end-an-execution-scope" tabindex="-1">Create and End an Execution Scope <a class="header-anchor" href="#create-and-end-an-execution-scope" aria-hidden="true">#</a></h3><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useExecution</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@serverless-use/core</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> execute</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> end </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useExecution</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">execute</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Run code here</span></span>
<span class="line"><span style="color:#82AAFF;">end</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="execution-cleanup" tabindex="-1">Execution cleanup <a class="header-anchor" href="#execution-cleanup" aria-hidden="true">#</a></h3><div class="language-ts"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useExecution</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@serverless-use/core</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> execute</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> end</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> onEnd </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useExecution</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">execute</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">onEnd</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// cleanup here will run when \`end\` is called </span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Run code here</span></span>
<span class="line"><span style="color:#82AAFF;">end</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,7),p=[o];function c(t,r,i,y,D,A){return a(),n("div",null,p)}var C=s(l,[["render",c]]);export{F as __pageData,C as default};