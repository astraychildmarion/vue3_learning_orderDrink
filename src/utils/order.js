export function orderSetting() {
  const iceMap = new Map();
  iceMap.set(0, '去冰');
  iceMap.set(2, '正常');
  iceMap.set(3, '熱飲');
  iceMap.set(1, '少冰');
  const sugarMap = new Map();
  sugarMap.set(0, '去糖');
  sugarMap.set(2, '全糖');
  sugarMap.set(3, '多糖');
  sugarMap.set(1, '少糖');
  const toppingMap = new Map();
  toppingMap.set(0, '珍珠');
  toppingMap.set(2, '布丁');
  toppingMap.set(3, '椰果');
  toppingMap.set(1, '咖啡凍');

  function mapOrderText(kind, value) {
    const mapObjString = `${kind}Map`;
    return this[mapObjString].get(parseInt(value));
  }

  const defaultTitle = [
    {
      text: '冰塊',
      value: 'ice',
    },
    {
      text: '甜度',
      value: 'sugar',
    },
    {
      text: '配料',
      value: 'topping',
    },
  ];

  return {
    iceMap,
    sugarMap,
    toppingMap,
    mapOrderText,
    defaultTitle,
  };
}
