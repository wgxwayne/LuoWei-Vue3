<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" :rules="rules">
      <el-form-item label="设备类型" prop="equipmentType" required>
        <el-select v-model="queryParams.equipmentType" placeholder="请选择设备类型" clearable style="width: 200px">
          <el-option
              v-for="dict in shn_equipment_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
        <span style="margin-left: 10px; color: red; font-size: 12px;">当前仅支持佛山输送线报文解码</span>
      </el-form-item>
    </el-form>

    <!-- 文本输入框-->
    <div class="code-input-container">
      <el-form-item prop="inputCode">
        <el-input
            v-model="queryParams.inputCode"
            type="textarea"
            :rows="6"
            placeholder="请输入文本" style="width: 100%; font-size: 16px;"
        />
      </el-form-item>
      <div style="margin-top: 10px; margin-bottom: 10px; color: #999; font-size: 14px;">
        解码输入示例(注意: 必须为16进制,空格可有可无): FF FF 00 10 00 26 00 01 00 01 00 06 00 02 00 21  <br>
        编码输入示例(Json格式):  暂不支持此功能
      </div>
    </div>


    <!-- 搜索和重置按钮 -->
    <div class="button-container">
      <el-button type="primary" icon="Key" @click="executeDecode" :disabled="isDecoding">解码</el-button>
      <el-button type="primary" icon="Unlock" @click="executeEncode" :disabled="isEncoding">编码</el-button>
      <el-button icon="Refresh" @click="resetQuery">重置</el-button>
    </div>

    <!-- 文本输出框-->
    <div class="code-output-container">
      <el-form-item>
        <el-input
            v-model="outputResult"
            type="textarea"
            :rows="6"
            placeholder="结果展示"
            style="width: 100%; font-size: 16px;"
            disabled
        />
      </el-form-item>
    </div>
<!--    <el-divider class="divider-with-margin">历史记录</el-divider>-->

<!--    &lt;!&ndash; 搜索和重置按钮 &ndash;&gt;-->
<!--    <div class="button-container">-->
<!--      <el-button type="primary" icon="Search" @click="handleQuery">查询历史执行记录</el-button>-->
<!--    </div>-->

<!--    <el-table-->
<!--        v-loading="loading"-->
<!--        :data="onlineList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"-->
<!--        style="width: 100%;"-->
<!--    >-->
<!--      <el-table-column label="序号" width="50" type="index" align="center">-->
<!--        <template #default="scope">-->
<!--          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="输入" align="center" prop="tokenId" :show-overflow-tooltip="true" />-->
<!--      <el-table-column label="输出" align="center" prop="userName" :show-overflow-tooltip="true" />-->
<!--      <el-table-column label="执行时间" align="center" prop="loginTime"  class-name="small-padding fixed-width">-->
<!--        <template #default="scope">-->
<!--          <span>{{ parseTime(scope.row.loginTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    <pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" />-->
  </div>
</template>

<script setup name="Online">
import { forceLogout, list as initData } from "@/api/monitor/online";
import { decodeExecute, encodeExecute, listHistoryData} from "@/api/tool/telegramcode";

const { proxy } = getCurrentInstance();

const { shn_equipment_type } = proxy.useDict("shn_equipment_type");
const onlineList = ref([]);
const loading = ref(true);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const inputCode = ref('');
const outputResult = ref(''); // 确保 outputResult 被定义

const queryParams = ref({
  equipmentType: undefined,
  inputCode: undefined,
});

const rules = ref({
  equipmentType: [
    { required: true, message: '请选择设备类型', trigger: 'change' }
  ]
});

// 添加状态变量
const isDecoding = ref(false);
const isEncoding = ref(false);

/** 查询登录日志列表 */
function getList() {
  loading.value = true;
  initData(queryParams.value).then(response => {
    onlineList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  pageNum.value = 1;
  getList();
}

/** 解码按钮操作 */
function executeDecode() {
  proxy.$refs.queryRef.validate((valid) => {
    if (valid) {
      queryParams.value.inputCode = queryParams.value.inputCode.trim()
      outputResult.value = '';
      isDecoding.value = true; // 设置解码状态为进行中
      setTimeout(() => {
        isDecoding.value = false; // 1秒后重置状态
      }, 1000);
      decodeExecute(
          queryParams.value
      ).then(response => {
        outputResult.value = response.outputResult;
      });
    } else {
      console.log('验证失败');
    }
  });
}


/** 编码按钮操作 */
function executeEncode() {

  proxy.$refs.queryRef.validate((valid) => {
    if (valid) {
      queryParams.value.inputCode = queryParams.value.inputCode.trim()
      outputResult.value = '';
      isEncoding.value = true; // 设置编码状态为进行中
      setTimeout(() => {
        isEncoding.value = false; // 1秒后重置状态
      }, 1000);
      encodeExecute(
          queryParams.value
      ).then(response => {
        outputResult.value = response.data.outputResult;
      });
    } else {
      console.log('验证失败');
    }
  });

}



/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef"); // 重置表单
  queryParams.value = {
    ipaddr: undefined,
    userName: undefined,
    equipmentType: undefined,
    inputCode: undefined,
  };
  outputResult.value = '';
  inputCode.value = '';// 清空输出框
  handleQuery();
}

getList();

</script>


<style scoped>

.divider-with-margin {
  margin-top: 50px; /* 上方间距 */
  margin-bottom: 50px; /* 下方间距 */
}

.button-container {
  display: flex;
  justify-content: flex-start; /* 根据需要调整对齐方式 */
  margin-bottom: 20px; /* 添加底部间距 */
}

.button-container .el-button {
  margin-right: 10px; /* 按钮之间的间距 */
}

.bold-border {
  border: 1.2px solid #000; /* 加粗边框，颜色可以根据需要调整 */
}
</style>