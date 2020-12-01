const express = require('express');
const path = require('path');
const walk = require('walk');
const fs = require('fs');
const config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

getImages().then((files => {
    let subjects = [
      {
        "id": "web",
        "title": "Web Development",
        "text": "日常生活中，網頁隨處可見，在這次的課程，將探討網頁中常見到的技術: 透過 HTML 撰寫內容、CSS 美化介面並以 Javascript 擴充其功能。",
        "img": "wd.jpg"
      },
      {
        "id": "processing",
        "title": "Processing",
        "text": "使用 Processing 寫程式就是比其他語言更有趣，因為它著重在「繪圖」，讓你天馬行空的創意能夠藉由撰寫程式發揮出來，讓每個人都能發揮與生俱來的創造藝術能力。",
        "img": "processing.png"
      },
      {
        "id": "java",
        "title": "Java",
        "text": "Java係由C語言改寫而來，具有一段戲劇性的歷史，Java語言具有跨平台及注重物件導向的特性。在課程中我們會講述Java語言的歷史、介紹Java的基本語法和運算子，並帶大家一窺物件導向的樂趣。",
        "img": "java.png"
      },
      {
        "id":"Ai",
        "title": "Adobe Illustrator",
        "text": "Illustrator 是Adobe System 開發的強大軟體,主要功能是製作向量圖檔,也可以用來文書處理、上色等。本課程將會介紹AI的基礎功能，並使學員能製作出作品。",
        "img": "Ai.jpg"
      },
      {
        "id": "mc",
        "title": "Minecraft 腳本設計",
        "text": "Minecraft是一款由淺入深的高自由度遊戲，本課程將使用此遊戲來＜寫程式＞，語法簡單，成就感高且容易學習的腳本語法，讓您在Minecraft寫出屬於自己的專屬遊戲！其中更包含yaml簡易資料庫和許多數學方程式的應用！",
        "img": "mc.jpg"
      },
      {
        "id": "cpp",
        "title": "C/C++",
        "text": "C++是一門號稱接觸資訊領域的人必學的基礎程式語言，希望藉由C++基礎的教學，激發國中生對於程式的興趣及熱忱，我們將介紹運算子、變數等基礎功能。",
        "img": "cpp.jpg"
      }
    ];
      
    let pages = ["index", "guide", "register", "schedule", "history", "qna"];
    let pData = {
        "index": { title: '首頁', reg: config.reg() },
        "guide": { title: '簡介', reg: config.reg() },
        "register": { title: '報名', reg: config.reg() },
        "qna": { title: 'Q&A', reg: config.reg() },
        "schedule": { title: '課表', reg: config.reg() , Subject: subjects },
        "history": { title: '回顧', reg: config.reg() , ImageFiles: files }
    }
    pages.forEach(p => {
        app.render(p, pData[p], (err, html) => {
            if (err) {
                console.log(err);
            } else {
                if (p != "index") {
                    fs.mkdirSync(`2018/${p}/`, { recursive: true });
                    fs.writeFileSync(`2018/${p}/index.html`, html);
                } else {
                    fs.writeFileSync(`2018/index.html`, html);
                }
            }
        });
    })
}));

function getImages() {
    return new Promise((res, rej) => {
        var files = [];
        var walker = walk.walk('2018/images/2017', {followLinks: false});
        walker.on('file', function(root, start, next) {
            files.push('images/2017/' + start.name);
            next();
        });
        walker.on('end', function() {
            res(files);
        });
    });
}