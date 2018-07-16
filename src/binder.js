(function(window, browser){
  window.binder = {
    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-12 19:01:21  
     * @Desc:   判断是否是Node节点的绑定属性 
     * @Parm:   {String} attr Node节点的属性 
     */  
    is(attr) {
      return attr.includes('b-')
    },
    
    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-12 19:18:18  
     * @Desc:   判断绑定类型是否是事件类型 
     * @Parm:   {String} type 绑定类型 
     */  
    isEvent(type) {
      return type.includes('on-')
    },
    
    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-12 19:26:39  
     * @Desc:   事件绑定处理(b-on-type)
     * @Parm:   {Object} node Node节点
     *          {Object} vm MVVM实例对象
     *          {String} val 绑定值
     *          {String} type 绑定类型 
     */  
    event(node, vm, val, type) {
      let eventType = type.split('-')[1],
          fn = vm.$options.methods && vm.$options.methods[val]

      if(eventType && fn) {
        browser.event.add(node, eventType, fn.bind(vm))    
      }
    },
    
    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-12 20:14:04  
     * @Desc:   值绑定处理(b-value)
     * @Parm:   {Object} node Node节点
     *          {Object} vm MVVM实例对象
     *          {String} val 绑定值
     */  
    value(node, vm, val) {
      this.bind(node, vm, val, 'value')
    },
    

    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-15 14:23:30  
     * @Desc:   文本值绑定处理(b-text或{{}}模板)
     * @Parm:   {Object} node Node节点
     *          {Object} vm MVVM实例对象
     *          {String} val 绑定值
     */ 
    text(node, vm, val) {
      this.bind(node, vm, val, 'text')
    },


    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-16 08:56:35  
     * @Desc:   html文本处理(b-html) 
     * @Parm:   {Object} node Node节点
     *          {Object} vm MVVM实例对象
     *          {String} val 绑定值
     */    
    html(node, vm, val) {
      this.bind(node, vm, val, 'html')
    },

    /** 
     * @Author: zhuxiankang 
     * @Date:   2018-07-12 20:17:12  
     * @Desc:   绑定处理(b-) 
     * @Parm:   {Object} node Node节点
     *          {Object} vm MVVM实例对象
     *          {String} val 绑定值 
     *          {String} type 绑定类型 
     */  
    bind(node, vm, val, type) {
      let update = this.update[type]
      update && update(node, vm.getDataValue(val))
    },
  
  
    update: {
      /** 
       * @Author: zhuxiankang 
       * @Date:   2018-07-15 11:01:38  
       * @Desc:   值绑定更新(b-value)
       * @Parm:   {Object} node Node节点
       *          {String} val 绑定值 
       */  
      value(node, val) {
        node.value = val || ''
      },
      

      /** 
       * @Author: zhuxiankang 
       * @Date:   2018-07-15 11:01:38  
       * @Desc:   文本值绑定更新(b-text或{{}}模板)
       * @Parm:   {Object} node Node节点
       *          {String} val 绑定值 
       */ 
      text(node, val) {
        node.textContent = val || ''
      },

      /** 
       * @Author: zhuxiankang 
       * @Date:   2018-07-16 08:59:32  
       * @Desc:   html文本更新(b-html)  
       * @Parm:   {Object} node Node节点
       *          {String} val 绑定值   
       */      
      html(node, val) {
        node.innerHTML = val || ''
      }
    }
  }
})(window, browser)



