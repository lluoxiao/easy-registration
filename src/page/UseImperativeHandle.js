import { useRef, useImperativeHandle, forwardRef, useState } from 'react'

// 通过forwardRef包裹组件
// 组件会新增第二参数ref
// 可以将ref直接赋值到当前组件下的element上，也可以达到属性传递的效果
//（比如将ref绑定到input上，则外部组件可以通过ref调用input组件上的一些方法，比如focus、click）
const Child = forwardRef((props, ref) => {

  const [value, setValue] = useState(0)

  // 将ref作为useImperativeHandle的第一参数，简单理解就是把新增的属性绑定到ref上 
  // 第二参数是一个回调，返回值是一个对象，用于自定义暴露给外面能访问的属性  
  // 第三参数是一个依赖项，表示当依赖项里的值发生改变时，重新调用第二参数的回调来刷新暴露的值  
  useImperativeHandle(ref, () => {
    return {
      value
    }
  }, [value])

  return (
    <div onClick={() => setValue(prev => prev + 1)} >set value: {value}</div>
  )

})

const App = () => {
  const ref = useRef()

  const handleClick = () => {
    console.log(`当前子组件的ref状态值是: ${ref.current}`)
    console.log(ref)
    console.log(ref.current)
    console.log(ref.current.value)
  }

  return (
    <div>
      <div onClick={handleClick}>点击获取子组件的状态</div>
      <Child ref={ref} />
    </div>
  )

}


export default App