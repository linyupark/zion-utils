import mitt, { Emitter } from 'mitt'
import { useEffect } from 'react'

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
    const pushedFns = []

    Object.keys(fns).forEach(k => {
      const eventName = `${name}.${k}`
      const fn = (...args) => {
        execFn(fns[k], eventName, ...args)
      }

      pushedFns.push(fn)
      emitter.on(eventName, fn)
    })

    return () => {
      Object.keys(fns).forEach((k, i) => {
        emitter.off(`${name}.${k}`, pushedFns[i])
      })
    }
  }, [])

  return emitter
}

export default useEmitter
