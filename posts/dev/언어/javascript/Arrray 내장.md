---
title: Arrray 내장
excerpt: 설명란
categories:
  - Categories2
tags:
  - javascript
permalink: /categories2/202409290620내장/
toc: true
toc_sticky: true
date: 2024-09-29
last_modified_at: 2024-09-29
---
# find
```ts
// find
const targetItem = list.find((item)=>{return item.id == targetId})   // return Item


// findIndex
const targetItem = list.findIndex((item)=>{return item.id == targetId})   // return index as number


// some
const targetItem = list.some((item)=>{return item.id == targetId})  // return boolean


// every
const targetItem = list.every((item)=>{return item.id == targetId})  // return boolean

// filter
const targetItem = list.filter((item)=>{return item.id == targetId})  // return Item[]


// map
const targetItem = list.map((item)=>{return {...item, value:item.value+1}})  // return Item[]


// reduce
const targetItem = list.reduce((acc,cur)=>(acc+cur), 0)  // return 최종값
```

# findIndex