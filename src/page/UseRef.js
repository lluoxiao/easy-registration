import { useRef, useState, useCallback, useEffect } from 'react'

function useGetValue(initial) {
  const [value, setValue] = useState(initial)

  // 创建一个 ref，初始值为value 
  const valueRef = useRef(value)
  // 每次value 更新就赋值到ref 
  // 赋值是赋值在ref.current上
  //valueRef.current = value

  // useCallback 缓存函数  减少回调函数对子组件渲染影响
  // 当传递的回调函数无依赖变化的情况下，每次都是返回第一次创建的值，组件渲染减少
  // 相当于就是一个函数返回了ref
  const getValue = useCallback(() => valueRef.current)

  return [
    value,
    setValue,
    getValue
  ]

}

const App = () => {
  const [current, setCurrent, getCurrent] = useGetValue(0)
  const [another, setAnother] = useState(0)

  useEffect(() => {
    setCurrent(() => Math.random())
    console.log(`我可以在不添加依赖项的同时，拿到current的最新值：${getCurrent()}`)
  }, [another])

  return (
    <div onClick={() => setAnother(another + 1)}>
      {current}
    </div>
  )
}

export default App