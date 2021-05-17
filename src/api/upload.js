/* eslint-disable */
let OSS = require('ali-oss');
import { Toast } from 'vant';
import { GetOssConfig } from '@/api/common'

// 阿里云上传文件
export const uploadOSS = async(file, dir = 'img') => {
  let data = await getOssConfigFunc()
  let { accessid, accesskey, host, bucketName } = data
  let client = new OSS({
    // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
    region: host.split('.')[0],
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    accessKeyId: accessid,
    accessKeySecret: accesskey,
    bucket: bucketName
  });
  // or const data = new Blob('content');
  // or const data = new OSS.Buffer('content'));
  let fileName = generatorRandom() + file.name
  return client.put(`${dir}/${fileName}`, file);
}
// 阿里云分片上传上传文件
export const uploadOSSMulUpload = async(file, dir = 'img') => {
  let { accessid, accesskey, host, bucketName } = await getOssConfigFunc()
  let client = new OSS({
    region: host.split('.')[0],
    accessKeyId: accessid,
    accessKeySecret: accesskey,
    bucket: bucketName
  });
  let fileName = generatorRandom() + file.name
  return mulUpload(client, fileName, file)
}

// 获取oss上传配置
async function getOssConfigFunc() {
  try {
    let { data: res } = await GetOssConfig()
    if (res.success) {
      return res.data
    } else {
      Toast.fail('获取oss配置失败!');
    }
  } catch (err) {
    console.log(`get oss config fail:${err}`)
  } finally {
    //
  }
}

function mulUpload(client, fileName, file) {
  return new Promise(async(resolve, reject) => {
    client.multipartUpload(fileName, file, {

    })
      .then(({ res }) => {
        if (res && res.status === 200) {
          const url = new URL(res.requestUrls[0])
          resolve({
            url: url.origin + url.pathname
          })
        }
      }).catch((err) => {
        console.log(err);
      });
  })
}
// 生成随机数
function generatorRandom() {
  const ramdom = Date.now() + String(Math.random()).slice(2, 10)
  return ramdom
}
