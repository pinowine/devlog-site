# 游戏开发日志 MDX 编写指南

本文档旨在说明如何在基于 Astro Starlight 框架的本项目中，使用 MDX 语法编写符合自定义规范的、渲染优美的高质量游戏开发日志。

## 一、 Frontmatter 元数据 (YAML)

所有的 `.mdx` 日志文件顶部必须包含 Frontmatter 以进行正确的路由索引和信息展示。除 Starlight 默认属性（如 `title`, `description`）外，本项目还扩展了一些自定义字段：

```yaml
---
title: "日志标题：Godot 平台跳跃原型 #1"
description: 日志内容的简要概述。
father: "template-game" # (可选) 所属父级项目的名称或 ID，用于关联。
lastUpdated: 2025-02-13 # (可选) 最后更新时间。
tags: # (可选) 标签数组，便于索引和展示。
  - design
  - gameplay
  - godot
readTime: "4 min" # (可选) 预估阅读时间。
giscus: true # (可选) 是否开启底部 Giscus 评论区。默认为 false。
---
```

## 二、 自定义渲染组件与语法

本项目利用 `@astrojs/starlight` 及基于 Expressive Code 的引擎，支持极为丰富的定制化 MDX 展示方式。无需手动导入基础组件即可直接在 `mdx` 中使用。

### 1. 旁白与提示块 (Admonitions)

使用冒号语法的提示框，可以高亮警告、目标配置等信息：

```md
:::note[目标]
这是一个信息/目标块的示例，支持内部 **加粗** 等 Markdown 解析。
:::

:::tip[输入映射]
这是一个提示/技巧块。
:::

:::caution[警告]
这是一个需要注意的警告内容。
:::

:::danger[危险]
可能会造成破坏性后果的危险操作提示。
:::
```

如果需要，你也可以选择显式导入 Starlight 的 `Aside` 组件，它是达到相同效果的另一种等价写法：

```mdx
import { Aside } from "@astrojs/starlight/components";

<Aside type="tip">旁白中也可以插入代码块或其它自定义内容。</Aside>
<Aside type="danger">不要将你的密码告诉任何人。</Aside>
```

### 2. 高级代码块与高亮 (Code Blocks)

由于内置了 `expressive-code`，你可以使用许多高级代码指令：

#### 添加标题与行号

```md
`​``gdscript [player.gd] title="player.gd" showLineNumbers
extends CharacterBody2D
`​``
```

_(注意：外层反引号内不需要多余空格即可触发)_

#### 代码行高亮 (指定行)

```md
`​``csharp {9,21-25}
// 第 9 行以及 21 到 25 行将会被高亮
`​``
```

#### 内同行内高亮注释

使用特定注释标识可以实现代码内的行亮操作：

```gdscript
@export var coyote_time := 0.08 # [!code highlight]
@export var jump_buffer := 0.12 // [!code highlight]
# [!code warning] 警告标注示例
```

#### Diff 差异比对块

```md
`​``diff title="将移动与跳跃解耦"

- velocity.x = move_toward(velocity.x, dir _ speed, 1600.0 _ dt)

* velocity.x = approach(velocity.x, dir _ speed, 1600.0 _ dt)
  `​``
```

#### 代码标签组 (多语言实现切换)

遇到相同功能的不同语言实现时，可以使用 `code-group` 将它们合并到选项卡中：

```md
:::code-group

`​``gdscript [Player.gd]
var speed := 220.0
`​``

`​``csharp [Player.cs]
public float Speed = 220f;
`​``

:::
```

### 3. 可折叠详情区 (Details)

使用 `<details>` 以避免篇幅过长的问题：

```mdx
<details>
  <summary>展开：摄像机抖动与跟随原理</summary>
  这里包含更深入的技术细节：先用 <code>Camera2D</code> 的 <code>limit</code>...
</details>
```

### 4. 键盘按键与专属内联样式

配合站点的 CSS 设计规范：

- 使用 `<kbd>Space</kbd>` 来表示按键，例如 <kbd>Coyote Time 控制</kbd>。
- 使用 `<span>` 及行内 `style` 进行关键术语突出：
  ```mdx
  <span style={{ fontWeight: 700, color: "var(--color-accent-600)" }}>
    特别提示：
  </span>
  ```

### 5. 自定义 React/UI 组件（高级用法）

虽然 React 页面级组件 (`<LogEntry />`, `<ProjectCard />`, `<Button />`) 大多用于前端索引页渲染，但如果您想在 `.mdx` 日志中混排呈现其他项目卡片，可直接引入并带参数使用（确保文件内的相对路径引用正确）：

```tsx
import { ProjectCard } from '../../../components/ProjectCard';
import { Button } from '../../../components/Button';

<ProjectCard
  title="PsychoHunger"
  type="game"
  description="原型设计分析"
  date={new Date("2025-04-21")}
  tags={['design', 'gameplay']}
  id="psycho-hunger"
  progress={0.3}
  status="开发中"
/>

<Button label="访问仓库" href="https://github.com/..." />
```

_(注：通常仅在需要展示强相关的外部卡片链接结构时在内文中运用。)_

---

遵循以上语法，您撰写的 MDX 将能够直接与项目渲染引擎协同工作，产生专业且结构化的页面呈现。
