<template>
  <div class="tool-page">
    <!-- 搜索框 -->
    <div class="search-section">
      <el-input
          v-model="searchQuery"
          placeholder="搜索工具名称"
          class="search-box"
          clearable
      />
    </div>

    <!-- 工具卡片容器 -->
    <div class="tool-container">
      <!-- 工具类卡片 -->
      <h2>工具类</h2>
      <div class="card-row">
        <el-card
            v-for="tool in filteredTools"
            :key="tool.name"
            class="tool-card"
            @click.native="navigateTo(tool.link)"
        >
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
        </el-card>
      </div>

      <!-- 学习类卡片 -->
      <h2>学习教程类</h2>
      <div class="card-row">
        <el-card
            v-for="learningTool in filteredLearningTools"
            :key="learningTool.name"
            class="tool-card"
            @click.native="navigateTo(learningTool.link)"
        >
          <h3>{{ learningTool.name }}</h3>
          <p>{{ learningTool.description }}</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // 搜索框的输入内容
      tools: [
        { name: 'Json转换工具', description: '将JSON数据进行转换和格式化', link: 'https://www.json.cn' },
        { name: 'SQL压缩/格式化', description: '压缩和格式化SQL语句', link: 'https://www.zxgj.cn/g/sqlformat' },
        { name: '在线ASCII码表查看', description: '在线ASCII码表查看', link: 'https://fly63.com/tool/ascii' },
        { name: 'BASE64加解密工具', description: 'BASE64加解密工具', link: 'https://base64.supfree.net/' },
        { name: '在线文本对比', description: '在线文本对比', link: 'https://fly63.com/tool/textdiff/' },
        { name: 'ASCII编码解码', description: '本工具主要用于代码中的本地字符的Unicode转换，可以解决编程中遇到的乱码问题。', link: 'https://www.matools.com/code-convert-ascii' },
        { name: 'ElementUI表单生成器', description: 'ElementUI第三方表单生成器', link: 'https://tools.bqrdh.com/form-generator/#/' },
        { name: 'ElementUI官方表单', description: 'ElementUI官方表单', link: 'https://element.eleme.cn/#/zh-CN/component/select' },
        { name: '进制转换工具', description: '进制转换工具提供二进制、八进制、十进制和十六进制之间的任意互转。', link: 'https://www.zxgj.cn/g/jinzhi'},
        { name: 'md5加密', description: '本工具提供md5在线加密，md5加密理论上是一种不可逆的加密算法。', link: 'https://www.zxgj.cn/g/md5'}
        // 你可以继续添加更多的工具
      ],
      learningGuide: [
        { name: 'Vue.js 教程', description: 'Vue.js 官方文档', link: 'https://vuejs.org/v2/guide/' },
        { name: 'JavaScript 教程', description: 'JavaScript 教程', link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide' },
        { name: 'React 教程', description: 'React 官方文档', link: 'https://reactjs.org/docs/getting-started.html' },
        // 你可以继续添加更多的学习资源
      ]
    };
  },
  computed: {
    // 计算属性，用于根据搜索查询过滤工具
    filteredTools() {
      return this.tools.filter(tool =>
          tool.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredLearningTools() {
      return this.learningGuide.filter(tool =>
          tool.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    // 方法，用于在新页面打开链接
    navigateTo(link) {
      window.open(link, '_blank');
    }
  }
};
</script>

<style scoped>
.tool-page {
  padding: 20px;
  text-align: center; /* 使搜索框居中 */
}

.search-section {
  margin-bottom: 20px;
}

.search-box {
  width: 60%; /* 设置搜索框宽度为容器的60%，可以根据需要调整 */
  max-width: 600px; /* 最大宽度限制 */
  height: 60px;
  background: #f0f0f0; /* 浅灰色背景 */
  border: 2px solid #ddd; /* 浅灰色边框 */
  border-radius: 30px; /* 圆角 */
  padding: 0 20px;
  color: #333; /* 文字颜色 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-size: 1.0em !important; /* 增加字体大小 */
}

.search-box:focus {
  border-color: #409EFF; /* 蓝色边框 */
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5); /* 阴影效果 */
}

/* 使用深度选择器 */
.search-box >>> .el-input__inner {
  background: transparent !important;
  border: none !important;
  color: #333 !important;
  padding-left: 20px !important;
  height: 100%; /* 使输入框内部元素高度与父元素相同 */
  line-height: 60px; /* 设置行高与父元素高度相同 */
  box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
  font-size: 1.2em !important; /* 增加字体大小 */
}

/* 使用深度选择器 */
.search-box >>> .el-input__inner::placeholder {
  color: #999 !important; /* 占位符颜色 */
  font-size: 1.0em !important; /* 增加字体大小 */
}

.el-input__inner {
  background: transparent !important;
  border: none !important;
  color: #333 !important;
  padding-left: 20px !important;
}

.el-input__suffix {
  right: 15px !important;
}

.el-input__suffix .el-input__clear {
  color: #999 !important;
  font-size: 18px !important;
}

.tool-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 居中对齐 */
  align-items: flex-start; /* 卡片顶部对齐 */
  flex-direction: column; /* 确保标题和卡片垂直排列 */
}

.tool-container h2 {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 卡片左对齐 */
  align-items: flex-start; /* 卡片顶部对齐 */
  width: 100%;
}

.tool-card {
  width: calc(25% - 15px); /* 每个卡片占据容器宽度的25%减去一些边距 */
  margin: 5px; /* 卡片之间的边距 */
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  min-height: 100px; /* 设置卡片最小高度 */
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 内容在卡片内垂直居中 */
  align-items: flex-start; /* 内容靠左对齐 */
  padding: 10px; /* 卡片内边距 */
  background-color: #ffffff; /* 白色背景 */
  border-radius: 15px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.tool-card h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333; /* 标题颜色 */
  text-align: left; /* 明确设置文本对齐方式 */
}

.tool-card p {
  color: #666; /* 描述颜色 */
  font-size: 0.9em; /* 描述字体大小 */
  text-align: left; /* 明确设置文本对齐方式 */
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 阴影效果增强 */
}
</style>
