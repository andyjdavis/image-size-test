import * as sizeOf from 'image-size'
import * as jimp from 'jimp'

import * as url from 'url'
import * as http from 'http'

const localPath = './Meal.jpg'
const remoteUrl = 'http://20705-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2017/01/Dahon-folding-bike-and-Thule-Chariot-in-Perth.jpg'

async function imageSizeLocal() {
    try {
        console.log('image-size local')
        const dimensions = await sizeOf(localPath)
        console.log(dimensions.width, dimensions.height)
    } catch (err) {
        console.error(err)
    }
}
function imageSizeRemote() {
    var options = url.parse(remoteUrl)
    
    http.get(options, function (response: any) {
      var chunks: any[] = []
      response.on('data', function (chunk: any) {
        chunks.push(chunk)
      }).on('end', function() {
        var buffer = Buffer.concat(chunks)

        // Allegedly can check the buffer lengths & stop downloading the image after a few kilobytes
        // No need to download the entire image
        console.log(`image-size remote ${JSON.stringify(sizeOf(buffer))}`)
      });
    });
}

function jimpLocal() {
    console.log('jimp local')
    doJimp(localPath)
}

function jimpRemote() {
    console.log('jimp remote')
    doJimp(remoteUrl)
}

function doJimp(path: string) {
    jimp.read(path)
    .then(function (img: jimp) {
        console.log(img.bitmap.width, img.bitmap.height)
    }).catch(function (err: Error) {
        console.error(err)
    })
}

async function testAll() {
    await imageSizeLocal()
    imageSizeRemote()

    jimpLocal()
    jimpRemote()
}
testAll()