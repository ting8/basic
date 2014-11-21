//drop,leave,over,emptydrop事件声明
var myover = function(el, B) {
    var C = this.getCoordinates();
    el.setStyle('width', C.width + 'px');
    if (this.hasClass('common_cloms_btm')) {
        var _C = (el.getCoordinates().height - 8) + 'px';
    } else {
        var _C = (C.height - 8) + 'px';
    }
    var C = B.options.dragbase.getParent();
    var _flag = false;
    if (C == this.getParent()) {
        var D = B.options.dragbase;
        while (D = D.getNext()) {
            if (!D) break;
            if (D == this) {
                _flag = true;
                break;
            }
        }
    }
    _flag = this.hasClass('slider') && _flag;
    if (B.options.dragbase) {
        if (B.options.basecount > 0) {
            B.options.dragbase.getNext().remove()
        } else {
            el.getNext().remove()
        }
        B.options.dragbase.remove();
    }

    (B.options.basecount)++;
    if (_flag) {
        B.options.dragbase = new Element('div', {
            'class': 'highspan'
        });
        B.options.dragbase.injectAfter(this);
        new Element('div', {
            'class': 'highspan'
        }).injectAfter(this);
    } else {
        B.options.dragbase = new Element('div', {
            'class': 'highspan'
        });
        B.options.dragbase.injectBefore(this);
        new Element('div', {
            'class': 'highspan'
        }).injectBefore(this);
    }
}
var myemptydrop = function(B) {
    if (B.options.dragbase) {
        this.injectBefore(B.options.dragbase);
        B.options.dragbase.remove();
        this.setStyle('position', '');
        B.options.dragbase = null;
        this.setStyle('width', '100%');
    }
    saveHTML();
}

var mydrop = function(el, B) {
    if (B.options.dragbase) {
        el.injectBefore(B.options.dragbase);
        B.options.dragbase.remove();
        el.setStyle('position', '');
        B.options.dragbase = null;
        el.setStyle('width', '100%');
    }
}

//初始化所有布局层
loadOpacity();
DragStart();
var insertObj;

/*****************************************************/
$('AddNewModBtn').addEvent('click', function() {
    $('common_grids').setStyle('display', 'block');
})
attach();

(function() {
    var btn = document.getElementById("banner_upload");
    var target = document.getElementById("banner");
    if (localStorage.pic) {
        target.src = localStorage.pic;
    }
    btn.onchange = function(e) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(evt) {
            // console.log(type);
            var pic = evt.target.result;
            target.src = pic;
            localStorage.pic = pic;
        }
    }
})();

function getBlobUrl(file) {
    var url = "";
    if (window.createObjectURL) {
        url = window.createObjectURL(file);
    } else if (window.createBlobURL) {
        url = window.createBlobURL(file);
    } else if (window.URL && window.URL.createObjectURL) {
        url = window.URL.createObjectURL(file); //chrome,firefox
    } else if (window.webkitURL && window.webkitURL.createObjectURL) {
        url = window.webkitURL.createObjectURL(file); //safari
    }
    return url;
}

function saveHTML() {
    if (!window.localStorage) {
        return false;
    }
    var html = $('common_wrap').innerHTML;
    localStorage.setItem("common_html", html);
}

function loadOpacity() {
    //localStorage.setItem("common_html","");
    var obj = $('common_wrap');
    if (!window.localStorage) {
        return false;
    }
    obj.innerHTML = localStorage.getItem("common_html");
    var div = obj.getElementsByTagName("div");
    var len = div.length;
    for (var i = 0; i < len; i++) {
        if (div[i].className.indexOf("common_cloms_mod_drag") > -1) {
            div[i].style.opacity = 1;
        }
    }
}

function DragStart() {
    var _drag = $ES('.common_hx', 'common_cloms_drag'); //.extend($ES('.title','center')).extend($ES('.title','right'));
    _drag.each(function(el) {
        el.getParent().addEvent('over', myover).addEvent('drop', mydrop);
    })
    var _bottom = $ES('.common_cloms_btm', 'div');
    _bottom.each(function(el) {
        el.addEvent('over', myover).addEvent('drop', mydrop);
    })
    var allDrag = [];
    _drag.each(function(el) {
        allDrag.include(new MyDrag(el.getParent().addEvent('emptydrop', myemptydrop), {
            handle: el,
            droppables: $ES('.common_cloms_mod_drag', 'div').extend($ES('.common_cloms_btm', 'div')).remove(el.getParent())
        }));
    })
}

function showGrid(obj) {
    var GridType = obj.id;
    if (!CommonMod.Grid[GridType]) {
        return false;
    };

    var NewGrid = document.createElement("div");
    NewGrid.className = "common_cloms";
    NewGrid.innerHTML = CommonMod.Grid[GridType] + '<div class="common_cloms_clear"></div><div class="common_cloms_del" onclick="GridDel(this)">删除</div>';

    $("common_wrap").appendChild(NewGrid)

    $('common_grids').setStyle('display', 'none');
    attach();
    DragStart();
    saveHTML();
}

function attach() {
    var btms = document.getElementsByTagName("div");
    var len = btms.length;
    for (var i = 0; i < len; i++) {
        if (btms[i].className.indexOf("common_cloms_btm") > -1) {
            btms[i].onclick = function() {
                AddModList(this);
            }
        }
    }
}

function isHideOp(event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if ((target.className !== 'common_cloms_btm') && (target.className !== 'AddNewModBtn')) {
        hideOprator();
        if (target.id == 'common_grids') {
            $('common_grids').setStyle('display', 'block');
        }
        if (target.id == 'AllMod') {
            $('AllMod').setStyle('display', 'block');
        }
    }
}

function AddModList(obj) {
    insertObj = obj;
    if (!$('AllMod')) {
        var html = "";
        for (var prop in CommonMod.Mod) {
            html = [html, '<span onclick=AddMod("', prop, '")>', CommonMod.Mod[prop].Title, '</span>'].join("");
        }
        if (!document.getElementById('AllMod')) {
            var div = document.createElement('div');
            document.getElementsByTagName('body')[0].appendChild(div);
            div.id = "AllMod";
            div.className = "AllMod";
            div.innerHTML = html;
        }
    }
    div = document.getElementById('AllMod');
    div.style.display = "block";
    div.style.top = getPositonT(obj) - 30 + 'px';
    div.style.left = getPositonL(obj) - obj.clientWidth / 2 - 100 + 'px';
}

function AddMod(prop) {
    var obj = insertObj;
    var html = ['<div class="common_hx"><h2>', CommonMod.Mod[prop].Title, '</h2>',
        '<span onclick="removeMod(this)">删除</span></div>',
        CommonMod.Mod[prop].Html
    ].join("");
    var newNode = document.createElement("div");
    newNode.className = "common_cloms_mod_drag common_cloms_mod_" + prop;
    newNode.innerHTML = html + '<div class="clear"></div>';
    obj.parentNode.insertBefore(newNode, obj);

    var newHighSpan = document.createElement("div");
    newHighSpan.className = "highspan";
    obj.parentNode.insertBefore(newHighSpan, obj);

    DragStart();
    $('AllMod').style.display = "none";
    saveHTML();
}

function emptyWrap() {
    localStorage.clear();
    $("common_wrap").innerHTML = "";
    hideOprator();
    saveHTML();
}

function removeMod(obj) {
    var objD = obj.parentNode.parentNode;
    objH = objD.previousSibling;
    objH.parentNode.removeChild(objH);
    objD.parentNode.removeChild(objD);
    saveHTML();
    hideOprator();
}

function GridDel(obj) {
    var objD = obj.parentNode;
    objD.parentNode.removeChild(objD);
    saveHTML();
    hideOprator();
}

function hideOprator() {
    $('common_grids').setStyle('display', 'none');
    if ($('AllMod')) {
        $('AllMod').setStyle('display', 'none');
    }
}

function getPositonL(obj) {
    if (!obj) {
        return false;
    }
    var L1 = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); //页面往左滚动的宽度
    var L2 = obj.getBoundingClientRect().left; //元素在可视区域距离显示器左边的宽度
    var L3 = obj.clientWidth; //元素本身的宽度
    var L = parseInt(L1) + parseInt(L2) + parseInt(L3);
    return L;
}

function getPositonT(obj) {
    if (!obj) {
        return false;
    }
    var T1 = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    var T2 = obj.getBoundingClientRect().top;
    var T3 = obj.clientHeight;
    var T = parseInt(T1) + parseInt(T2) + parseInt(T3);
    return T;
}