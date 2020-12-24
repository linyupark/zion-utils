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
          emitter.on(`${name}.resolve`, () => {
            emitter.all.delete(`${name}.resolve`)
          })
          emitter.on(`${name}.reject`, () => {
            emitter.all.delete(`${name}.reject`)
          })
          emitter.emit(`${name}.resolve`, resolve)
          emitter.emit(`${name}.reject`, reject)
        })
        .catch(e => {
          emitter.on(`${name}.catch`, () => {
            emitter.all.delete(`${name}.catch`)
          })
          emitter.emit(`${name}.catch`, e)
        })
    }
    return result
  }

  useEffect(() => {
    if (!name || !fns) return

    Object.keys(fns).forEach(k => {
      const eventName = `${name}.${k}`

      emitter.on(eventName, (...args) => {
        execFn(fns[k], eventName, ...args)
      })
    })

    return () => {
      Object.keys(fns).forEach(k => {
        emitter.all.delete(`${name}.${k}`)
      })
    }
  }, [])

  return emitter
}

export default useEmitter
