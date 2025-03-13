// 逐字输入功能
let isTyping = false

// 通过 window.preload 对象向渲染进程注入功能
window.preload = {
  // 基础服务
  services: {},
  
  typewriter: {
      startTyping: async (text) => {
        if(isTyping) return
        isTyping = true
        try {
          console.log(text)
          const replacedText = text.replace(/\r\n|\r|\n/g, '\n');
          console.log(replacedText)
          window.utools.hideMainWindowTypeString(replacedText)
        } finally {
          isTyping = false
        }
      },
      
      // 停止输入
      stopTyping: () => {
        isTyping = false
      }
  }
}

// 为了兼容性,同时也导出到window.exports
window.exports = window.preload
