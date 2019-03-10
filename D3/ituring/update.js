//现实的业务场景中，数据总是在更新的，我们需处理这些更新的数据
// 这些变化通过D3的更新来处理，视觉上的调整以过度额刑事展现，而过度则利用动画这个视觉利器
let aP = document.createElement('p')

aP.innerHTML = '点击 更新柱状图'
document.body.appendChild(aP);


let w = 600
let h = 250

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
//序数比例尺
/**
 * d3.scale.ordinal()有一个优势，他支持范围分档，与定量比例尺返回连续的范围值不同
 * .rangeRoundBands([0,w],0.05) //计算每段条形占多宽，（w-0）/xScale.domain().length 
 *  0.05为5% 也就是说，每段条形之间的间距是宽度的5%
 */
let xScale  = d3.scale.ordinal()
                .domain(d3.range(dataset.length)) //range函数是横撑连续数值的数组， 用来做序数比例尺
                .rangeRoundBands([0,w],0.05) //计算每段条形占多宽，

let yScale = d3.scale.linear()
                     .domain([0,d3.max(dataset)])
                     .range([0,h])

// 创建svg元素
let svg = d3.select('body')
            .append('svg')
            .attr({
              width:w,
              height:h,
            })

// 柱状图
svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr({
     x:(d,i)=>xScale(i),
     y:d=>h-yScale(d),
     width:xScale.rangeBand(),
     height:d=>yScale(d),
     fill:d=>`rgb(0,0,${d*10})`
   })

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d) {
    return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
        return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");


    // 点击更新
  d3.select('p')
  .on('click',()=>{
    dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
      5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];


      svg.selectAll('rect')
      .data(dataset)
      .transition()  //transition方法插入在选择元素之后，改变任何属性之前
      .duration(1000)//  动画持续时间
      .ease('circle')  //circle 逐渐进入并加速 ，然后突然停止  elastic 有弹性的  bounce 像皮球一样反复弹跳，慢慢停下来
      .delay((i)=>i*100) //用于指定过度什么时候开始  ms为单位 可以传入匿名函数
      .attr('y',(d)=>h-yScale(d))
      .attr('height',d=>yScale(d))
  })
