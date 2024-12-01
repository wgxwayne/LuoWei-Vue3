<!-- HTML部分 -->
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
        { name: '在线ASCII码表', description: '查看和转换ASCII码', link: 'https://fly63.com/tool/ascii' },
        { name: '工具四', description: '工具四的描述', link: 'https://example4.com' },
        { name: '工具五', description: '工具五的描述', link: 'https://example4.com' },
        // 你可以继续添加更多的工具
      ]
    };
  },
  computed: {
    // 计算属性，用于根据搜索查询过滤工具
    filteredTools() {
      return this.tools.filter(tool =>
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
}

.search-box:focus {
  border-color: #409EFF; /* 蓝色边框 */
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5); /* 阴影效果 */
}

.search-box::placeholder {
  color: #999; /* 占位符颜色 */
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
  justify-content: space-between; /* 确保卡片之间有空隙且均匀分布 */
  align-items: flex-start; /* 卡片顶部对齐 */
}

.tool-card {
  width: calc(25% - 15px); /* 每个卡片占据容器宽度的25%减去一些边距 */
  margin: 5px; /* 卡片之间的边距 */
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  min-height: 150px; /* 设置卡片最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 内容在卡片内垂直居中 */
  align-items: flex-start; /* 内容靠左对齐 */
  padding: 20px; /* 卡片内边距 */
  background-color: #ffffff; /* 白色背景 */
  border-radius: 15px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.tool-card h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333; /* 标题颜色 */
}

.tool-card p {
  color: #666; /* 描述颜色 */
  font-size: 0.9em; /* 描述字体大小 */
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 阴影效果增强 */
}
</style>