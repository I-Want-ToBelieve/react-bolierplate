import React, { useRef, useCallback } from 'react'
import { fabric } from 'fabric'
import { Canvas, StaticCanvas } from 'fabric/fabric-impl'

// https://stackoverflow.com/questions/37565041/how-can-i-use-fabric-js-with-react
type returnCallback = (() => any) | undefined | void
interface useFabricProps {
  /**
   * fabric canvas 实例初始化完成时执行的函数, 此函数可以返回一个清理函数, 在组件被销毁时执行
   */
  onChange: (
    canvas: Canvas | StaticCanvas,
    node: HTMLCanvasElement
  ) => returnCallback
  /**
   * 将挂载 fabric canvas 实例, 或者说是 fabric canvas 实例的指针
   */
  fabricCanvas?: React.MutableRefObject<Canvas | StaticCanvas | undefined>
  // http://fabricjs.com/fabric-intro-part-1#interactivity
  /**
   * 是否使用 fabric StaticCanvas 实例
   * @default false
   *
   */
  isStatic?: boolean
}
export const useFabric = ({
  onChange,
  fabricCanvas,
  isStatic = false,
}: useFabricProps) => {
  const fabricRef = useRef<Canvas | StaticCanvas>()
  const disposeRef = useRef<returnCallback>()

  return useCallback(
    (node: HTMLCanvasElement) => {
      if (node) {
        fabricRef.current = isStatic
          ? new fabric.StaticCanvas(node)
          : new fabric.Canvas(node)
        if (fabricCanvas !== undefined) fabricCanvas.current = fabricRef.current
        if (onChange) disposeRef.current = onChange(fabricRef.current, node)
      } else if (fabricRef.current) {
        fabricRef.current.dispose()
        if (disposeRef.current) {
          disposeRef.current()
          disposeRef.current = undefined
        }
      }
    },
    [isStatic, fabricCanvas, onChange]
  )
}

export default useFabric
