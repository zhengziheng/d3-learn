// 设定数轴
let dataset = [];

let numDataPoints = 50

let xRange  = Math.random()*1000
let yRange = Math.random()*1000

for (let i = 0; i < numDataPoints; i++) {
  let n1 = Math.floor(Math.random()*xRange)
  let n2 = Math.floor(Math.random()*yRange)

  console.log(n1,n2)
  dataset.push([n1,n2])
}

let  w = 800
let h = 300
let padding = 30

let xScale = d3.scale.linear()
          .domain([0,d3.max(dataset,d=>d[0])])
          .range([padding,w-padding*3])
//相同的方法为y轴创建线性比例尺

let yScale = d3.scale.linear()
                .domain([0,d3.max(dataset,d=>d[1])])
                .range([h-padding,padding])

                // 散点图要创建circle
let svg = d3
.select('body')
.append('svg')
.attr('width',w)
.attr('height',h)
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx',d=>xScale(d[0]))
  .attr('cy',d=>yScale(d[1]))
  .attr('r',d=>Math.sqrt(h-d[1])) //我们把d[1]的值映射为点的面积 然后用公式求半径


svg.selectAll('text').data(dataset).enter().append('text')
.text(d=>d[0]+','+d[1])
.attr({
x:d=>xScale(d[0]),  //文本标签也需要用比例尺处理一下
y:d=>yScale(d[1]),
fill:'red',

})


// 定义x轴
let xAxis = d3.svg.axis() //生成一个坐标

// 要使用数轴，我们需要告诉他基于什么比例尺工作。传入之前 制作的xScale
xAxis.scale(xScale); //定义坐标的比例尺
// 设置标签相对数轴显示在什么地方，默认位置是底部，
xAxis.orient('bottom')  //定义坐标值的位置
xAxis.ticks(5)  //粗略地设置刻度线的数量

// 定义y轴
let yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5)
svg.append('g').attr({
  'class':'axis',
  'transform':`translate(${padding},0)`
}).call(yAxis)

/**
 *  在svg最后添加一个g元素，g元素是一个分组元素  他是不可见的
 * g元素有两大用途：
 * 1.用来包含或者组织其他元素好让代码看起来整齐
 * 2.可以对整个分组应用变换，从而影响到该组中的所有元素（line，rect和circle）的视觉表现
 */


svg.append('g') 
   .attr('class','axis')  //指定axis类
   .attr('transform',`translate(0,${h-padding})`) //平移坐标轴
   .call(xAxis)  //call函数会取得传递过来的元素，然后再把它交给其他函数。这里传递过的的元素是g
  //  接着 call把g元素交给了xAxis函数


  // 连起来写就是这样
  // svg.append('g')
  //   .call(d3.svg.axis().scale(xScale).orient('bottom'))


