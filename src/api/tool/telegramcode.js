import request from '@/utils/request';


// 解码
export function decodeExecute(data) {
    return request({
        url: '/tool/telegramcode/executeDecode',
        method: 'post',
        data
    });
}


//编码
export function encodeExecute(data) {
    return request({
        url: '/tool/telegramcode/executeEncode',
        method: 'post',
        data
    });
}

// 获取历史记录列表
export function listHistoryData(query) {
    return request({
        url: '/tool/telegramcode/historyList',
        method: 'post',
        params: query
    });
}



