import { useReducer } from 'react'

// state 为 对应的值  
// action 为 下面dispatch传递的参数，用于识别相应的操作  
// 返回值是新的state值  
function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        count: state.count + 1
      }
    case 'decrease':
      return {
        ...state,
        count: state.count - 1
      }
  }
  return state
}

// 初始值
const initialState = {
  count: 0,
  key: 'key'
}

const App = () => {
  // 第一个参数是 处理state 更新的回调
  // 第二个参数 初始值state  
  // 第三个可选参数，用于处理默认初始值的回调，参数为上面第二个参数，比如像下面的回调这样处理
  /*
  function init(initialState) {
      初始值新增一个extraValue属性  
      return {
        ...initialState,
        extraValue: 0
      }
    }
  */
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count } = state

  const handleClick1 = () => {
    // 触发count + 1
    dispatch({ type: 'increase' })
  }
  const handleClick2 = () => {
    // 触发count - 1
    dispatch({ type: 'decrease' })
  }

  return (
    <div>

      <div onClick={handleClick1}>increase： {count}</div>
      <div onClick={handleClick2}>decrease {count}</div>
    </div>
  )
}
export default App