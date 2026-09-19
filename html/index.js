// Placeholder for JavaScript functionality
console.log("JavaScript file loaded");
Vue.component('navbar-component', { // 定义导航栏组件
    template: `
        <div class="navbar"> <!-- 导航栏容器 -->
            <div class="nav-item" v-for="item in navItems" :key="item.id" @click="handleClick(item)">
                {{ item.name }} <!-- 显示导航项的名称 -->
            </div>
        </div>
    `,
    data() { // 组件的数据
        return {
            navItems: [ // 导航项的数据数组
                { id: 1, name: '介绍', action: 'openReadme' }, // 第一项
                { id: 2, name: '使用教程', action: 'playVideo' }, // 第二项
                { id: 3, name: '团队信息', action: 'openWebsite' }, // 第三项
                { id: 4, name: '联系我们', action: 'showEmail' } // 第四项
            ]
        };
    },
    methods: {
        handleClick(item) { // 点击导航项时的处理函数
            switch(item.action) {
                case 'openReadme':
                    // 跳转到展示 README 的页面
                    window.open('./html/readme.html', '_blank'); // 确保你有 readme.html 来展示 readme.md 的内容
                    break;
                case 'playVideo':
                    // 跳转到视频播放页面
                    window.open('./html/vedio.html', '_blank');  // 这里的 tutorial.html 是为播放视频的页面
                    break;
                case 'openWebsite':
                    // 跳转到网站
                    window.open('https://www.cqut.edu.cn/', '_blank'); // 替换成你想跳转的网站地址
                    break;
                case 'showEmail':
                    // 显示个人邮箱
                    this.$emit('update-output', '个人邮箱:pengyixiang@stu.cqut.edu.cn'); // 替换成你的个人邮箱
                    break;
                default:
                    this.$emit('update-output', '未知操作');
            }
        }
    }
});

new Vue({ // 创建 Vue 实例
    el: '#app', // 挂载到 ID 为 app 的元素上
    data: {
        output: '' // 用于存储反馈内容的变量
    },
    methods: {
        updateOutput(feedback) { // 更新反馈内容的方法
            this.output = feedback; // 设置反馈内容
        },
        handleClickOutside(event) { // 处理点击页面其他地方的方法
            const outputArea = this.$refs.outputArea;
            // 判断点击的目标是否不在反馈内容区域以及不是按钮
            if (outputArea && !outputArea.contains(event.target) && !event.target.closest('.button1') && !event.target.closest('.button2') && !event.target.closest('.nav-item')) {
                this.clearOutput(); // 清除反馈内容
            }
        },
        clearOutput() { // 清空反馈内容的方法
            this.output = '';
        }
    },
    mounted() {
        // 在 Vue 实例挂载后添加全局点击事件监听器
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        // 在 Vue 实例销毁前移除全局点击事件监听器
        document.removeEventListener('click', this.handleClickOutside);
    }
});
// 修改 CSS 以调整输出框大小，确保邮箱信息不超出显示框
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    .output {
        max-width: 400px; /* 调整输出框的最大宽度 */
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
        word-wrap: break-word; /* 确保长文本自动换行 */
    }
`;
document.head.appendChild(style);