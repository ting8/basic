describe("NE.$", function() {
  var NE = window.NE;

  var dom = document.createElement("div");
  dom.id = "ne_div";

  it("NE('body')", function() {
    expect(document.body).toEqual(NE("body")[0]);
  });

  it("NE('#ne_div')", function() {
	document.body.appendChild(dom);
    expect(dom["id"]).toEqual(NE("#ne_div")[0]["id"]);
    document.body.removeChild(dom);
  });

  it("NE.$('#ne_div')", function() {
	document.body.appendChild(dom);
    expect(dom["id"]).toEqual(NE.$("#ne_div")["id"]);
    document.body.removeChild(dom);
  });


  it("NE.$('.class1')", function() {
    expect(NE.$('.class1').length).toEqual(2);
  });

  it("NE.$('div')", function() {
    expect(NE.$('div').length).toEqual(document.getElementsByTagName("div").length);
  });
});

describe("NE.type", function() {
  var NE = window.NE;

  it("NE.type('string')==" + NE.type('string'), function() {
    expect(NE.type('string')).toEqual("string");
  });

  it("NE.type(1)==" + NE.type(1), function() {
    expect(NE.type(1)).toEqual("number");
  });

  it("NE.type([])==" + NE.type([]), function() {
    expect(NE.type([])).toEqual("array");
  });

  it("NE.type(true)==" + NE.type(true), function() {
    expect(NE.type(true)).toEqual("boolean");
  });

  it("NE.type(function(){})==" + NE.type(function(){}), function() {
    expect(NE.type(function(){})).toEqual("function");
  });

  it("NE.type(new Date())==" + NE.type(new Date()), function() {
    expect(NE.type(new Date())).toEqual("date");
  });

  it("NE.type(/\\s+/)==" + NE.type(/\s+/), function() {
    expect(NE.type(/\s+/)).toEqual("regexp");
  });

  it("NE.type({})==" + NE.type({}), function() {
    expect(NE.type({})).toEqual("object");
  });
});

describe("NE.browser", function() {
  var NE = window.NE;

  var matched, browser,ua = navigator.userAgent;
  uaMatch = function (ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
          /(webkit)[ \/]([\w.]+)/.exec(ua) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
          /(msie) ([\w.]+)/.exec(ua) ||
          ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
          [];

    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  };

  matched = uaMatch(ua);
  browser = {};

  browser.is64 = (function(){
    var flag = false;
    var pfMarks = ["amd64","ppc64","_64","win64"];
    var uaMarks = ["x86_64","wow64"];
    var pf = navigator.platform.toLowerCase();
    for(var i=0,len=pfMarks.length;i<len;i++){
      if (pf.indexOf(pfMarks[i])>-1){
        flag = true;
        break;
      }
    }
    for(var i=0,len=uaMarks.length;i<len;i++){
      if (ua.toLowerCase().indexOf(uaMarks[i])>-1){
        flag = true;
        break;
      }
    }
    return flag;
  })();

  browser.mock = (function(){
    var mock = false;
    var mocks = ["maxthon","tencent","qqbrowser"," se "];
    for(var i=0,len=mocks.length;i<len;i++){
      if(ua.toLowerCase().indexOf(mocks[i])>-1){
        mock = true;
        break;
      }
    }
    try{
      var upFlag = typeof navigator.userProfile !== "undefined";
      var exFlag = typeof(window.external+"") == "string";
    }catch(ex){
      
    }
    return mock || (upFlag && exFlag);
  })();

  var arr = "chrome webkit opera msie".split(" ");
  for(var i=0,len=arr.length;i<len;i++){
    browser[arr[i]] = false;
  }

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
  }
  if (browser.webkit) {
    browser.safari = true;
  }

  NE.array.each("chrome webkit opera msie version is64 mock".split(" "),function(i,item){
    it(item + "==" + NE.browser[item], function() {
      expect(NE.browser[item]).toEqual(browser[item]);
    });
  });
});

describe("NE.event", function() {
  var NE = window.NE;

  var dom = document.createElement("div");
  dom.id = "ne_div";

  document.body.appendChild(dom);
  window["_tmp"] = false;

  function addFun(){
    window["_tmp"] = !window["_tmp"];
  }
  NE.event.add(dom,"click",addFun);
  NE.event.trigger(dom,"click");

  it("trigger",function(){
    expect(window["_tmp"]).toEqual(true);
  });

  it("add", function() {
    expect(window["_tmp"]).toEqual(true);
  });

  it("remove",function(){
    NE.event.remove(dom,"click",addFun);
    NE.event.trigger(dom,"click");

    expect(window["_tmp"]).toEqual(true);

    window._tmp = null;
    document.body.removeChild(dom);
  });
});

describe("NE.dom", function() {
  var NE = window.NE;
  var dom = document.createElement("div");
  dom.id = "ne_div";

  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");

  p1.id = "p1";
  p2.id = "p2";
  p3.id = "p3";

  document.body.appendChild(dom);

  it("ready",function(done){
    //NE.dom.ready(document.body, function(){
    NE.ready(function(){
      expect(1).toEqual(1);
      done();
    });
  });

  it("append",function(){
    NE.dom.append(p1,dom);
    expect(dom.childNodes[0].id).toEqual("p1");
  });

  it("before",function(){
    NE.dom.before(p2,p1);
    expect(dom.childNodes[0].id).toEqual("p2");
  });

  it("after",function(){
    NE.dom.after(p3,p1);
    expect(dom.childNodes[2].id).toEqual("p3");
  });

  it("remove",function(){
    NE.dom.remove(p1);
    NE.dom.remove(p2);
    NE.dom.remove(p3);

    expect(dom.childNodes.length).toEqual(0);

    NE.dom.remove(dom);
  });
});

describe("NE.classList", function() {
  var NE = window.NE;

  var dom = document.createElement("div");
  dom.id = "ne_div";
  dom.style.fontSize = "30px";
  dom.style.color = "rgb(255, 0, 0)";
  document.body.appendChild(dom);

  var className = "test";
  dom.className = className;

  it("contains",function(){
    expect(NE.classList.contains(dom,className)).toEqual(true);
  });

  it("add",function(){
    var classname = "test1";
    NE.classList.add(dom,classname)
    expect(NE.classList.contains(dom,classname)).toEqual(true);
  });

  it("remove",function(){
    var classname = "test1";
    NE.classList.remove(dom,classname)
    expect(NE.classList.contains(dom,classname)).toEqual(false);
  });

  it("toggle",function(){
    NE.classList.toggle(dom,className)
    expect(NE.classList.contains(dom,className)).toEqual(false);
    NE.classList.toggle(dom,className)
    expect(NE.classList.contains(dom,className)).toEqual(true);
  });

  it("getStyle by 0.1.3",function(){
    expect(NE.classList.getStyle(dom,"font-size")).toEqual("30px");
  });

  it("setStyle by 0.1.3",function(){
    NE.classList.setStyle(dom,"font-size:40px;");

    expect(NE.classList.getStyle(dom,"font-size")).toEqual("40px");

    NE.classList.setStyle(dom,{"font-size":"30px"});

    expect(NE.classList.getStyle(dom,"font-size")).toEqual("30px");
  });
});

describe("NE.store", function() {
  var NE = window.NE;

  it("set",function(){
    
    NE.store.set("NE","a",2);

    expect(NE.store.get("NE.a")).toEqual("2"); 
  });

  it("get",function(){            
    expect(NE.store.get("NE.a")).toEqual("2"); 
  });

  it("remove",function(){            
    NE.store.remove("NE.a")
    expect(NE.store.get("NE.a")).toEqual(""); 
  });
});

describe("NE.cookie", function() {
  var NE = window.NE;

  it("set",function(){
    NE.cookie.set("NE",2);
    expect(NE.cookie.get("NE")).toEqual("2"); 
  });

  it("get",function(){            
    expect(NE.cookie.get("NE")).toEqual("2"); 
  });

  it("remove",function(){            
    NE.cookie.remove("NE");
    expect(NE.cookie.get("NE")).toEqual("");
  });
});

describe("NE.load", function() {
  var NE = window.NE;

  it("ajax",function(done){
    function test(){
      expect(true).toEqual(true);
      done();
    }
    setTimeout(test, 100);
  });
});


describe("NE.string", function() {
  var NE = window.NE;

  it("camelCase",function(){
    expect(NE.string.camelCase("font-size")).toEqual("fontSize"); 
  });

  it("trim",function(){
    expect(NE.string.trim(" 1 ")).toEqual("1");
    expect(NE.string.trim(" 1 ","left")).toEqual("1 ");
    expect(NE.string.trim(" 1 ","right")).toEqual(" 1");
    expect(NE.string.trim(" 1 2 ","all")).toEqual("12");
  });

  it("guid",function(){
    var str = NE.string.guid();
    if(str){
      expect(str).toEqual(str);
    }else{
      expect(str).toEqual(null);
    }
  });
});


describe("NE.array", function() {
  var NE = window.NE;

  var arr1 = [1,2,3],arr2 = [3,4,5];
  var _l = arr1.length + arr2.length;

  it("each",function(){
    var arr3 = [1,2,3,4,5,6,7,8,9,10];
    var _sum = 0;

    var obj1 = {"a":"1","b":"2","c":"3","d":"4"};
    var _objl = 0;

    NE.array.each(arr3,function(i,obj){
      _sum++;
    });

    NE.array.each(obj1,function(key,obj){
      _objl++;
    });

    expect(_sum).toEqual(arr3.length); 
    expect(_objl).toEqual(4);
  });

  it("merge",function(){
    NE.array.merge(arr1,arr2);
    expect(arr1.length).toEqual(_l); 
  });

  it("indexOf",function(){
    var _arr = ["a","b","c","d"];
    var __l = 0;

    NE.array.each(_arr,function(i,obj){
      if(NE.array.indexOf(_arr,obj) != -1){
        __l++;
      }
    });
    expect(_arr.length).toEqual(__l); 
    expect(NE.array.indexOf(_arr,"e")).toEqual(-1); 
  });

  it("filter",function(){
    var _arr = ["a",1,"b",2,"c",3,"d",4];
    var __l = 0;

    function numberic(str){
      return NE.isNumeric(str);
    }

    _arr = NE.array.filter(_arr,numberic);
    expect(_arr.length).toEqual(4); 
  });

  it("keys",function(){
    var _arr = {"a":"1","b":"2","c":"3","d":"4"};
    var __l = 0;

    _arr = NE.array.keys(_arr);
    expect(_arr.length).toEqual(4); 
  });

  it("uniq",function(){
    expect(NE.array.uniq(arr1).length).toEqual(5);
  });
});


describe("NE.prop", function() {
  var NE = window.NE;

  var dom = document.createElement("div");
  dom.id = "ne_div";
  document.body.appendChild(dom);


  it("set",function(){
    NE.prop.set(dom,"NE",2);
    expect(NE.prop.get(dom,"NE")).toEqual(2); 
  });

  it("get",function(){            
    expect(NE.prop.get(dom,"NE")).toEqual(2); 
  });

  it("remove",function(){            
    NE.prop.remove(dom,"NE")
    expect(NE.prop.get(dom,"NE")).toEqual(""); 
  });
});


describe("NE.json", function() {
  var NE = window.NE;
  var obj = {"a":1,"b":2,"c":"ab"};
  var str = '{"a":1,"b":2,"c":"ab"}';

  it("stringfy",function(){
    var _str = NE.json.stringfy(obj);

    expect(_str).toEqual(str); 
  });

  it("parse",function(){
    var _obj = NE.json.parse(str);

    expect(_obj["a"]).toEqual(obj["a"]); 
    expect(_obj["b"]).toEqual(obj["b"]); 
    expect(_obj["c"]).toEqual(obj["c"]); 
  });

  it("encode",function(){
    var object = {"name":"john","age":18};
    var resultT = encodeURIComponent("age")+"="+encodeURIComponent(18)+"?"+encodeURIComponent("name")+"="+encodeURIComponent("john");
    var resultF = "age=18?name=john";
    
    expect(NE.json.encode(object, "?", true)).toEqual(resultT);
    expect(NE.json.encode(object, "?", false)).toEqual(resultF);
  });

  it("decode",function(){
    var object = encodeURIComponent("age")+"="+encodeURIComponent(18)+"&"+encodeURIComponent("name")+"="+encodeURIComponent("john");
    var resultT = {"age":"18","name":"john"}; 
    expect(NE.json.decode(object)).toEqual(resultT);
  });

  it("copy",function(){
    var oa = {},
        ob = {"a":1,"b":2};

    NE.json.copy(oa,ob);

    expect(oa["a"]).toEqual(1); 
    expect(oa["b"]).toEqual(2); 

    ob = {"a":3,"b":4};

    NE.json.copy(oa,ob,true,function(num){
      return ++num;
    });

    expect(oa["a"]).toEqual(4);
    expect(oa["b"]).toEqual(5);
  });
});


describe("NE.date", function() {
  var NE = window.NE;

  it("parseDate",function(){
    var date1 = NE.date.parseDate("2012-12-13 10:10:10");

    expect(date1.getFullYear()).toEqual(2012);
    expect(date1.getMonth()).toEqual(11);
    expect(date1.getDate()).toEqual(13);
    expect(date1.getHours()).toEqual(10);
    expect(date1.getMinutes()).toEqual(10);
    expect(date1.getSeconds()).toEqual(10);

  });

  it("format",function(){
    var returnstr = NE.date.format("2012-12-13 10:10:10","yy年M月d日 h点m分s秒");
    var str = "12年12月13日 10点10分10秒";
    expect(returnstr).toEqual(str);
  });

  it("diff",function(){
    var date1 = "2012-12-12 09:09:09",
        date2 = "2012-12-13 10:10:10",
        obj;

    obj = NE.date.diff(date1,date2);
    expect(obj.day).toEqual(1);
    expect(obj.hours).toEqual(1);
    expect(obj.minutes).toEqual(1);
    expect(obj.seconds).toEqual(1);
  });

  it("stringToDate",function(){
    var date1 = NE.date.parseDate("2012-12-13 10:10:10");

    expect(date1.getFullYear()).toEqual(2012);
    expect(date1.getMonth()).toEqual(11);
    expect(date1.getDate()).toEqual(13);
    expect(date1.getHours()).toEqual(10);
    expect(date1.getMinutes()).toEqual(10);
    expect(date1.getSeconds()).toEqual(10);

    date1 = NE.date.parseDate("2012/12/13 10:10:10");

    expect(date1.getFullYear()).toEqual(2012);
    expect(date1.getMonth()).toEqual(11);
    expect(date1.getDate()).toEqual(13);
    expect(date1.getHours()).toEqual(10);
    expect(date1.getMinutes()).toEqual(10);
    expect(date1.getSeconds()).toEqual(10);


    date1 = NE.date.parseDate("12/13/2012 10:10:10");

    expect(date1.getFullYear()).toEqual(2012);
    expect(date1.getMonth()).toEqual(11);
    expect(date1.getDate()).toEqual(13);
    expect(date1.getHours()).toEqual(10);
    expect(date1.getMinutes()).toEqual(10);
    expect(date1.getSeconds()).toEqual(10);
  });
});


describe("NE.template", function() {
  var NE = window.NE;

  it("replace", function() {
    var html = '<a href="www.163.com" target="_blank">{person}--{speech}</a>';
    var field = {speech:"Today is sunny!",person:"john"};    //Ë³Ðò¿É±ä
    var field_o = {speech:"Today is sunny!",person:"john",date:"2012.8.3"};      //¿É¶à
    var field_t = {speech:"Today is sunny!",date:"2012.8.3"};

    var result = '<a href="www.163.com" target="_blank">john--Today is sunny!</a>';
    var result_t = '<a href="www.163.com" target="_blank">--Today is sunny!</a>';

    expect(NE.template.replace(html, field)).toEqual(result);
    expect(NE.template.replace(html, field_o)).toEqual(result);
    expect(NE.template.replace(html, field_t)).toEqual(result_t);
  });

});


describe("NE.para", function() {
  var NE = window.NE;

  it("set", function() {
    var url = "http://www.163.com/index.html?a=1&b=2&c=a&bbb=bbbb&e=网易"
    ,v1 = "11"
    ,v2 = "22"
    ,v3 = "aa"
    ,v4 = escape("网易-李志东")
    ,v5 = encodeURIComponent("你妹，你妹，易你妹")
    ,v6 = "添加参数"
    ;
    
    url = NE.para.set(url,"a",v1);
    url = NE.para.set(url,"b",v2);
    url = NE.para.set(url,"c",v3);
    url = NE.para.set(url,"bbb",v4);
    url = NE.para.set(url,"e",v5);
    
    url = NE.para.set(url,"f",v6)
    
    expect(NE.para.get(url,"a")).toEqual(v1);
    expect(NE.para.get(url,"b")).toEqual(v2);
    expect(NE.para.get(url,"c")).toEqual(v3);
    
    expect(
      NE.para.get(url,"bbb")
    ).toEqual(v4);
    
    expect(
      NE.para.get(url,"e")
    ).toEqual(v5);
    
    expect(
      NE.para.get(url,"f")
    ).toEqual(v6)
  });
  
  it("remove", function() {
    var url = "http://www.163.com/index.html?a=1&b=2&c=a&bbb=bbbb&e=网易";
    
    var valueUrl = "http://www.163.com/index.html"
    
    url = NE.para.remove(url,"a");
    url = NE.para.remove(url,"b");
    url = NE.para.remove(url,"c");
    url = NE.para.remove(url,"bbb");
    url = NE.para.remove(url,"e");
    url = NE.para.remove(url,"f");
    
    expect(url).toEqual(valueUrl);
  });

  it("get", function() {
    var url = "http://www.163.com/index.html?a=1&b=2&c=a&bbb=bbbb&e=网易";
    expect(NE.para.get(url,"a")).toEqual("1");
    expect(NE.para.get(url,"b")).toEqual("2");
    expect(NE.para.get(url,"c")).toEqual("a");
    expect(NE.para.get(url,"bbb")).toEqual("bbbb");
    expect(NE.para.get(url,"e")).toEqual("网易");
  });
});


describe("NE.hash", function() {
  var NE = window.NE;

  it("get", function() {
    window.location.hash = "!a=1&b=2&c=a&bbb=bbbb&e=网易";
    
    expect(NE.hash.get("a")).toEqual("1");
    expect(NE.hash.get("b")).toEqual("2");
    expect(NE.hash.get("c")).toEqual("a");
    expect(NE.hash.get("bbb")).toEqual("bbbb");
    expect(NE.hash.get("e")).toEqual("网易");
  });

  it("set", function() {
    window.location.hash = "!a=1&b=2&c=a&bbb=bbbb&e=网易";

    var valueUrl = "#!a=2&b=4&c=g&bbb=dd&e=易网";

    NE.hash.set("a","2");
    NE.hash.set("b","4");
    NE.hash.set("c","g");
    NE.hash.set("bbb","dd");
    NE.hash.set("e","易网");

    expect(window.location.hash).toEqual(valueUrl);
  });

  it("remove", function() {
    NE.hash.remove("b");
    NE.hash.remove("c");
    NE.hash.remove("bbb");
    NE.hash.remove("e");

    expect(window.location.hash).toEqual("#!a=2");
  });
});
