# 快速入门指南

本指南帮助你在 5 分钟内开始使用 LLM Token Generation Speed Simulator。

## 5 分钟快速开始

### 1. 打开项目 (30 秒)

直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# Python
python -m http.server 8000

# 然后访问 http://localhost:8000
```

### 2. 选择设备 (1 分钟)

在"Device"下拉菜单中，选择你想测试的设备：

- **Apple 用户**: 选择你的芯片型号（M1、M2、M3 等）
- **NVIDIA 用户**: 选择你的 GPU 型号（3090、4090 等）

> 提示：如果不确定，可以从一个常见设备开始，如 "M2 Pro" 或 "RTX 4090"。

### 3. 选择模型 (1 分钟)

在"Model"下拉菜单中，选择模型和量化级别：

| 模型 | 推荐场景 |
|------|----------|
| Llama3 8B Q4_K_M | 大多数用户的最佳选择 |
| Llama3 8B F16 | 追求最高质量 |
| Llama3 70B Q4_K_M | 有强力硬件，追求智能 |

### 4. 调整参数 (1 分钟)

- **Tokens per second**: 选择生成速度（已根据你的设备/模型自动填充）
- **Total tokens to generate**: 生成多少令牌（100-500 是个好起点）

### 5. 开始模拟 (30 秒)

点击 **"Start"** 按钮，观察令牌生成过程！

---

## 典型使用场景

### 场景 1: 我想买 Mac，应该选哪款？

1. 依次选择 M2、M2 Pro、M2 Max、M2 Ultra
2. 观察 Generation 速度的差异
3. 考虑你愿意为速度提升支付多少溢价

> 参考：对于 Llama3 8B Q4_K_M
> - M2: ~20 tokens/s
> - M2 Pro: ~40 tokens/s
> - M2 Max: ~65 tokens/s
> - M2 Ultra: ~75-90 tokens/s

### 场景 2: 我想跑 70B 大模型

1. 查看哪些设备有 Llama3 70B 的数据
2. 检查 Generation 速度是否可接受（建议 > 10 tokens/s）
3. 验证你的预算是否足够

> 当前能跑 70B 的设备：
> - M1 Max (32 核)、M1 Ultra
> - M2 Max (38 核)、M2 Ultra
> - M3 Max
> - NVIDIA 3090/4090 双显卡
> - NVIDIA RTX A6000/Ada
> - NVIDIA A100

### 场景 3: 量化对速度有多大影响？

1. 选择同一个设备（如 M2 Ultra）
2. 依次选择不同量化级别的同一模型
3. 比较速度差异

| 量化 | 速度 | 质量 |
|------|------|------|
| F16 | 基准 | 最好 |
| Q8_0 | 快 1.5-2x | 几乎相同 |
| Q4_K_M | 快 2-3x | 轻微下降 |

---

## 模拟器功能详解

### 控制面板

| 控件 | 作用 |
|------|------|
| Device | 选择硬件设备 |
| Model | 选择模型和量化 |
| Tokens per second | 调整生成速度 |
| Total tokens | 设置生成总量 |
| Start | 开始模拟 |
| Stop | 停止模拟 |
| Reset | 重置一切 |

### 显示区域

| 区域 | 显示内容 |
|------|----------|
| Generated Tokens | 实际生成的文本 |
| Generation Time | 时间统计 |
| Benchmark Results | 硬件/模型详细信息 |

### 时间说明

- **Elapsed Time**: 实际经过的时间（受浏览器性能影响）
- **Expected Time**: 理论时间 = 总令牌数 / 每秒令牌数

> 注意：Elapsed Time 可能比 Expected Time 长，这是正常的，因为浏览器有渲染开销。

---

## 常见问题

### Q: 这是真实的 LLM 吗？

**A**: 不是。这是一个模拟器，使用预定义文本演示令牌生成的概念。它不进行实际的 AI 计算。

### Q: 为什么我的实际 LLM 运行速度比这里慢？

**A**: 可能的原因：
- 你使用的推理框架效率低于 llama.cpp
- 系统中有其他程序占用资源
- 散热限制导致降频
- 模型加载方式不同

### Q: 数据多久更新一次？

**A**: 项目中的数据是静态的。要获取最新数据，请查看原始来源：
- https://github.com/ggerganov/llama.cpp/discussions/4167

### Q: 我可以添加自己的设备数据吗？

**A**: 可以！请参考 [DEVELOPMENT.md](./DEVELOPMENT.md) 了解如何添加。

### Q: 应该关注 Processing 还是 Generation？

**A**: 对于大多数交互式使用场景，**Generation** 更重要。如果你主要进行批量处理或长文档分析，Processing 也很重要。

### Q: 多少 tokens/s 算"快"？

**A**: 一般来说：
- < 10: 较慢
- 10-30: 可用
- 30-50: 良好
- 50-100: 流畅
- > 100: 非常流畅

---

## 下一步

- 阅读 [README.md](./README.md) 了解项目概览
- 查看 [DATA.md](./DATA.md) 深入了解数据含义
- 查看 [API.md](./API.md) 了解代码结构
- 阅读 [DEVELOPMENT.md](./DEVELOPMENT.md) 参与开发
