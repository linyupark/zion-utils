import mitt, { Emitter } from 'mitt'
import { useEffect } from 'react'

const useMap = new Map()

interface useEmitterParams {
  emitter?: Emitter
  fns?: {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (...args: any[]) => any | Promise<any>
  }
}

const hooksEmitter = mitt()

const useEmitter = (name?: string, params?: useEmitterParams) => {
  const fns = params?.fns ?? null
  const emitter = params?.emitter ?? hooksEmitter

  const execFn = (fn, name, ...args) => {
    const result = fn(...args)

    if (Object.prototype.toString.call(result).includes('Promise')) {
      result!
        .then((resolve, reject) => {
          emitter.emit(`${name}.resolve`, resolve)
          emitter.emit(`${name}.reject`, reject)
        })
        .catch(e => {
          emitter.emit(`${name}.catch`, e)
        })
    }
    return result
  }

  useEffect(() => {
    if (!name || !fns) return

    useMap.set(name, (useMap.get(name) ?? 0) + 1)

    Object.keys(fns).forEach(k => {
      const eventName = `${name}.${k}`

      emitter.all.set(eventName, [
        (...args) => {
          execFn(fns[k], eventName, ...args)
        },
      ])
    })

    return () => {
      const times = useMap.get(name)

      if (times > 1) {
        return useMap.set(name, times - 1)
      }
      Object.keys(fns).forEach(k => {
        emitter.all.delete(`${name}.${k}`)
      })
    }
  }, [])

  return emitter
}

export default useEmitter
