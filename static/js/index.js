let markTexts = document.querySelectorAll('.markText');
let eyes = document.querySelectorAll('.eye');
let htmlTexts = document.querySelectorAll('.htmlText');
let contents = document.querySelectorAll('.content');
let backs = document.querySelectorAll('.back');
let note_center = document.getElementById("note_center");
let notes = document.querySelectorAll(".note");
let titleNums = document.querySelectorAll(".titleNum");
let move_ups = document.querySelectorAll('.move-up');
let move_downs = document.querySelectorAll('.move-down');
let file_ups = document.querySelectorAll('.file-up');
let file_downs = document.querySelectorAll('.file-down');
let deletes = document.querySelectorAll(".delete");
let info_right = document.getElementById("info_right");

let titleNames = document.querySelectorAll(".titleName");
let authors = document.querySelectorAll(".author");
let create_times = document.querySelectorAll(".create_time");
let update_times = document.querySelectorAll(".update_time");




//更新数据
function updateData() {

    titleNames = document.querySelectorAll(".titleName");
    authors = document.querySelectorAll(".author");
    create_times = document.querySelectorAll(".create_time");
    update_times = document.querySelectorAll(".update_time");
    markTexts = document.querySelectorAll('.markText');
    eyes = document.querySelectorAll('.eye');
    htmlTexts = document.querySelectorAll('.htmlText');
    contents = document.querySelectorAll('.content');
    backs = document.querySelectorAll('.back');
    note_center = document.getElementById("note_center");
    notes = document.querySelectorAll(".note");
    move_ups = document.querySelectorAll('.move-up');
    move_downs = document.querySelectorAll('.move-down');
    file_ups = document.querySelectorAll('.file-up');
    file_downs = document.querySelectorAll('.file-down');
    titleNums = document.querySelectorAll(".titleNum");
    deletes = document.querySelectorAll(".delete");

    updateNoteId(titleNums);
    textareExtend(markTexts);
    showRightInfo(notes);
    htmlToMarkDown(backs);
    markToHtml(eyes);
    noteMoveUp(move_ups);
    noteMoveDown(move_downs);
    createNoteUp(file_ups);
    createNoteDown(file_downs);
    deleteNote(deletes);
}


//获取一个note的各种数据
function getNoteInfo(i,info_right) {
    info_right.innerHTML = 
    "<div>noteId:"+titleNums[i].innerHTML+"</div>"+
    "<div>noteTitle:"+titleNames[i].innerHTML+"</div>"+
    "<div>"+authors[i].innerHTML+"</div>"+
    "<div>"+create_times[i].innerHTML+"</div>"+
    "<div>"+update_times[i].innerHTML+"</div>"
    // "<div>内容:"+markTexts[i].value+"</div>"
}

//显示右边数据
function showRightInfo(notes) {
    for (let i = 0; i < notes.length; i++) {
        markTexts[i].onfocus = function () {
            info_right.style.transform = "translate(0,0)";
            getNoteInfo(i,info_right);
        }
        markTexts[i].onblur = function () {
            info_right.style.transform = "translate(100%,0)";
        }
        htmlTexts[i].onclick = function () {
            info_right.style.transform = "translate(0,0)";
            getNoteInfo(i,info_right);
        }
        // htmlTexts[i].onmouseout = function(){
        //     info_right.style.transform = "translate(100%,0)";
        // }
    }
}
showRightInfo(notes);

//更新noteid
function updateNoteId(titleNums) {
    for (let i = 0; i < titleNums.length; i++) {
        titleNums[i].innerHTML = i;
    }
}
updateNoteId(titleNums);

//侧边栏的展开与收回
let openAndClose = document.querySelector("#openAndClose");
let menu_left = document.querySelector("#menu_left");
openAndClose.onclick = function () {
    if (menu_left.classList.contains('close')) {
        menu_left.classList.remove('close');
        menu_left.style.transform = "translateX(-100%)";
        openAndClose.innerHTML = "展开";
    } else {
        menu_left.classList.add('close');
        menu_left.style.transform = "translateX(0)";
        openAndClose.innerHTML = "收回";
    }
}

//textare的输入回车扩展
function textareExtend(markTexts) {
    for (let i = 0; i < markTexts.length; i++) {
        markTexts[i].addEventListener('input', (e) => {
            markTexts[i].style.height = markTexts[i].offsetHeight + 'px';
            markTexts[i].style.height = e.target.scrollHeight + 'px';
            console.log(i);
            contents[i].style.height = markTexts[i].offsetHeight + 'px';
        });
       
    }
}
textareExtend(markTexts);


//markdown-->html
function markToHtml(eyes) {
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].onclick = function () {
            markTexts[i].value.replace("\n", '<br/>');
            htmlTexts[i].innerHTML = marked.parse(markTexts[i].value);
            htmlTexts[i].style.display = "block";
            hljs.initHighlightingOnLoad();
            setTimeout(() => {
                contents[i].style.height = Math.max(markTexts[i].offsetHeight, htmlTexts[i].offsetHeight) + "px";
                htmlTexts[i].style.height = contents[i].offsetHeight + "px";
            }, 100)
        }
    }
}
markToHtml(eyes);

//html-->markdown
function htmlToMarkDown(backs) {
    for (let i = 0; i < backs.length; i++) {
        backs[i].onclick = function () {
            htmlTexts[i].innerHTML = "";
            htmlTexts[i].style.display = "none";
            setTimeout(() => {
                contents[i].style.height = Math.max(markTexts[i].offsetHeight, htmlTexts[i].offsetHeight) + "px";
                console.log(contents[i].offsetHeight, markTexts[i].offsetHeight, htmlTexts[i].offsetHeight);
            }, 100)
        }
    }
}
htmlToMarkDown(backs);


//move-up
function noteMoveUp(move_ups) {
    for (let i = 0; i < move_ups.length; i++) {
        move_ups[i].onclick = function () {
            if (i > 0) {
                let preNode = notes[i - 1];
                let currentNode = notes[i];
                note_center.insertBefore(currentNode, preNode);
                updateData();
                for(let i=0;i<contents.length;i++) {
                    console.log(contents[i]);
                }
            }
        }
    }
}
noteMoveUp(move_ups);

//move-down
function noteMoveDown(move_downs) {
    for (let i = 0; i < move_downs.length; i++) {
        move_downs[i].onclick = function () {
            if (i < move_downs.length - 1) {
                let afterNode = notes[i + 1];
                let currentNode = notes[i];
                note_center.insertBefore(afterNode, currentNode);
                updateData();
            }
        }
    }
}
noteMoveDown(move_downs);


let currentTime = new Date();
let str = currentTime.getFullYear() + "/"
            + (currentTime.getMonth() + 1) + "/" + currentTime.getDate();
//创建一个笔记
function createNote() {
    let div = document.createElement('div');
    div.classList.add('note');
    div.innerHTML = "<div class='head'>" +
        "<div class='head_left'>" +
        "<div class='round' style='background-color:#FC625D'></div>" +
        "<div class='round' style='background-color:#FDBC40'></div>" +
        "<div class='round' style='background-color:#35CD4B'></div>" +
        "<div class='titleNum'>2</div>" +
        " <div class='titleName'>HTML</div>" +
        "  </div>" +
        "  <div class='head_right'>" +
        "     <div class='author'>作者:bbjsxl</div>" +
        "     <div class='create_time'>创建时间"+str+"</div>" +
        "     <div class='update_time'>更新时间"+str+"</div>" +
        "  </div>" +
        "  <div class='function'>" +
        "     <div class='func eye'>" +
        "       <i class='fa fa-eye'></i>" +
        "    </div>" +
        "    <div class='func back'>" +
        "      <i class='fa fa-angle-left'></i>" +
        "   </div>" +
        " <div class='func file-up'>" +
        "   <i class='fa fa-plus-square-o'></i>" +
        "   </div>" +
        "    <div class='func file-down'>" +
        "      <i class='fa fa-plus-square'></i>" +
        "      </div>" +
        "   <div class='func move-up'>" +
        "           <i class='fa fa-arrow-up'></i>" +
        "       </div>" +
        "       <div class='func move-down'>" +
        "         <i class='fa fa-arrow-down'></i>" +
        "  </div>" +
        "   <div class='func delete'>" +
        "        <i class='fa fa-trash-o'></i>" +
        "        </div>" +
        "     </div>" +
        "    </div>" +
        "<div class='content'>" +
        "   <textarea class='markText'></textarea>" +
        "  <div class='htmlText'></div>" +
        " </div>"
    return div;
}

//file_up
function createNoteUp(file_ups) {
    for (let i = 0; i < file_ups.length; i++) {
        file_ups[i].onclick = function () {
            console.log("111");
            let preNode = createNote();
            let currentNode = notes[i];
            console.log(preNode, currentNode);
            note_center.insertBefore(preNode, currentNode);
            updateData();
        }
    }
}
createNoteUp(file_ups);


//file_down
function createNoteDown(file_downs) {
    for (let i = 0; i < file_downs.length; i++) {
        file_downs[i].onclick = function () {
            console.log("111");
            let afterNode = createNote();
            let nextNode = notes[i + 1];
            console.log(afterNode, nextNode);
            note_center.insertBefore(afterNode, nextNode);
            updateData();
        }
    }
}
createNoteDown(file_downs);

//删除某条笔记
function deleteNote(deletes) {
    for (let i = 0; i < deletes.length; i++) {
        deletes[i].onclick = function () {
            note_center.removeChild(notes[i]);
            updateData();
        }
    }
}
deleteNote(deletes);