# 本机开发环境清单

> 生成时间：2026-08-05
> 用途：记录所有开发工具的安装路径，方便后续查阅，避免重复安装

---

## 总览

| 类别 | 工具 | 版本 | 安装路径 | 已加入 PATH |
|------|------|------|----------|------------|
| Node.js | node-v20.19.0 | v20.19.0 | `C:\Users\lq\tools\node-v20.19.0-win-x64` | ✅ 是（主版本） |
| Node.js | node-v20.16.0 | v20.16.0 | `C:\Users\lq\tools\node-v20.16.0-win-x64` | ❌ 否 |
| Node.js | node-v18.19.0 | v18.19.0 | `C:\Users\lq\tools\node-v18.19.0-win-x64` | ❌ 否 |
| Git | Git | 2.54.0 | `C:\Program Files\Git\cmd\git.exe` | ✅ 是 |
| JDK | Zulu JDK 8 | 8u412 | `C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64` | ✅ JAVA_HOME 已设置 |
| MySQL | MySQL Community | 5.7.44 | `C:\Users\lq\tools\mysql-5.7.44-winx64` | ❌ 否 |
| Redis | Redis | - | `C:\Redis` 和 `C:\Users\lq\tools\redis` | ❌ 否 |
| Maven | Apache Maven | 3.9.16 | `C:\Users\lq\tools\apache-maven-3.9.16` | ❌ 否 |
| WSL | Ubuntu | 24.04 | WSL 子系统 | ✅ `wsl` 命令可用 |
| Python | Miniconda | - | `C:\Users\lq\miniconda3` | ❌ 否 |
| Python | Miniforge | - | `C:\Users\lq\miniforge3` | ❌ 否 |
| Editor | Trae CN | - | `c:\_Dev\Environments\Trae CN` | ✅ 主开发环境 |

---

## 详细说明

### Node.js

**主版本（已加入 PATH，直接用 `node` 命令即可）：**

```
路径: C:\Users\lq\tools\node-v20.19.0-win-x64
node.exe: C:\Users\lq\tools\node-v20.19.0-win-x64\node.exe
npm: C:\Users\lq\tools\node-v20.19.0-win-x64\npm.cmd
版本: v20.19.0 / npm 10.8.2
```

**备用版本：**

```
node-v20.16.0: C:\Users\lq\tools\node-v20.16.0-win-x64\node.exe
node-v18.19.0: C:\Users\lq\tools\node-v18.19.0-win-x64\node.exe
```

**手动切换版本：**
在终端里执行（临时切换，仅当前会话生效）：
```cmd
set PATH=C:\Users\lq\tools\node-v20.16.0-win-x64;%PATH%
```

---

### JDK / Java

```
JAVA_HOME: C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64
JRE:      C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64\jre
java.exe: C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64\bin\java.exe
javac.exe: C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64\bin\javac.exe
版本:     Zulu 8u412 (Java 8)
```

**如果需要 Java 11 或 Java 17：** 建议后续在 `C:\Users\lq\tools\` 下解压对应版本，然后修改 `JAVA_HOME` 环境变量指向新版本。

---

### MySQL

```
安装路径: C:\Users\lq\tools\mysql-5.7.44-winx64
版本:     5.7.44 (Ver 14.14 Distrib 5.7.44, for Win64 x86_64)

bin 目录: C:\Users\lq\tools\mysql-5.7.44-winx64\bin
常用命令:
  mysql.exe      - 客户端连接
  mysqld.exe     - 服务端（需单独启动）
  mysqldump.exe  - 导出数据
  mysqladmin.exe - 管理工具
```

**启动 MySQL 服务端（如果未运行）：**
```cmd
C:\Users\lq\tools\mysql-5.7.44-winx64\bin\mysqld.exe --console
```

**连接 MySQL：**
```cmd
C:\Users\lq\tools\mysql-5.7.44-winx64\bin\mysql.exe -u root -p
```

**注册为 Windows 服务（只需执行一次）：**
```cmd
C:\Users\lq\tools\mysql-5.7.44-winx64\bin\mysqld.exe --install MySQL57 --defaults-file="C:\Users\lq\tools\mysql-5.7.44-winx64\my.ini"
```

---

### Redis

两个位置有 Redis，功能相同，任选其一：

```
位置 1: C:\Redis
位置 2: C:\Users\lq\tools\redis

启动 Redis 服务端：
  C:\Redis\redis-server.exe
  或
  C:\Users\lq\tools\redis\redis-server.exe

连接 Redis 客户端：
  C:\Redis\redis-cli.exe
```

---

### Maven

```
安装路径: C:\Users\lq\tools\apache-maven-3.9.16
版本:     3.9.16

bin 目录: C:\Users\lq\tools\apache-maven-3.9.16\bin
mvn.cmd:  C:\Users\lq\tools\apache-maven-3.9.16\bin\mvn.cmd
```

**使用前需确保 JAVA_HOME 已设置。临时添加到 PATH：**
```cmd
set PATH=C:\Users\lq\tools\apache-maven-3.9.16\bin;%PATH%
```

**永久添加到 PATH：** 系统环境变量 → 用户变量 → Path → 新建：`C:\Users\lq\tools\apache-maven-3.9.16\bin`

---

### WSL (Windows Subsystem for Linux)

```
已安装发行版: Ubuntu-24.04
启动方式:
  wsl                    （进入默认发行版）
  wsl -d Ubuntu-24.04    （指定发行版）
  wsl -l -v              （查看所有发行版）
```

**WSL 访问 Windows 文件：** 在 WSL 内用 `/mnt/c/` 即可访问 C 盘

**Windows 访问 WSL 文件：**
```
\\wsl$\Ubuntu-24.04\home\用户名
```

---

### Python

```
Miniconda: C:\Users\lq\miniconda3
  python.exe: C:\Users\lq\miniconda3\python.exe
  conda.exe:  C:\Users\lq\miniconda3\condabin\conda.bat

Miniforge:  C:\Users\lq\miniforge3
  python.exe: C:\Users\lq\miniforge3\python.exe
```

**使用 Miniconda Python：**
```cmd
C:\Users\lq\miniconda3\python.exe --version
C:\Users\lq\miniconda3\python.exe
```

---

### Git

```
安装路径: C:\Program Files\Git
版本:     2.54.0.windows.1

常用命令（已在 PATH）：
  git --version
  git config --global user.name "你的名字"
  git config --global user.email "你的邮箱"
```

**Git 相关配置文件位置：**
- 用户配置：`C:\Users\lq\.gitconfig`
- SSH Key：`C:\Users\lq\.ssh\`（如果存在）

---

### 个人工具目录

所有第三方开发工具统一存放在：

```
C:\Users\lq\tools\
├── apache-maven-3.9.16\
├── jdk8\
├── mysql-5.7.44-winx64\
├── node-v18.19.0-win-x64\
├── node-v20.16.0-win-x64\
├── node-v20.19.0-win-x64\
├── Redis\
└── zulu8.78.0.19-ca-jdk8.0.412-win_x64\
```

---

## 环境变量当前状态

| 变量 | 值 |
|------|----|
| `JAVA_HOME` | `C:\Users\lq\tools\zulu8.78.0.19-ca-jdk8.0.412-win_x64` |
| `Path`（用户） | 已包含 `C:\Users\lq\tools\node-v20.19.0-win-x64` |

**查看/修改环境变量：**
- 图形界面：`Win + S` → 搜索「环境变量」→「编辑系统环境变量」→「环境变量」
- 命令行查看：`echo %变量名%` （CMD）或 `$env:变量名` （PowerShell）

---

## 快速启动命令速查

```cmd
:: === Node.js 项目 ===
cd 项目目录
npm install
npm start

:: === MySQL ===
:: 启动（已注册服务的话用 net start）
net start MySQL57
:: 连接
C:\Users\lq\tools\mysql-5.7.44-winx64\bin\mysql.exe -u root -p

:: === Redis ===
C:\Redis\redis-server.exe

:: === WSL ===
wsl

:: === Python (Miniconda) ===
C:\Users\lq\miniconda3\python.exe
```

---

## 安装新工具建议

所有新工具建议统一安装到 `C:\Users\lq\tools\` 目录下，保持整洁。

安装后如果希望全局使用，需要：
1. 把工具的 `bin` 目录加入系统 `Path` 环境变量
2. 关闭并重新打开终端让 PATH 生效