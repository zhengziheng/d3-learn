// 链式调用最简单的实现方法，就是返回this
    // d3.select('body').append('p').text('new paragraph');
    //如何实现数据的绑定——1需要数据、2需要dom元素

    let dataset = [5,10,15,20,25];
    

    /**
     * 要创建新的绑定数据的元素，必须使用enter()。这个方法会分析当前选择的dom元素和传递给他的数据，
      如果数据值比dom元素多，就创建一个新的占位元素，然后把这个心占位元素的引用交给链中的下一个方法

      data()是用来绑定数据到选择的DOM元素上.这样以后，就可以针对这些数据做一些相关操作，比如设置元素宽度等。
      从表面上，并不能看出什么变化。但在内部，它是在对应的DOM元素上添加了一个__data__属性，可以通过document.getElementsByTagName("p")[0].__data__看到。
     * */
    d3.select('body').selectAll('p')
      .data(dataset)  //所绑定的数据字段为__data__  一般在后面的函数的回调函数里面获取
      .enter()  //一般enter方法会跟append方法连用 
      .append('p')
      .text(d=>d)   //页面显示 5，10，15，20，25
      // .style('color','red')
      .style('color',(d)=>{
        return d>15?'red':'blue'  //动态添加样式，写在回调函数里面
      })