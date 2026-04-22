const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8899;

const MIME = {
  '.html': 'text/html;charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.bat': 'text/plain'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  let fullPath = path.join(__dirname, filePath);

  // 安全检查：不允许访问上级目录
  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath);
    const mime = MIME[ext] || 'text/plain;charset=utf-8';
    res.writeHead(200, {'Content-Type': mime});
    res.end(fs.readFileSync(fullPath));
  } else {
    res.writeHead(404);
    res.end('Not Found: ' + req.url);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  博众简历解析工具已启动');
  console.log('  ============================');
  console.log('  本地访问: http://localhost:' + PORT);
  console.log('');
  console.log('  在浏览器打开上方地址即可使用');
  console.log('  按 Ctrl+C 停止服务');
  console.log('');
});
