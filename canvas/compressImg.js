/**
 * 压缩图片
 * 目前支持
 * 最低质量优先级大于目标大小，压缩时以保证质量为主
 *
 * @param {Object} options 基础配置
 * @property {Number} options.initialQuality 起始图片质量系数，0-1
 * @property {Number} options.targetSize 压缩后的目标大小，单位字节（byte）
 * @property {Number} options.qualityGradient 不符合要求时质量每次减少的梯度，数值越压缩次数越少
 * @property {Number} options.minQuality 最低质量
 * @property {Number} options.allowMaxSize 传入图片的最大体积
 * @property {object} file 要压缩的图片对象
 *
 * @returns {Promise} promise resolve后返回压缩后的blob对象
 */

class CompressImg {
    constructor(file, options = {}) {
        this.options = options;
        this.file = file;

        this.dynamicRegulationParameters();

        if (!file || !file.size) {
            console.error(
                'file parameter error, can not read file or file.size.'
            );
        }

        if (file.size > this.options.allowMaxSize) {
            console.error('Picture size out of limit');
        }

        // 能力检测
        const canvas = document.createElement('canvas');

        if (!canvas || !canvas.getContext) {
            console.error('browser does not support canvas');
        }
        if (!window.FileReader) {
            console.error('browser does not support FileReader');
        }
    }

    resizeImg() {
        return new Promise((resolve, reject) => {
            const {
                initialQuality,
                targetSize,
                qualityGradient,
                minQuality,
            } = this.options;

            if (this.file.size <= targetSize || this.file.type === 'image/png') {
                resolve(this.file);
                return;
            }

            console.log('压缩了一次');

            // 读取文件转为base64
            const reader = new FileReader();
            reader.readAsDataURL(this.file);

            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;

                img.onerror = () => {
                    const err = new Error('image load error');
                    reject(err);
                };

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const { width, height } = img;

                    // 在canvas上绘制图片
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // 压缩图片为base64
                    const base64Data = canvas.toDataURL(
                        'image/jpeg',
                        initialQuality
                    );

                    while (base64Data.length > targetSize && initialQuality > minQuality) {
                        this.options.initialQuality -= qualityGradient;

                        // 不满足目标大小限制，递归压缩原文件
                        resolve(this.resizeImg());
                        return;
                    }

                    resolve(convertToBlob(base64Data, 'image/jpeg'));
                };
            };
        });
    }

    /**
     * 根据图片体积动态调控压缩参数
     */
    dynamicRegulationParameters = () => {
        const {
            initialQuality = 0.9,
            targetSize = 524288, // 500KB
            minQuality = 0.5,
            allowMaxSize = 5242880,
        } = this.options;

        let {
            qualityGradient
        } = this.options;

        // 根据文件大小调整每次重新压缩减少的质量梯度，文件越大梯度越大，减少性能消耗
        if (!qualityGradient) {
            if (this.file.size / targetSize > 2.5) {
                qualityGradient = 0.1;
            } else {
                qualityGradient = 0.05;
            }
        }

        this.options = {
            initialQuality,
            targetSize,
            minQuality,
            qualityGradient,
            allowMaxSize,
        };
    }
}

function convertToBlob(base64Str, fileType) {
    base64Str = base64Str.substring(base64Str.indexOf(',') + 1);

    const base64 = window.atob(base64Str);
    const len = base64.length;
    const buff = new ArrayBuffer(len);
    const uarr = new Uint8Array(buff);

    for (let i = 0; i < len; i++) {
        uarr[i] = base64.charCodeAt(i);
    }

    let blob = null;

    try {
        blob = new Blob([buff], { type: fileType });
    } catch (e) {
        const BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;

        if (e.name === 'TypeError' && BlobBuilder) {
            const builder = new BlobBuilder();

            builder.append(buff);
            blob = builder.getBlob(fileType);
        }
    }

    return blob;
}

export default function compress(file, options) {
    const ctx = new CompressImg(file, options);

    return ctx.resizeImg();
}