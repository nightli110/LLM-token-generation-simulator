# LLM Token Generation Speed Simulator

LLM 令牌生成速度模拟器，用于比较不同硬件设备和模型配置下的 LLM 推理性能。

## 项目简介

这是一个交互式 Web 工具，用于模拟和可视化不同硬件配置（Apple Silicon 和 NVIDIA GPU）在运行各种 LLM 模型时的令牌生成速度。通过这个模拟器，用户可以：

- 直观了解不同硬件的 LLM 推理性能差异
- 比较量化对模型速度的影响
- 为本地 LLM 部署做出更明智的硬件选择决策

## 功能特性

- **交互式模拟器**：实时模拟令牌生成过程
- **多设备支持**：
  - Apple Silicon（M1、M1 Pro、M1 Max、M1 Ultra、M2、M2 Pro、M2 Max、M2 Ultra、M3、M3 Pro、M3 Max）
  - NVIDIA GPU（RTX 30/40 系列、A 系列、RTX 专业卡等）
- **多模型支持**：
  - Llama2 7B（F16、Q4_0、Q8_0）
  - Llama3 8B（F16、Q4_K_M）
  - Llama3 70B（F16、Q4_K_M）
- **性能基准表格**：完整的处理和生成速度基准测试数据
- **真实数据**：基于实际 llama.cpp 性能测试数据

## 快速开始

### 直接打开

1. 克隆或下载此项目
2. 在浏览器中打开 `index.html`

### 本地服务器（可选）

如果你想使用本地服务器运行：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server
```

然后在浏览器中访问 `http://localhost:8000`。

## 使用说明

1. 从下拉菜单中选择你的设备
2. 选择 LLM 模型和量化级别
3. （可选）调整令牌生成速度
4. 设置要生成的总令牌数
5. 点击 "Start" 开始模拟
6. 分析结果，了解你的硬件配置的潜在性能

## 项目结构

```
LLM-token-generation-simulator/
├── index.html              # 主页面
├── table.html              # 基准测试表格页面
├── components/
│   ├── navbar.html         # 导航栏组件
│   └── footer.html         # 页脚组件
├── js/
│   ├── main.js             # 主要逻辑
│   ├── include-html.js     # HTML 包含工具
│   └── data/
│       ├── benchmarks.js   # 基准测试数据
│       └── sample-text.js  # 示例文本
├── articles/               # 相关文章
└── doc/                    # 项目文档
```

## 数据来源

本项目使用的基准测试数据来源：

- [llama.cpp 各种设备性能讨论](https://github.com/ggerganov/llama.cpp/discussions/4167) by ggerganov
- [LLM 推理的 GPU 基准测试](https://github.com/XiongjieDai/GPU-Benchmarks-on-LLM-Inference) by XiongjieDai

## 注意事项

这是一个模拟工具，用于教育目的，帮助可视化令牌生成速度。它不代表真实的语言模型性能，真实性能涉及复杂计算，会因模型大小和硬件的不同而有很大差异。

## 许可证

请查看项目根目录的许可证文件。
