// 手机号验证
export function isPhone (val) {
  // return /^1[0-9]{10}$/.test(val) || /^\d{8}$/.test(val) || /^\d{7}$/.test(val) || /^\d{6}$/.test(val);
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val)
}
// 座机验证
export function isTel (val) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)
}
/**
 * 合法身份证
 * @param val 身份证
 * @returns boolean
 */
export function isIdCard (val) {
  if (!val || val === '') {
    return false
  }
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  };

  if (!val || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)) {
    return false;
  } else if (!city[val.substr(0, 2)]) {
    return false;
  } else {
    if (val.length === 18) {
      val = val.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = val[i];
        wi = factor[i];
        sum += ai * wi;
      }
      const last = parity[sum % 11] + '';
      if (last !== val[17].toUpperCase()) {
        return false;
      }
    }
  }
  return true;
}
// 脱敏
export function desensitization (str, beginLen = 1, endLen = -1) {
  var len = str.length
  var tempStr, firstStr, middleStr, lastStr
  var firstStr = str.slice(0, beginLen)
  if (endLen == -1) {
    middleStr = str.slice(beginLen, len).replace(/[\s\S]/gi, '*')
  } else if (len + endLen > beginLen) {
    middleStr = str.slice(beginLen, endLen).replace(/[\s\S]/gi, '*')
  } else {
    middleStr = ''
  }
  if (endLen != -1) {
    lastStr = str.slice(endLen)
  } else {
    lastStr = ''
  }
  var tempStr = firstStr + middleStr + lastStr
  return tempStr
}

// 时间格式转换
export function formatDate (date, fmt) {
  date = getDate(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function getDate (time) {
  console.log(time instanceof Date)
  if (time instanceof Date) {
    return time
  }
  return new Date(time)
  // switch (typeof time) {
  //   case 'string':
  //     return new Date(time.replace(/-/g, '/'))
  //   default:
  //     return new Date(time)
  // }
}

// 计算剩余时间
export function residueTime (date, stDate = new Date()) {
  // let now = new Date();
  // let past = new Date(date.replace(/-/g, '/'));
  let edDate = getDate(date); // 到期时间

  var diff = edDate.getTime() - stDate.getTime(); //时间差的毫秒数        

  //------------------------------  
  if (diff <= 0) {
    return false
  }
  //计算出相差天数  
  var days = Math.floor(diff / (24 * 3600 * 1000))

  //计算出小时数  

  var leave1 = diff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
  var hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数  
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
  var minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数  
  // var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
  // var seconds = Math.round(leave3 / 1000);
  return `${days > 0 ? days + '天' : ''}${hours > 0 ? hours + '小时' : ''}${minutes > 0 ? minutes + '分钟' : ''}`
}

// 获取数组
export function getArray (data) {
  let arr = []
  for (let i = 1; i <= data; i++) {
    arr.push(i)
  }
  return arr;
}

// 获取数组字符串
export function getArrayString (data) {
  let arr = []
  for (let i = 1; i <= data; i++) {
    if (i < 10) {
      arr.push('0' + i)
    } else {
      arr.push(i + '')
    }
  }
  return arr;
}

// 去空
export function clearEmpty (obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    if (!value && value !== 0) {
      delete obj[key]
    } else {
      obj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key]
    }
  })
  return obj
}

export function getParamStr (param) {
  let paramStr = ''
  Object.keys(param).forEach(key => {
    paramStr += key + '=' + param[key] + '&'
  })
  paramStr = paramStr.substring(0, paramStr.length - 1)
  return paramStr
}
