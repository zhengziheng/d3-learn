//散点图
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
  [ 220, 88 ]
  ];
let w = 500
let h=100

// 散点图要创建circle
let svg = d3.select('body')
          .append('svg')
          .attr('width',w)
          .attr('height',h)
svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx',d=>d[0])
            .attr('cy',d=>d[1])
            .attr('r',d=>Math.sqrt(h-d[1])) //我们把d[1]的值映射为点的面积 然后用公式求半径


svg.selectAll('text').data(dataset).enter().append('text')
.text(d=>d[0]+','+d[1])
.attr({
  x:d=>d[0],
  y:d=>d[1],
  fill:'red',

})
            
