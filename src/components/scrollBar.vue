<template>
  <div class="scroll">
    <div class="scroll-volume">
      <div class="scroll-content">
        <slot></slot><!-- 这个是插槽，将本组件导入需要滚动的内容里面，然后用开始标签和结束
        标签包裹要滚动的内容就可以将滚动的内容注入到插槽中，插槽slot这个标签默认是不渲染的 -->
      </div>
    </div>

    <div class="scroll-rail" >  <!-- 滚动条容器 -->
      <div class="scroll-bar"></div> <!-- 滚动条 -->
    </div>
  </div>
</template>
<script>
import util from "./util";
export default {
  name: "scorllBar",
  data() {
    return {
      containerHeight: 0, //滚动条容器的高度
      contentHeight: 0, //滚动内容的高度
      barHeight: 0, //滚动条的高度
      maxScroll: 0, //滚动条滚动的最大距离
    };
  },
  props: ["scrollStyle"],
  watch: {
    scrollStyle(val, oldVal) {
      this.setScrollStyle();
    }
  },
  mounted() {
    this.$(() => {
      // 监听滚动内容的高度改变来重新设置滚动条
      this.barResize();
      this.init();
      // 监听屏幕大小的改变
      this.$(window).resize(() => {
        this.init();
      });
    });
  },
  methods: {
    // 拖动滚动条进行滚动
    scrolling() {
      // 滚动条滚动的思路
      // 当鼠标在滚动条按下的时候立刻获取鼠标距离滚动条定点的距离offsetY和滚动条
      // 距离滚动轨道的top值railY
      // 然后当鼠标拖动滚动时，实时获取鼠标距离页面定点的高度pageY
      // 有pageY - railY - offsetY 就可以得到滚动条滚动的高度了，然后用css就可以进行设置了
      this.$(".scroll-bar").mousedown(event => {
        var offsetY = event.offsetY;
        let railY = this.$(".scroll-rail").offset().top;

        this.$(document).mousemove(event => {
          // console.log(event.offsetY);
          let pageY = event.pageY || event.clientY;
          let scrollHei = pageY - railY - offsetY;

          if (scrollHei <= 0) {
            scrollHei = 0;
          } else if (scrollHei >= this.maxScroll) {
            scrollHei = this.maxScroll;
          }
          this.setScroll(scrollHei);
        });
      });
      this.$(document).mouseup(() => {
        this.$(document).off("mousemove");
      });
    },
    // 点击滚动条轨道触发滚动条滚动
    clickRail() {
      this.$(".scroll-bar").click(event => {
        event.stopPropagation(); //阻止事件冒泡
      });
      this.$(".scroll-rail").click(event => {
        let offsetY = event.offsetY;
        let barScrollHei = offsetY - this.$(".scroll-bar").height() / 2;

        this.setScroll(barScrollHei);
      });
    },
    // 设置页面内容的滚动和滚动条的滚动
    setScroll(scrollHei) {
      this.$(".scroll-bar").css({
        top: scrollHei + "px"
      });

      // 计算内容滚动的高度
      let contentScrollHei =
        (scrollHei * this.contentHeight) / this.containerHeight;

      this.$(".scroll-volume").scrollTop(contentScrollHei); //让包裹内容的容器滚动
    },

    // 监听页面内容鼠标的滚动
    mouseWheelPlay() {
      this.$(".scroll-volume").on("scroll", event => {
        let scrollHei = this.$(".scroll-volume").scrollTop();
        this.contentScrollWithMouse(scrollHei);
      });
    },
    // 页面内容随鼠标滚动
    contentScrollWithMouse(scrollHei) {
      let barScrollHei =
        (scrollHei * this.containerHeight) / this.contentHeight;

      if (barScrollHei <= 0) {
        barScrollHei = 0;
      } else if (barScrollHei >= this.maxScroll) {
        barScrollHei = this.maxScroll;
      }
      this.$(".scroll-bar").css({
        top: barScrollHei + "px"
      });
    },
    // 初始化
    init() {
      this.containerHeight = this.$(".scroll").height();
      this.contentHeight = this.$(".scroll-content").height();
      this.barHeight =
        (this.containerHeight * this.containerHeight) / this.contentHeight;
      this.maxScroll = this.containerHeight - this.barHeight;
      // console.log(this.maxScroll, this.barHeight);

      if (this.maxScroll <= 0) {
        //若没有可以滚动的地方，那就把滚动条隐藏掉
        this.toggleScrollRail = false;
        return;
      } else {
        this.toggleScrollRail = true;
      }
      // 到下一轮事件循环才开始监听事件
      setTimeout(() => {
        this.$(".scroll-bar").css({
          height: this.barHeight + "px"
        });
        // 拖动滚动条的滚动
        this.scrolling();

        // 点击滚动条轨道触发滚动条滚动
        this.clickRail();

        // 监听鼠标的滚动来带动滚动条的滚动
        this.mouseWheelPlay();
        // 设置滚动条的样式
        this.setScrollStyle();
      }, 0);
    },
    // 监听滚动内容的高度改变来重新设置滚动条
    barResize() {
      util.domReize(this.$(".scroll-content")).then(res => {
        // console.log(res);
        this.init();
      });
    },
    // 设置滚动条的样式
    setScrollStyle() {
      let style = this.scrollStyle;
      for (let key in style) {
        this.$(`.scroll-${key}`).css(style[key]);
      }
    }
  },
  
};
</script>
<style scoped>
@import "./ScrollBar.css";
</style>
