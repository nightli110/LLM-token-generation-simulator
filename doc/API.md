# API 文档

本文档描述项目中主要的 JavaScript 函数和数据结构。

## 目录

- [全局变量](#全局变量)
- [设备选择函数](#设备选择函数)
- [模型选择函数](#模型选择函数)
- [基准测试函数](#基准测试函数)
- [令牌生成函数](#令牌生成函数)
- [数据结构](#数据结构)

---

## 全局变量

### DOM 元素引用

```javascript
const speedInput           // 速度滑块 (range input)
const speedNumber          // 速度数字输入框
const tokenCountInput      // 令牌数量输入框
const startBtn             // 开始按钮
const stopBtn              // 停止按钮
const resetBtn             // 重置按钮
const tokenDisplay         // 令牌显示区域
const tokenCountSpan       // 令牌计数显示
const systemInfo           // 系统信息显示
const chipSelect           // 设备选择下拉框
const benchmarkResults     // 基准测试结果区域
const quantizationSelect   // 模型选择下拉框
const elapsedTimeSpan      // 已用时间显示
const expectedTimeSpan     // 预期时间显示
const tokenCountSlider     // 令牌数量滑块
```

### 状态变量

```javascript
let startTime          // 开始时间戳
let isGenerating       // 是否正在生成中
let generatedTokens    // 已生成的令牌数
let animationFrameId   // requestAnimationFrame ID
let intervalId         // 定时器 ID
```

---

## 设备选择函数

### getAllDevices()

获取所有可用设备列表。

```javascript
function getAllDevices()
```

**返回值**: `Array` - 设备名称数组

**示例**:
```javascript
const devices = getAllDevices();
// 返回: ["Apple|M1 (7 cores)", "Apple|M1 (8 cores)", ..., "NVIDIA|4090_24GB", ...]
```

---

### populateDeviceSelect()

填充设备选择下拉框。

```javascript
function populateDeviceSelect()
```

此函数会清空并重新填充 `chipSelect` 下拉框，显示所有可用设备。

---

## 模型选择函数

### getAvailableModels(deviceValue)

获取指定设备可用的模型列表。

```javascript
function getAvailableModels(deviceValue)
```

**参数**:
- `deviceValue` (string) - 设备值，格式为 "品牌|型号"

**返回值**: `Array` - 可用模型名称数组

**示例**:
```javascript
const models = getAvailableModels("Apple|M2_Ultra (76 cores)");
// 返回: ["Llama2_7B_F16_Processing", "Llama2_7B_Q4_0_Processing", ...]
```

---

### populateModelSelect()

填充模型选择下拉框。

```javascript
function populateModelSelect()
```

根据当前选中的设备，填充 `quantizationSelect` 下拉框。

---

## 基准测试函数

### getBenchmarkData(deviceValue, model)

获取特定设备和模型的基准测试数据。

```javascript
function getBenchmarkData(deviceValue, model)
```

**参数**:
- `deviceValue` (string) - 设备值
- `model` (string) - 模型名称

**返回值**: `Object`
```javascript
{
  GPUCores: number,  // GPU 核心数（Apple 设备）
  BW: number,        // 内存带宽 GB/s（Apple 设备）
  value: number      // 令牌/秒速度
}
```

---

### updateBenchmarkResults()

更新基准测试结果显示区域。

```javascript
function updateBenchmarkResults()
```

根据当前选中的设备和模型，更新页面上的基准测试结果表格。

---

## 令牌生成函数

### startGeneration()

开始令牌生成。

```javascript
function startGeneration()
```

启动模拟过程，初始化计时器和状态。

---

### stopGeneration()

停止令牌生成。

```javascript
function stopGeneration()
```

停止模拟，计算并显示最终时间。

---

### resetSimulation()

重置模拟器。

```javascript
function resetSimulation()
```

停止生成并重置所有状态到初始值。

---

### generateTokens()

生成令牌的主函数。

```javascript
function generateTokens()
```

这是核心函数，使用 `requestAnimationFrame` 和 `setTimeout` 来控制令牌生成速度，确保 UI 更新流畅。

**工作原理**:
1. 计算自开始以来的经过时间
2. 根据设定的 tokens/s 计算应该生成多少令牌
3. 批量生成令牌以赶上预期进度
4. 更新 UI 显示
5. 安排下一帧更新

---

## 数据结构

### benchmarkData

原始基准测试数据结构（在 benchmarks.js 中）。

```javascript
const benchmarkData = {
  "Apple": {
    "M1": [
      {
        "BW": 68,
        "GPUCores": 7,
        "Llama2_7B_F16_Processing": null,
        "Llama2_7B_F16_Generation": null,
        "Llama2_7B_Q8_0_Processing": 108.21,
        "Llama2_7B_Q8_0_Generation": 7.92,
        ...
      }
    ],
    ...
  },
  "NVIDIA": {
    "3070_8GB": {
      "Llama3_8B_Q4_K_M_Generation": 70.94,
      "Llama3_8B_Q4_K_M_Processing": 2283.62,
      ...
    },
    ...
  }
};
```

### combinedBenchmarkData

扁平化后的基准测试数据，全局可用。

```javascript
window.combinedBenchmarkData = [
  {
    device: "Apple|M1 (7 cores)",
    GPUCores: 7,
    BW: 68,
    Llama2_7B_F16_Processing: null,
    Llama2_7B_F16_Generation: null,
    ...
  },
  {
    device: "NVIDIA|4090_24GB",
    Llama3_8B_Q4_K_M_Generation: 127.74,
    Llama3_8B_Q4_K_M_Processing: 6898.71,
    ...
  },
  ...
];
```

### 模型命名约定

模型名称格式: `{模型}_{参数量}_{量化类型}_{测试类型}`

- **模型**: Llama2, Llama3
- **参数量**: 7B, 8B, 70B
- **量化类型**: F16 (全精度), Q4_0, Q8_0, Q4_K_M
- **测试类型**: Processing (处理速度), Generation (生成速度)
