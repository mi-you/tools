(function () {
  try {
    // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
    // b : There is no window.CustomEvent object
    new window.CustomEvent('T');
  } catch (e) {
    const CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
})();

export const types = {
  MAP_POS: 'map_position',  //地图定位
  MAP_REGION: 'map_region'//地图框选
}
// 向地图派发事件
export const dispatchToMap = (detail) => {
  const { type } = detail || {};
  if (type === undefined) {
    throw new Error('type/toMap attributes is required')
  } else {
    const event = new CustomEvent('toMap', {
      detail,
      bubbles: true,
      cancelable: true
    })
    document.dispatchEvent(event)
  }
}
// 监听向地图派发的事件
export const listenerToMap = (callback) => {
  if (callback instanceof Function) {
    document.addEventListener('toMap', callback, false)
  }
}
// 移除监听向地图派发的事件
export const removeToMap = callback => {
  if (callback instanceof Function) {
    document.removeEventListener('toMap', callback)
  }
}

// 地图向外派发事件
export const dispatchMapTo = (detail) => {
  const { type } = detail || {};
  if (type === undefined) {
    throw new Error('type/mapTo attributes is required')
  } else {
    const event = new CustomEvent('mapTo', {
      detail,
      bubbles: true,
      cancelable: true
    })
    document.dispatchEvent(event)
  }

}
// 监听地图向外派发的事件
export const listenerMapTo = (callback) => {
  if (callback instanceof Function) {
    document.addEventListener('mapTo', callback, false)
  }
}
// 移除监听地图向外派发的事件
export const removeMapTo = callback => {
  if (callback instanceof Function) {
    document.removeEventListener('mapTo', callback)
  }
}

