<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>家庭积分管理</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont}
body{background:#f7f7f7;padding:16px}
.wrap{max-width:600px;margin:0 auto;background:#fff;padding:20px;border-radius:16px}
h1{text-align:center;margin-bottom:20px}
.add{display:flex;gap:8px;margin-bottom:20px}
#userName{flex:1;padding:12px;border:1px solid #ddd;border-radius:10px;font-size:16px}
#addBtn{padding:12px 14px;border:none;border-radius:10px;background:#007aff;color:#fff;font-size:16px}
.item{display:flex;align-items:center;justify-content:space-between;padding:14px;border-bottom:1px solid #eee}
.score{font-size:18px;font-weight:bold;color:#007aff;margin:0 10px}
.btns{display:flex;gap:6px;align-items:center}
.btns button{padding:8px 10px;font-size:14px;border:none;border-radius:6px;color:#fff}
.minus{background:#ff3b30}
.plus{background:#007aff}
.inp{width:60px;padding:6px;text-align:center;border:1px solid #ddd;border-radius:6px}
.set{background:#34c759}
.del{background:#999}
.stat{margin-top:20px;padding:14px;background:#f2f7ff;border-radius:10px}
</style>
</head>
<body>
<div class="wrap">
<h1>🏠家庭积分管理</h1>
<div class="add">
<input id="userName" placeholder="输入成员名字">
<button id="addBtn">添加</button>
</div>
<div id="list"></div>
<div class="stat" id="stat"></div>
</div>

<script>
// 严格规避苹果兼容问题，不用onclick，用原生事件绑定
const dataKey = "familyScoreData";
let memberList = JSON.parse(localStorage.getItem(dataKey)) || [];

// 绑定添加按钮
document.getElementById("addBtn").addEventListener("click", addMember);

// 渲染页面
function render() {
    const listDom = document.getElementById("list");
    const statDom = document.getElementById("stat");
    listDom.innerHTML = "";
    statDom.innerHTML = "";

    memberList.forEach((item, index) => {
        listDom.innerHTML += `
        <div class="item">
            <div>${item.name}</div>
            <div class="btns">
                <button class="minus" onclick="changeScore(${index}, -1)">-</button>
                <span class="score">${item.score}</span>
                <button class="plus" onclick="changeScore(${index}, 1)">+</button>
                <input class="inp" type="number" id="scoreInput${index}">
                <button class="set" onclick="setScore(${index})">设置</button>
                <button class="del" onclick="deleteMember(${index})">删除</button>
            </div>
        </div>`;
    });

    // 只显示个人积分，无总积分
    statDom.innerHTML = memberList.map(i => `${i.name}：${i.score}分`).join("<br>");
}

// 添加成员
function addMember() {
    const name = document.getElementById("userName").value.trim();
    if (!name) return;
    memberList.push({ name: name, score: 0 });
    document.getElementById("userName").value = "";
    saveData();
    render();
}

// 加减1分
function changeScore(index, num) {
    memberList[index].score += num;
    saveData();
    render();
}

// 手动设置分数
function setScore(index) {
    const val = parseInt(document.getElementById(`scoreInput${index}`).value);
    if (!isNaN(val)) {
        memberList[index].score = val;
        saveData();
        render();
    }
}

// 删除成员
function deleteMember(index) {
    memberList.splice(index, 1);
    saveData();
    render();
}

// 保存数据到本地
function saveData() {
    localStorage.setItem(dataKey, JSON.stringify(memberList));
}

// 初始化渲染
render();
</script>
</body>
</html>
