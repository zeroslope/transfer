[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-emotion)

# Example app with [emotion](https://github.com/tkh44/emotion)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example with-emotion with-emotion-app
# or
yarn create next-app --example with-emotion with-emotion-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-emotion
cd with-emotion
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

This example features how to use [emotion](https://github.com/tkh44/emotion) as the styling solution instead of [styled-jsx](https://github.com/zeit/styled-jsx).

We are creating three `div` elements with custom styles being shared across the elements. The styles includes the use of pseedo-selector and CSS animations.


This is based off the with-glamorous example.

## 技术栈及其选择原因

最终选择了next.js，其服务端渲染配置比较简单，采用文件路径作为路由，降低了开发难度，同时也能够导出静态页面。服务端渲染对于SPA(Single Page Application)的优势就是首屏加载速度快，对SEO(Search Engine Optimization)比较友好。

动画即不同状态之间进行过渡的过程，比如一个图片在x轴的位置从0到100，最直接的变换就是上一帧是0，下一帧就是100，这样就是一闪而过，很生硬；稍微进阶的就是利用一个函数$f(t)$和一个时间$T$，对其中的任何一个时间t，$f(t/T) = [0, 1] * (100 - 0)$

## 问题

某些东西的兼容性，比如
IOS的滚动效果 overflow-scroll: touch

antd 组件 css的引入问题 各种冲突

## Cordova

在使用Cordova时，由于导出的文件需要存放在服务器上，具体原因是路径问题，所以在生成的APP中不能正确运行，尝试过Cordova的插件cordova-plugin-local-webserver，并不能解决问题，于是选择新的解决方法。采用了\href{Hbuilder X}{http://www.dcloud.io/hbuilderx.html}来构建，

## 问题
fixed属性在IOS中不能正确的显示，https://blog.csdn.net/grsghh/article/details/61416953，某些网站比如CSDN仍然存在这种问题，并没有一个好的解决办法。在安卓上可以正确的运行。