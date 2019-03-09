// 比例尺
// 值域和范围
/**
 * 比例尺的输入值域 指可能的输入值的范围。比如数据范围在【100，500】
 * 比例尺的输出范围 指输出值可能的范围，一般以用于显示的像素为单位。比如最小10像素，最高为350像素
 * 然后我们把值域【100，500】映射到【10，350】上
 * 输入——值域，输出——范围
 * 
 * 对于线性比例尺，D3可以帮我们处理归一化过程中的数学计算：输入值根据值域先进行归一化，
 * 然后再把归一化之后的值对应到输出范围。
 */

//  d3.scale()比例尺函数生成器 后面可以声明比例尺的创建类型

 //创建线性比例尺

 let scale = d3.scale.linear()
 .domain([100,500]) //设置比例尺的值域 需要调用domain()方法，将值域以数组的形式传给他
 .range([10,350])//设定输出范围

//  比例尺已经准备就绪
// scale(100) //10
// scale(300) //180
// scale(500) //350


//缩放之前的散点图
let dataset = [
  [ 5, 20 ],
  [ 480, 90 ],
  [ 250, 50 ],
  [ 100, 33 ],
  [ 330, 95 ],
  [ 410, 12 ],
  [ 475, 44 ],
  [ 25, 67 ],
  [ 85, 21 ],
  [ 220, 88 ],
  [600, 150]
  ];
let w = 800   //因为我们设置了x和y的线性比例尺，以后这个svg元素的宽和高的变化，里面的元素都也会跟着动态变化，可以实现响应式。
let h=300

// 边距变量 边距可以把svg图往里面推 原理svg的四边，避免被裁掉
let padding = 20;


//可以从值域里面选出最大值  返回480 第二个箭头函数式一个存取器函数，告诉max 想比较那个值
// 我们想要比较数组中每个元素的x值索引为0的元素  
// d3.max(dataset,d=>d[0]) 
let xScale = d3.scale.linear()
          .domain([0,d3.max(dataset,d=>d[0])])
          .range([padding,w-padding*3])
//相同的方法为y轴创建线性比例尺

let yScale = d3.scale.linear()
                .domain([0,d3.max(dataset,d=>d[1])])
                .range([padding,h-padding])

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


         