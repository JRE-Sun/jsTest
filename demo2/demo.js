window.onload = function() {
    var content = document.querySelector(".content");
    // var mtk = document.querySelector(".mtk");
    var left = false; //四个方向
    var up = false;
    var right = false;
    var down = false;

    //子弹类
    function Bullet(x, y, direction, speed, type) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.type = type;
    }
    //坦克类
    function Tank(x, y, direction, speed, type) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.type = type;
        this.speed = speed;
    }
    // 初始化自己的坦克
    var myTank = new Tank(0, 0, "right", 5, 1);
    var myTankDiv = document.createElement("div");
    myTankDiv.classList.add("mtk");
    content.appendChild(myTankDiv);

    //初始化敌人
    var enemy = [];
    var enemyDiv = [];
    for (var i = 0; i < 10; i++) {
        enemy[i] = new Tank(200, 200, "down", 1, 0);
        enemyDiv[i] = document.createElement("div");
        enemyDiv[i].classList.add("etk");
        enemyDiv[i].style.top = enemy[i].y + "px";
        enemyDiv[i].style.left = enemy[i].x + "px";
        content.appendChild(enemyDiv[i]);
        run(enemyDiv[i], enemy[i]);
        if (i > 0) {
            moveEnemy(enemyDiv[i], enemy[i], enemy[i - 1]);
        }

    }

    function run(ele, obj) {
        setInterval(function() {
            if (Math.round(Math.random() * 100) < 5) {
                de = parseInt(Math.random() * 4);
                switch (de) {
                    case 0:
                        obj.direction = "left";
                        return;
                    case 1:
                        obj.direction = "up";
                        return;
                    case 2:
                        obj.direction = "right";
                        return;
                    case 3:
                        obj.direction = "down";
                        return;
                }
                // console.log(de);
            }
        }, 30);
    }


    function moveEnemy(ele, obj, preObj) {
        setInterval(function() {
            obj.x = ele.offsetLeft;
            obj.y = ele.offsetTop;
            console.log(ele.offsetTop);
            if (obj.direction === "left") {
                ele.style.background = "url(images/tl.gif) no-repeat";
                if (obj.x - obj.speed > 0) {
                    if (obj.x - obj.speed != preObj.x) {
                        ele.style.left = obj.x - obj.speed + "px";
                    } else {
                        ele.style.left = obj.x + "px";
                    }

                } else {
                    ele.style.left = 0 + "px";
                }
                return;
            } else if (obj.direction === "up") {
                ele.style.background = "url(images/tu.gif) no-repeat";
                if (obj.y - obj.speed > 50) {
                    if (obj.y - obj.speed != preObj.y) {
                        ele.style.top = obj.y - obj.speed + "px";
                    } else {
                        ele.style.top = obj.y + "px";
                    }

                } else {
                    ele.style.top = 50 + "px";
                }
                return;
            } else if (obj.direction === "right") {
                ele.style.background = "url(images/tr.gif) no-repeat";
                if (obj.x + obj.speed < 750) {
                    if (obj.x + obj.speed != preObj.x) {
                        ele.style.left = obj.x + obj.speed + "px";
                    } else {
                        ele.style.left = obj.x + "px";
                    }

                } else {
                    ele.style.left = 750 + "px";
                }
                return;
            } else if (obj.direction === "down") {
                ele.style.background = "url(images/td.gif) no-repeat";
                if (obj.y + obj.speed < 550) {
                    if (obj.y + obj.speed != preObj.y) {
                        ele.style.top = obj.y + obj.speed + "px";
                    } else {
                        ele.style.top = obj.y + "px";
                    }

                } else {
                    ele.style.top = 550 + "px";
                }
                console.log(obj.speed);
                return;
            }
        }, 30);
    }
    setInterval(function() {
        myTank.x = myTankDiv.offsetLeft;
        myTank.y = myTankDiv.offsetTop;
        if (left) {
            myTankDiv.style.background = "url(images/tl.gif) no-repeat";
            myTankDiv.style.left = (myTank.x - myTank.speed > 0 ? (myTank.x - myTank.speed) : 0) + "px";
        } else if (up) {
            myTankDiv.style.background = "url(images/tu.gif) no-repeat";
            myTankDiv.style.top = (myTank.y - myTank.speed > 0 ? (myTank.y - myTank.speed) : 0) + "px";
        } else if (right) {
            myTankDiv.style.background = "url(images/tr.gif) no-repeat";
            myTankDiv.style.left = (myTank.x + myTank.speed < 750 ? (myTank.x + myTank.speed) : 750) + "px";
        } else if (down) {
            myTankDiv.style.background = "url(images/td.gif) no-repeat";
            myTankDiv.style.top = (myTank.y + myTank.speed < 550 ? (myTank.y + myTank.speed) : 550) + "px";
        }

    }, 30);
    document.addEventListener("keydown", function(e) {
        var e = e || window.event;
        var code = e.keyCode || e.which || e.charCode;

        switch (code) {
            case 37:
                left = true;
                myTank.direction = "left";
                return;
            case 38:
                up = true;
                myTank.direction = "up";

                return;
            case 39:
                right = true;
                myTank.direction = "right";
                return;
            case 40:
                down = true;
                myTank.direction = "down";
                return;
        }

    }, false);
    document.addEventListener("keyup", function(e) {
        var e = e || window.event;
        var code = e.keyCode || e.which || e.charCode;

        switch (code) {
            case 37:
                left = false;
                return;
            case 38:
                up = false;
                return;
            case 39:
                right = false;
                return;
            case 40:
                down = false;
                return;
            case 90:
                //32空格键发射子弹
                var bullet = new Bullet(myTank.x, myTank.y, myTank.direction, 5, myTank.type);
                var myBullet = document.createElement("div");
                myBullet.classList.add("mbt");
                switch (myTank.direction) {
                    case "left":
                        myBullet.style.left = myTank.x + "px";
                        myBullet.style.top = myTank.y + 19 + "px";
                        content.appendChild(myBullet);
                        moveBullet(myBullet, bullet);
                        return;
                    case "up":
                        myBullet.style.left = myTank.x + 20 + "px";
                        myBullet.style.top = myTank.y + "px";
                        content.appendChild(myBullet);
                        moveBullet(myBullet, bullet);
                        return;
                    case "right":
                        myBullet.style.left = myTank.x + 40 + "px";
                        myBullet.style.top = myTank.y + 21 + "px";
                        content.appendChild(myBullet);
                        moveBullet(myBullet, bullet);
                        return;
                    case "down":
                        myBullet.style.left = myTank.x + 20 + "px";
                        myBullet.style.top = myTank.y + 41 + "px";
                        content.appendChild(myBullet);
                        moveBullet(myBullet, bullet);
                        return;
                }

                return;
        }

    }, false);

    function moveBullet(ele, obj) {
        var timer = null;
        switch (obj.direction) {
            case "left":
                timer = setInterval(function() {
                    obj.x = ele.offsetLeft;
                    if (obj.x < 5) {
                        ele.parentNode.removeChild(ele);
                        clearInterval(timer);
                    } else {
                        ele.style.left = obj.x - obj.speed + "px";
                    }
                    // console.log("left");
                }, 30);
                return;
            case "up":
                timer = setInterval(function() {
                    obj.y = ele.offsetTop;
                    if (obj.y < 5) {
                        ele.parentNode.removeChild(ele);
                        clearInterval(timer);
                    } else {
                        ele.style.top = obj.y - obj.speed + "px";
                    }
                    // console.log("up");
                }, 30);
                return;
            case "right":
                timer = setInterval(function() {
                    obj.x = ele.offsetLeft;
                    if (obj.x > 785) {
                        ele.parentNode.removeChild(ele);
                        clearInterval(timer);
                    } else {
                        ele.style.left = obj.x + obj.speed + "px";
                    }
                    // console.log("right");
                }, 30);
                return;
            case "down":
                timer = setInterval(function() {
                    obj.y = ele.offsetTop;
                    if (obj.y > 585) {
                        ele.parentNode.removeChild(ele);
                        clearInterval(timer);
                    } else {
                        ele.style.top = obj.y + obj.speed + "px";
                    }
                    // console.log("down");
                }, 30);
                return;
        }
    }
};