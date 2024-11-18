import { useState, useContext, createContext } from 'react'

// 创建全局的状态
const Context = createContext()

const GrandFather = () => {
  const [state, setState] = useState(0)
  const [broState, setBroState] = useState(0)

  // 包裹最外层组件
  return (
    <Context.Provider
      value={{
        state,
        broState
      }}
    >
      {/*这里就不再需要状态透传了*/}
      {/*<Parent state={state} />*/}
      <div onClick={() => setState(state + 1)}>state +1</div>
      <div onClick={() => setBroState(broState + 1)}>broState +1</div>
      <Parent />
    </Context.Provider>
  )
}

const Parent = (props) => {

  // 无须无用状态
  // const { state } = props 
  // const [ broState, setBroState ] = useState(0)

  return (
    <>
      <Son />
      <Brother />
    </>
  )

}

const Son = (props) => {
  // 使用useContext接收全局的状态
  const { state, broState } = useContext(Context)

  return (
    <div>
      <div>state: {state}</div>
      <div>broState: {broState}</div>
    </div>
  )
}

const Brother = (props) => {

  return (
    <div></div>
  )
}
export default GrandFather