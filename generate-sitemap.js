const fs = require('fs');
const path = require('path');

// 读取关键词数据
const keywords = JSON.parse(fs.readFileSync('./seo_keywords.json', 'utf8'));
const domain = 'https://cronguard.wangdadi.xyz';

// 生成 HTML 站点地图
function generateHtmlSitemap() {
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Map - Cron Guard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1, h2 {
            color: #2c3e50;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
            padding-left: 20px;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Site Map</h1>
        
        <h2>Main Pages</h2>
        <ul>
            <li><a href="${domain}">Home</a></li>
            <li><a href="${domain}/seo-pages/all-topics.html">All Topics</a></li>
        </ul>
        
        <h2>Monitoring Topics</h2>
        <ul>
`;

    // 添加所有静态页面
    keywords.forEach(keyword => {
        const url = `${domain}/seo-pages/${keyword.keyword.toLowerCase().replace(/\s+/g, '_')}.html`;
        htmlContent += `            <li><a href="${url}">${keyword.target_page_title}</a></li>
`;
    });

    htmlContent += `        </ul>
        
        <div class="footer">
            <p>© 2026 Cron Guard - Minimalist Cron Monitoring Tool</p>
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync('./sitemap.html', htmlContent);
    console.log('HTML sitemap generated successfully');
}

// 生成 XML 站点地图
function generateXmlSitemap() {
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${domain}</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${domain}/seo-pages/all-topics.html</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
`;

    // 添加所有静态页面
    keywords.forEach(keyword => {
        const url = `${domain}/seo-pages/${keyword.keyword.toLowerCase().replace(/\s+/g, '_')}.html`;
        xmlContent += `    <url>
        <loc>${url}</loc>
        <lastmod>2026-04-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
`;
    });

    xmlContent += `</urlset>`;

    fs.writeFileSync('./sitemap.xml', xmlContent);
    console.log('XML sitemap generated successfully');
}

// 执行生成
generateHtmlSitemap();
generateXmlSitemap();

console.log('All sitemaps generated successfully!');
