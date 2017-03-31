window.onload = function() {
    var input = document.querySelector("input");
    var div = document.querySelector("div");
    //监听回车
    document.addEventListener("keydown", function(e) {
        var e = e || window.event;
        var code = e.keyCode || e.which || e.charCode;
        if (code == 13) {
            if (input.value) {
                // input的值要用value获取，不能用innhtml
                var p = document.createElement("p");
                p.addEventListener("click", function() {
                    // alert(this.innerHTML);
                    this.parentElement.removeChild(this);
                }, false);
                p.innerHTML = input.value;
                div.appendChild(p);
                input.value = "";
            } else {
                alert("填写错误！");
            }

        }
    }, false);
};