var rule = {
    title: 'Hanime1',
    host: 'https://hanime1.me',
    url: '/search?genre=fyclass&page=fypage',
    searchUrl: '/search?query=**&page=fypage',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,

    class_name:'裏番&泡麵番&Motion Anime&3DCG&2.5D&2D動畫&AI生成&MMD&Cosplay',
    class_url:'裏番&泡麵番&Motion Anime&3DCG&2.5D&2D動畫&AI生成&MMD&Cosplay',

    homeUrl:'/search?sort=最新上市',

    headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'},

    // 一级列表（首页/分类/搜索通用）
    一级:`js:
        pdfa = jsp.pdfa;
        pdfh = jsp.pdfh;
        pd = jsp.pd;

        let d = [];
        let pdfa_html = pdfa(html, 'body&&img[src*="vdownload.hembed.com/image/"]');
        pdfa_html.forEach(function(it) {
            let img = pdfh(it, 'img&&src');
            let a = pdfh(it, 'body&&a[href^="https://hanime1.me/watch?v="]:has(+img)&&href') || pdfh(it, 'a&&href');
            let title = pdfh(it, 'a&&Text') || pdfh(it, 'img&&alt');
            if (a && title && img) {
                d.push({
                    vod_id: a.match(/v=(\\d+)/)?.[1] || '未知',
                    vod_name: title.trim(),
                    vod_pic: img,
                    vod_remarks: '',
                    vod_url: a
                });
            }
        });
        VODS = d;
    `,

    // 二级详情页（临时放播放链接给外部解析）
    二级:{
        title:'h1&&Text',
        img:'img.video-cover&&src||img&&src',
        desc:';.video-info&&Text||.brand&&Text',
        content:'.description&&Text',
        tabs:`js:TABS=['外部解析']`,
        lists:`js:input = input; LISTS = [['播放$$$'+input]];`
    },

    // 播放：用外部万能解析接口（最关键，基本能播）
    play_parse:true,
    lazy:`js:
        // 选一个能用的解析接口（可自行替换测试）
        let parse_url = 'https://jx.jsonplayer.com/player/?url=' + input;
        // 备选：'https://jx.aidouer.net/?url=' + input;
        //       'https://parse.kkparse.com/?url=' + input;

        input = {
            parse:1,
            url:parse_url,
            js:''
        };
    `,

    图片来源:'@Referer=https://hanime1.me'
};