# 疯狂打字机 (Crazy Typing)

这是一个 uTools 插件，可以模拟打字机效果，让文字逐个显示出来，适用于演示、教学、制作视频等场景。

## ✨ 功能特点

初始需求是解决 Cursor 聊天框中粘贴大段文本时会被自动识别为附件的问题。通过模拟人工输入，让文本内容始终在输入框中。

- 📝 支持任意文本输入
- 🔄 实时预览打字效果
- 💪 完全集成 uTools 插件体系

## 🛠️ 安装使用

1. 在 uTools 插件市场中搜索"疯狂打字机"
2. 点击安装即可使用
3. 通过 uTools 输入框呼出插件（关键词：打字机、或任何文本匹配）

## 💻 开发相关

本项目使用以下技术栈：

- Vue 3
- Vite
- uTools API

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建插件
npm run build
```

## ⚠️ 注意事项

- 插件退出时会自动清理所有定时器
- 打字过程中不可编辑输入文本
- 建议输入文本不要过长，以免影响性能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](https://mit-license.org/)

---

Made with ❤️ by [iblogc](https://github.com/iblogc)
