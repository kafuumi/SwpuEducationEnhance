# 西柚教务增强助手

**本脚本仅针对电脑端**

## 主要功能

1. 解决无法查看成绩明细的问题

   ![1](https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701092649.png)

2. 计算本学期学分绩点（计算公式见学生手册第33页）

   ![2](https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701092700.png)

## 安装脚本

本脚本主要针对在使用部分浏览器（包括但不限于谷歌浏览器，火狐浏览器，Edge）浏览教务处网站时出现的一些问题，如果你使用的是IE浏览器，那么你并不需要此脚本。

1. 下载油猴插件

   下载地址：[Tampermonkey](https://www.tampermonkey.net/)

   推荐使用`Microsoft Edge`浏览器，当然，其它支持油猴脚本的浏览器也可以。

   ![3](https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701093420.png)

2. 安装脚本

   安装地址：[点击安装](https://greasyfork.org/zh-CN/scripts/428740-西柚教务增强脚本)

   <img src="https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701105722.png" alt="5" style="zoom:80%;" />

### 附：

如要**你不想安装油猴脚本**(即不想安装此脚本)，只想要能够查看成绩明细，那么可以参见此方法

1. 打开开发人员工具（快捷键F12）

2. 选择控制台选项并切换上下文为`lnqblfra`

   ![4](https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701101521.png)

3. 复制粘贴以下代码并**回车**

   `showModalDialog = url => {open(url)}`

   ![image-20210701101555795](https://gitee.com/Hami-Lemon/image-repo/raw/master/images/2021/07/01/20210701101555.png)

如果你具备一点`JavaScript`的知识，你会上述方法只是重写`showModalDialog`函数，事实也确实如此，此函数在大部分浏览器中已被废弃（详见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showModalDialog)），但IE没有，这也是为什么在IE浏览器中不会出现问题。你也可以顺着这个问题得出其它解决方案。

## 参与开发

如果你有好的想法，欢迎提交issues和PR

1. fork本仓库

2. clone代码到本地

   master作为发布分支，dev分支则为开发分支，如需获取最新代码请克隆dev分支

   ```bash
   git clone -b dev git@github.com:xxxxx/SwpuEducationEnhance.git
   cd SwpuEducationEnhance
   ```

3. 创建PR（请提交到dev分支上）

