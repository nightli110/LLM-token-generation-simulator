# 开发指南

本文档面向希望参与项目开发或进行自定义修改的开发者。

## 目录

- [环境设置](#环境设置)
- [代码规范](#代码规范)
- [添加新设备数据](#添加新设备数据)
- [添加新模型](#添加新模型)
- [自定义 UI](#自定义-ui)
- [构建和部署](#构建和部署)

---

## 环境设置

### 前置要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 可选：本地 Web 服务器（Python、Node.js 等）

### 开发环境搭建

1. 克隆项目
```bash
git clone <repository-url>
cd LLM-token-generation-simulator
```

2. 启动本地开发服务器（可选但推荐）

使用 Python:
```bash
python -m http.server 8000
```

使用 Node.js (http-server):
```bash
npx http-server -p 8000
```

使用 PHP:
```bash
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

---

## 代码规范

### JavaScript 规范

- 使用 ES6+ 语法
- 变量和函数使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 函数注释使用 JSDoc 格式

```javascript
/**
 * 获取设备的可用模型列表
 * @param {string} deviceValue - 设备标识符
 * @returns {Array<string>} 可用模型名称数组
 */
function getAvailableModels(deviceValue) {
  // 实现
}
```

### HTML/CSS 规范

- 使用 Bootstrap 5 进行样式
- 语义化 HTML 标签
- 响应式设计考虑

---

## 添加新设备数据

### 步骤 1: 准备数据

在 `js/data/benchmarks.js` 中，找到 `benchmarkData` 对象。

### 步骤 2: 添加 Apple Silicon 设备

```javascript
"Apple": {
  "M4_Pro": [  // 新设备名称
    {
      "BW": 250,           // 内存带宽 GB/s
      "GPUCores": 20,      // GPU 核心数
      "Llama2_7B_F16_Processing": 400.0,
      "Llama2_7B_F16_Generation": 25.0,
      "Llama2_7B_Q8_0_Processing": 380.0,
      "Llama2_7B_Q8_0_Generation": 45.0,
      "Llama2_7B_Q4_0_Processing": 375.0,
      "Llama2_7B_Q4_0_Generation": 60.0,
      // 添加更多模型...
      // 没有数据的项设为 null
    }
  ],
  // ...
}
```

### 步骤 3: 添加 NVIDIA GPU 设备

```javascript
"NVIDIA": {
  "5090_32GB": {  // 新设备名称
    "Llama3_8B_Q4_K_M_Generation": 150.0,
    "Llama3_8B_Q4_K_M_Processing": 8000.0,
    "Llama3_8B_F16_Generation": 60.0,
    "Llama3_8B_F16_Processing": 10000.0,
    "Llama3_70B_Q4_K_M_Generation": 25.0,
    "Llama3_70B_Q4_K_M_Processing": 1000.0,
    // 没有数据的项可以省略或设为 null
  },
  // ...
}
```

### 步骤 4: 验证

数据会自动通过 `flattenAppleData()` 函数处理，并暴露为 `window.combinedBenchmarkData`。无需额外代码，UI 会自动显示新设备。

---

## 添加新模型

### 更新基准测试数据

在每个设备条目中添加新模型的数据：

```javascript
{
  // ... 现有数据
  "NewModel_13B_F16_Processing": 500.0,
  "NewModel_13B_F16_Generation": 30.0,
  "NewModel_13B_Q4_K_M_Processing": 450.0,
  "NewModel_13B_Q4_K_M_Generation": 55.0
}
```

### 更新 UI 表格（如需要）

如果要在 `table.html` 中显示新模型，需要添加相应的表格列。

---

## 自定义 UI

### 修改主题颜色

在 `index.html` 的 `<style>` 标签中添加或修改：

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### 修改组件

组件位于 `components/` 目录：

- `navbar.html` - 导航栏
- `footer.html` - 页脚

这些组件通过 `includeHTML()` 函数动态加载。

### 添加新功能

建议的功能扩展点：

1. **导出功能** - 导出基准测试结果为 CSV/JSON
2. **对比模式** - 并排比较多个设备
3. **图表可视化** - 使用 Chart.js 可视化性能数据
4. **历史记录** - 保存用户的模拟历史

---

## 构建和部署

### 静态文件部署

此项目是纯静态网站，可以直接部署到任何静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- 传统 Web 服务器 (Apache, Nginx)

### GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 进入仓库设置 → Pages
3. 选择源分支（通常是 `main`）
4. 保存，几分钟后网站将上线

### 压缩资源（可选优化）

对于生产环境，可以：

```bash
# 压缩 HTML/CSS/JS
# 使用工具如 html-minifier, clean-css, terser
```

### 项目包含的构建工具

项目根目录有 `build.js` 和一些 Python 脚本用于数据处理：

- `table_generator.py` - 生成基准测试表格
- `json_merger.py` - 合并 JSON 数据

---

## 调试技巧

### 浏览器控制台

打开浏览器开发者工具（F12）查看控制台输出。

### 访问数据结构

在控制台中直接检查数据：

```javascript
// 查看所有基准测试数据
console.log(window.combinedBenchmarkData);

// 查看特定设备数据
const device = window.combinedBenchmarkData.find(d => d.device.includes('M2_Ultra'));
console.log(device);
```

### 断点调试

在 `js/main.js` 中使用 `debugger` 语句或浏览器调试器设置断点。

---

## 提交代码规范

提交信息格式：

```
<type>: <subject>

<body>
```

类型：
- `feat` - 新功能
- `fix` - 修复
- `docs` - 文档更新
- `style` - 格式调整
- `refactor` - 重构
- `test` - 测试相关
- `chore` - 构建/工具相关
