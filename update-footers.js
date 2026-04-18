const fs = require('fs');
const path = require('path');

// 定义新的页脚内容
const newFooter = `    <!-- Footer -->
    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <a href="https://www.wangdadi.xyz" target="_blank" style="text-decoration: none; color: #000; font-weight: bold;">home</a>
            <a href="https://cronguard.wangdadi.xyz" style="text-decoration: none; color: #000; font-weight: bold;">Cron Guard</a>
            <a href="seo-pages/all-topics.html" style="text-decoration: none; color: #000; font-weight: bold;">All Topics</a>
            <span>Support: <a href="mailto:457239850@qq.com" style="text-decoration: none; color: #000;">457239850@qq.com</a></span>
            <a href="sitemap.html" style="text-decoration: none; color: #000; font-weight: bold;">sitemap</a>
        </div>
    </footer>`;

// 定义静态页的页脚（路径不同）
const staticPageFooter = `    <!-- Footer -->
    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center;">
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <a href="https://www.wangdadi.xyz" target="_blank" style="text-decoration: none; color: #000; font-weight: bold;">home</a>
            <a href="../index.html" style="text-decoration: none; color: #000; font-weight: bold;">Cron Guard</a>
            <a href="all-topics.html" style="text-decoration: none; color: #000; font-weight: bold;">All Topics</a>
            <span>Support: <a href="mailto:457239850@qq.com" style="text-decoration: none; color: #000;">457239850@qq.com</a></span>
            <a href="../sitemap.html" style="text-decoration: none; color: #000; font-weight: bold;">sitemap</a>
        </div>
    </footer>`;

// 修改首页
function updateIndexHtml() {
    try {
        const filePath = './index.html';
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 替换页脚
        const footerRegex = /<!-- Footer -->[\s\S]*?<\/footer>/;
        content = content.replace(footerRegex, newFooter);
        
        fs.writeFileSync(filePath, content);
        console.log('Updated index.html footer');
    } catch (error) {
        console.error('Error updating index.html:', error);
    }
}

// 修改聚合页
function updateAllTopicsHtml() {
    try {
        const filePath = './seo-pages/all-topics.html';
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 在 </body> 标签之前插入页脚
        const bodyEndRegex = /<\/body>/;
        content = content.replace(bodyEndRegex, `${staticPageFooter}\n</body>`);
        
        fs.writeFileSync(filePath, content);
        console.log('Updated all-topics.html footer');
    } catch (error) {
        console.error('Error updating all-topics.html:', error);
    }
}

// 修改静态页
function updateStaticPages() {
    try {
        const seoPagesDir = './seo-pages';
        const files = fs.readdirSync(seoPagesDir);
        
        files.forEach(file => {
            if (file.endsWith('.html') && file !== 'all-topics.html') {
                const filePath = path.join(seoPagesDir, file);
                let content = fs.readFileSync(filePath, 'utf8');
                
                // 替换现有的页脚
                const existingFooterRegex = /<footer>[\s\S]*?<\/footer>/;
                if (existingFooterRegex.test(content)) {
                    content = content.replace(existingFooterRegex, staticPageFooter.trim());
                } else {
                    // 在 </body> 标签之前插入页脚
                    const bodyEndRegex = /<\/body>/;
                    content = content.replace(bodyEndRegex, `${staticPageFooter.trim()}\n</body>`);
                }
                
                fs.writeFileSync(filePath, content);
                console.log(`Updated ${file} footer`);
            }
        });
    } catch (error) {
        console.error('Error updating static pages:', error);
    }
}

// 修改HTML站点地图
function updateSitemapHtml() {
    try {
        const filePath = './sitemap.html';
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 替换页脚
        const footerRegex = /<div class="footer">[\s\S]*?<\/div>/;
        const newSitemapFooter = `        <div class="footer">
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 10px;">
                <a href="https://www.wangdadi.xyz" target="_blank" style="text-decoration: none; color: #000; font-weight: bold;">home</a>
                <a href="https://cronguard.wangdadi.xyz" style="text-decoration: none; color: #000; font-weight: bold;">Cron Guard</a>
                <a href="seo-pages/all-topics.html" style="text-decoration: none; color: #000; font-weight: bold;">All Topics</a>
                <span>Support: <a href="mailto:457239850@qq.com" style="text-decoration: none; color: #000;">457239850@qq.com</a></span>
                <a href="sitemap.html" style="text-decoration: none; color: #000; font-weight: bold;">sitemap</a>
            </div>
            <p>© 2026 Cron Guard - Minimalist Cron Monitoring Tool</p>
        </div>`;
        
        content = content.replace(footerRegex, newSitemapFooter);
        
        fs.writeFileSync(filePath, content);
        console.log('Updated sitemap.html footer');
    } catch (error) {
        console.error('Error updating sitemap.html:', error);
    }
}

// 执行所有更新
updateIndexHtml();
updateAllTopicsHtml();
updateStaticPages();
updateSitemapHtml();

console.log('All footers updated successfully!');
