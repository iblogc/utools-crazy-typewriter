<template>
  <div class="typewriter">
    <div class="preview">
      <div class="preview-header">
        <h3>💬 待输入内容</h3>
        <span class="char-count" :class="{ 'is-typing': isTyping }">
          {{ text.length }} 字符
        </span>
      </div>
      <div class="editor-wrapper" :class="{ 'is-typing': isTyping }">
        <textarea
          v-model="text"
          class="content"
          placeholder="在此输入或粘贴要打字的文本..."
          @input="autoResize"
          ref="textareaRef"
        ></textarea>
      </div>
    </div>
    
    <div class="warning-box">
      <div class="warning-icon">⚠️</div>
      <div class="warning-content">
        <p class="warning-title">友情提示 (๑•̀ㅂ•́)و✧</p>
        <p class="warning-text">
          启动后将进入"疯狂打字模式"，期间请勿移动鼠标或操作键盘，
          否则可能会发生一些神奇的事情...
          本插件概不负责 (´▽｀)ノ♪
        </p>
        <p class="warning-text">全部内容输入完成后会有系统消息提示</p>
        <p class="warning-tip">
          已知存在的问题: 在代码编辑器的代码输入区域执行，受代码编辑器的自动格式化代码机制作用，可能会导致最终内容与原内容不一致。
        </p>
      </div>
    </div>

    <div class="controls">
      <div class="buttons">
        <button 
          class="start"
          :disabled="isTyping || !text"
          @click="startTyping"
        >
          <span class="button-icon">🚀</span>
          <!-- 随机文字：开始冒险 或 启动疯狂打字 -->
          <span class="button-text">{{ randomText }}</span>
        </button>
      </div>
    </div>

    <div class="intro-section">
      <div class="intro-header">
        <h2>
          <span class="intro-icon">💡</span>
          这是什么？
          <!-- <span class="toggle-icon" :class="{ 'is-open': showIntro }">▼</span> -->
        </h2>
      </div>
      <div class="intro-content" v-show="showIntro">
        <div class="intro-card primary">
          <div class="card-icon">🎯</div>
          <div class="card-content">
            <h4>主要目的</h4>
            <p>初始需求是解决 Cursor 聊天框中粘贴大段文本时会被自动识别为附件的问题。通过模拟人工输入，让文本内容始终在输入框中。</p>
          </div>
        </div>
        
        <div class="intro-card">
          <div class="card-icon">✨</div>
          <div class="card-content">
            <h4>更多使用场景</h4>
            <ul>
              <li>在任何不允许粘贴的输入框中输入文本</li>
              <li>模拟人工输入，避免被反爬虫机制拦截</li>
              <li>在一些特殊的在线编辑器中输入内容</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  enterAction: {
    type: Object,
    required: true
  }
})

const text = ref('')
const isTyping = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const randomText = ref('')
const showIntro = ref(true)

onMounted(() => {
  text.value = props.enterAction.payload
  // 初始化时调整高度
  nextTick(() => {
    autoResize()
  })
  randomText.value = Math.random() > 0.5 ? '开始冒险' : '启动疯狂打字'
})

const autoResize = () => {
  if (textareaRef.value) {
    // textareaRef.value.style.height = 'auto'
    // textareaRef.value.style.height = '200px'
  }
}

const startTyping = () => {
  isTyping.value = true
  return new Promise<void>((resolve, reject) => {
    window.preload.typewriter.startTyping(text.value)
      .then(() => {
        window.utools.showNotification("输入完成")
        isTyping.value = false
        resolve()
      })
      .catch(reject)
  })
}

const toggleIntro = () => {
  showIntro.value = !showIntro.value
}

</script>

<style scoped>
.typewriter {
  padding: 32px;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-radius: 20px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 15px rgba(0, 0, 0, 0.03);
}

.intro-section {
  margin: 10px 0 32px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.intro-header {
  padding: 20px;
  cursor: pointer;
  user-select: none;
}

.intro-header h2 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.intro-icon {
  font-size: 24px;
}

.toggle-icon {
  margin-left: auto;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.toggle-icon.is-open {
  transform: rotate(180deg);
}

.intro-content {
  padding: 0 20px 20px;
}

.intro-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: #f8fafc;
  transition: transform 0.3s ease;
}

.intro-card:hover {
  transform: translateX(4px);
}

.intro-card.primary {
  background: #ecfdf5;
}

.intro-card.tips {
  background: #fff7ed;
}

.card-icon {
  font-size: 24px;
  line-height: 1;
}

.card-content {
  flex: 1;
}

.card-content h4 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #2c3e50;
}

.card-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
}

.card-content ul {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
}

.card-content li {
  margin-bottom: 4px;
}

.card-content li:last-child {
  margin-bottom: 0;
}

.preview {
  margin-bottom: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-header h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.char-count {
  font-size: 14px;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.char-count.is-typing {
  color: #3498db;
  font-weight: 500;
}

.editor-wrapper {
  position: relative;
  border-radius: 16px;
  background: #ffffff;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.editor-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
}

.editor-wrapper.is-typing {
  border-color: #3498db;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
}

.content {
  width: 100%;
  min-height: 120px;
  height: 150px;
  padding: 10px;
  border: none;
  border-radius: 16px;
  background: transparent;
  font-size: 15px;
  line-height: 1.6;
  color: #2c3e50;
  resize: none;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.content::placeholder {
  color: #94a3b8;
  opacity: 0.8;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 16px;
}

button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.button-icon {
  font-size: 18px;
}

.warning-box {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff8e6;
  border-radius: 16px;
  border: 2px dashed #ffd666;
  display: flex;
  gap: 20px;
  animation: warning-pulse 2s infinite;
}

@keyframes warning-pulse {
  0% { border-color: #ffd666; }
  50% { border-color: #ffc53d; }
  100% { border-color: #ffd666; }
}

.warning-icon {
  font-size: 24px;
  line-height: 1;
}

.warning-content {
  flex: 1;
}

.warning-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #d48806;
}

.warning-text {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #875800;
}

.warning-tip {
  margin: 0;
  font-size: 13px;
  color: #d48806;
  opacity: 0.8;
}

.start {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border: none;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.start:not(:disabled):hover {
  background: linear-gradient(135deg, #ff8a8e 0%, #f9c0b4 99%, #f9c0b4 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 154, 158, 0.3);
}

.button-icon {
  font-size: 20px;
}

/* 自定义滚动条 */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style> 