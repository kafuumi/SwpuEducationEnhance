// ==UserScript==
// @name         西柚教务增强脚本
// @namespace    https://github.com/Hami-Lemon/SwpuEducationEnhance
// @version      1.0
// @description  解决西柚教务系统无法查看成绩明细的问题
// @author       Hami Lemon
// @match        *://jwxt.swpu.edu.cn/gradeLnAllAction.do*
// @match        *://jwxt.swpu.edu.cn/bxqcjcxAction.do*
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @run-at       document-idle
// @grant unsafeWindow
// @license      GPL-3.0
// @compatible   firefox
// @compatible   chrome
// @supportURL   https://github.com/Hami-Lemon/SwpuEducationEnhance/issues
// @compatible   edge
// @compatible   safari
// ==/UserScript==

(function() {
    /* 在现代浏览器中，此方法已被废弃（除了IE)，而查看成绩明细功能则是调用此方法
    详见：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showModalDialog */
    showModalDialog = function(url) {
        open(url);
    }

    //匹配本学期成绩页面
    if (location.href.search("bxqcjcxAction.do") != -1) {
        let gradesTable = $("table#user.displayTag");
        if (gradesTable != null) {
            let gpa = calGPA(gradesTable);
            if (!isNaN(gpa)) {
                let gpaRoot = $("<div></div>");
                gpaRoot.css("font-size", "14px");
                gpaRoot.css("margin", "30px 50px");

                let gpaElement = $("<div></div>");
                gpaElement.text("平均绩点：" + gpa);

                let infoElement = $("<div>*没有成绩的课程不会参与计算</div>");
                infoElement.css("font-size", "12px");
                infoElement.css("color", "#e00");
                infoElement.css("margin", "6px 0");

                gpaRoot.append(gpaElement);
                gpaRoot.append(infoElement);
                $("body").append(gpaRoot);
            }
        }
    }

    //计算本学期的学分绩点，计算公式见学生手册33页（此公式为本科生的计算公式）
    function calGPA(gradesTable) {
        let gradesTr = gradesTable.find("thead tr");
        //每门课学分*绩点的总和
        let totalPoint = 0;
        //总学分
        let totalCredit = 0;
        //遍历每一行数据
        for (let i = 0; i < gradesTr.length; i++) {
            let course = gradesTr.eq(i).find("td");

            //成绩
            let grades = course.eq(9)
                .text()
                .replace(/\s*/g, "");
            //该课程没有成绩，不参与计算
            if (grades == "") {
                continue;
            }
            //学分
            let credit = course.eq(4)
                .text()
                .replace(/\s*/g, "");
            credit = Number(credit);

            //学分绩点：（分数-60）/10+1
            let gradePoint;
            //成绩为按等级划分
            switch (grades) {
                case "优秀":
                    gradePoint = 4.5;
                    break;
                case "良好":
                    gradePoint = 3.5;
                    break;
                case "中等":
                    gradePoint = 2.5
                    break;
                case "及格":
                    gradePoint = 1.5
                    break;
                case "不及格":
                    gradePoint = 0;
                    break;
                default:
                    gradePoint = -1;
                    break;
            }
            if (gradePoint == -1) {
                grades = Number(grades);
                if (grades < 60) {
                    gradePoint = 0;
                } else {
                    gradePoint = (grades - 60) / 10 + 1;
                }
            }
            totalCredit += credit;
            totalPoint += (credit * gradePoint);
        }
        //平均学分绩点 总(学分*绩点）/ 总学分
        return totalPoint / totalCredit;
    }

})();
