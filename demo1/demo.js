window.onload = function() {
    var input = document.querySelector("input");
    var body = document.querySelector("body");
    var div = document.createElement("div");
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "pasta");
    body.appendChild(datalist);
    body.appendChild(div);
    var index = 0;
    //监听回车
    document.addEventListener("keydown", function(e) {
        var e = e || window.event;
        var code = e.keyCode || e.which || e.charCode;
        if (code == 13) {
            if (input.value) {
                // input的值要用value获取，不能用innhtml
                var option = document.createElement("option");
                var p = document.createElement("p");
                option.index = index;
                p.index = index;
                index++;
                p.addEventListener("click", function() {
                    // alert(this.innerHTML);
                    var that = this;
                    var options = document.querySelectorAll("option");
                    var ps = document.querySelectorAll("p");
                    for (var i = 0; i < ps.length; i++) {
                        // alert(options[i].index);
                        if (ps[i] == that) {
                            datalist.removeChild(options[i]);
                            div.removeChild(ps[i]);
                        }
                    }
                }, false);
                p.innerHTML = input.value;
                option.innerHTML = input.value;
                datalist.insertBefore(option, datalist.firstElementChild);
                div.insertBefore(p, div.firstElementChild);
                input.value = "";
            } else {
                alert("填写错误！");
            }
        }
    }, false);
};