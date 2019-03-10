var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

let w =500
let h = 100
let barPadding = 1

let svg = d3.select('body').append('svg').attr('width',w).attr('height',h)


// svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('x',(d,i)=>i*(w/dataset.length))
//     .attr('y',d=>h-d*4)
//     .attr('width',(w/dataset.length)-barPadding)
//     .attr('height',d=>d)
//     .attr("fill", function(d) {
//       return "rgb(0, 0, " + (d * 10) + ")";
//       });


  // .attr()方法也可以接收一个对象
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr({
      x:(d,i)=>i*(w/dataset.length),
      y:d=>h-(d*4),
      width:(w/dataset.length)-barPadding,
      height:d=>d*4,
      fill:d=>"rgb(0, 0, " + (d * 10) + ")"
    })

  svg.selectAll('text')
     .data(dataset)
     .enter()
     .append('text')
     .text(d=>d)
     .attr({
      x:d=>d,
      y:d=>h-(d*4)+14,
      "font-size":"11px",
      fill:'white',
      "text-anchor":'middle'
     })
  
    

