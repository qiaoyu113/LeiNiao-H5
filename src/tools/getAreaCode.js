const axios = require('axios');
const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://szjw-bss-web.yunniao.cn'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['authorization'] = ''

let data = {
  'province_list': {},
  'city_list': {},
  'county_list': {}
}

/**
 * 获取省份列表
 */
async function getLists(params) {
  let { data: res } = await axios({
    method: 'post',
    url: `${BASE_URL}/api/base/v1/base/area/getCityByCode`,
    data: JSON.stringify(params)
  })
  if (res.success) {
    return res.data
  } else {
    throw new Error('获取列表出错:', res.errorMsg)
  }
}

// 获取县列表
async function getCountryLists(cityCode, countryCode) {
  const countryLists = await getLists(['100000', cityCode, countryCode]);
  for (let i = 0; i < countryLists.length; i++) {
    let item = countryLists[i];
    data['county_list'][item.code] = item.name
  }
}

// 获取城市列表
async function getCitysLists(cityCode) {
  const cityLists = await getLists(['100000', cityCode]);
  for (let i = 0; i < cityLists.length; i++) {
    let item = cityLists[i];
    data['city_list'][item.code] = item.name
    await getCountryLists(cityCode, item.code)
  }
}

(async function() {
  console.time('areaCode')
  const provinceLists = await getLists(['100000'])
  for (let i = 0; i < provinceLists.length; i++) {
    let item = provinceLists[i];
    data['province_list'][item.code] = item.name
    await getCitysLists(item.code)
  }
  writeToJson(data)
  console.timeEnd('areaCode')
})()

function writeToJson(data) {
  fs.writeFile(path.resolve(__dirname, 'code.json'), JSON.stringify(data), 'utf-8', function(err, data) {
    if (!err) {
      console.log('成功')
    }
  })
}

