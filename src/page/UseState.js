import { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react'

const App = () => {
  // 第一个值是state的值，第二个值是修改state的方法
  // 参数是state的初始值，也可以像下面这样支持回调的形式
  const [current, setCurrent] = useState(0)
  const [callbackCurrent, setCallbackCurrent] = useState(() => Math.ceil(Math.random() * 100))

  //对值的缓存，只有当依赖改变时，才会重新计算
  const cacheValue = useMemo(() => {
    return Math.random()
  }, [current])
  // 缓存函数
  const cacheCallback = useCallback(() => {
    console.log('---')
  }, [])

  //回调和直接传值的区别是，直接传值可能会有更新合并的情况，而回调不会出现合并。
  const handleClick = (type) => {
    switch (type) {
      case 'normal':
        // 直接传参改就行 
        setCurrent(current + 1)
        setCurrent(current + 2)
        break
      case 'callback':
        // 回调形式是把上一个值当做参数，回调的返回值即是新的state 
        setCurrent(prev => prev + 1)
        setCurrent(prev => prev + 1)
    }
    //不加break的话将会执行跳转到的case本身以及以下所有的语句
  }

  // 初始化时会自动触发一次回调
  // 传递空的第二参数时，则只有在初始化的时候会触发一次
  // 不传第二个参数依赖项时，则表示每一次刷新都会触发回调
  // 之后会在每次依赖项发生变化时，触发回调 
  // 异步
  // 在render之后执行
  useEffect(() => {
    if (current == 0) {
      setCurrent(current + 1)
    }
    console.log(`current is changed: ${current}`)
  }, [current])


  // 初始化时，模拟数据改变
  // 如果是使用useEffect，会发现有一个current从0到一个随机数的跳闪的过程  
  // 使用此hook则不会发生这样的情况，因为他会先改变了值之后才render  
  // 同步
  // 在dom更新之后执行
  useLayoutEffect(() => {
    if (current == 0) {
      setCurrent(Math.random())
    }
  }, [current])

  return (
    <div>
      <div>current ：{current}</div>
      <div>ccacheValue ：{cacheValue}</div>
      <button onClick={() => handleClick('normal')}>current ++</button>
      <div></div>
      <button onClick={() => handleClick('callback')}>current callback ++</button>
      <div></div>
      <button onClick={() => setCurrent(current + 1)}>++</button>
    </div>
  )
}
export default App