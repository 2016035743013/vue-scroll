# scrollbar

> 运行本工程

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

###滚动条使用文档

###安装
        npm install cjhcj-scroll --save

###特别说明
        使用该组件时，该组件的上级容器必须设置一定的高度，否则无法显示滚动条
###使用方法
        <div>
            <ScrollBar :scrollStyle="scrollStyle">
                <ul>
                    <li v-for="(item, index) in arr" :key="index">{{index}}item</li>
                </ul>
            </ScrollBar>
        </div>
        该组件是需要有开始标签和结束标签包裹需要滚动的内容，而且切记该组件所处的容器
        是有一定的高度的
###参数说明
        该组件值传入一个scrollStyle参数来设置滚动条的样式，该参数的格式
        需要是以下的写法：
        scrollStyle: {
            rail: {
                background: "white",
            },
            bar: {
                background: "green",
            }
        }  
        scrollStyle是一个对象，里面的值只有 rail 和 bar，rail用于设置滚动条轨道
        的样式，rail用于设置滚动条的样式
        rail 和 bar 样式的设置与css的写法相同
        若要设置rail或者bar隐藏掉，请设置 **background: rgba(0,0,0,0)**来让滚动条进行隐藏

