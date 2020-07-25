import application from './application';

export default {
    data() {
        return {
            host: application.host,
            imageHost: application.imageHost
        }
    },
    components: {

    },
    created() {

    },
    methods: {
        request(config) {
            config.method = config.method ? config.method : 'POST';         // 默认POST请求

            if (!config.url.startsWith('http')) {
                config.url = application.host + config.url;
            }
            uni.request({
                url: config.url,
                type: 'json',
                method: config.method,
                crossOrigin: true,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/vnd.website.v1+json'
                },
                data: {
					...config.data,
					_isAjax: true
				},
                success: (res) => {
                    config.success(res.data);
                },
                fail: (res) => {
                    config.fail(res.data);
                },
                complete: (res) => {
                    config.complete(res.data);
                }
            });
        }
    }
}
