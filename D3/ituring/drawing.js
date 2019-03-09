let dataset = [5,10,15,20,25];


//d3 添加div元素
// 给元素加一个html 属性 要使用arrt方法  class id src width alt
// 对于类 有专门的classsed('bar',true||false) 方法设置class值

// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class','bar')
//   .style('height',(d)=>{
//     return d+'px';
//   })
  // 这里添加了dataset.length个div元素，我们可以用attr方法来修改他的class 以改变样式
  //也可以用style 传入回调函数动态修改样式


let dataset2 = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
  24, 18, 25, 9, 3 ];  //一个更加复杂的data

//   d3.select('body').selectAll('div')
//   .data(dataset2)
//   .enter()
//   .append('div')
//   .attr('class','bar')
//   .style('height',(d)=>{
//     return d+'px';
//   })
  // 依然使用上面你的写法，可以得到更多div元素  data方法会对数据进行遍历 然后依次执行后面的每一个方法


  // 绘制svg

    /**
    * selectAll() 会返回对所有圆形的空引用(因为还不存在呢)，而 data() 把数据绑定到即将创建的元素，
    * enter() 返回对这个新元素的占位引用，最后 append() 把圆形添加到 DOM。
    * 在这里，代码会在 SVG 元素的末尾依次追加所有 圆形，因为一开始我们选择的是 svg(而不是原来的 body)。
    */
    let w = 500
    let h = 50
    let svg = d3.select('body').append('svg')
     svg.attr('width',w)
        .attr('height',h)

    let circle = svg.selectAll('circle')  //为了方便以后引用，可以把它存在变量里
       .data(dataset)
       .enter()
       .append('circle')
      
       circle.attr('cx',(d,i)=>(i*50)+25)  //i是dataset中数据的索引
             .attr('cy',h/2)
             .attr('r',d=>d)

  //添加颜色填充（fill）和描边（stroke）
        circle.attr('fill','yellow')
              .attr('stroke','orange')
              .attr('stroke-width',(d)=>d/2)




       


