#!/bin/python3
import http.server, os, re
streams, tvnames = [], []
with os.popen('curl https://iptv-org.github.io/iptv/index.m3u') as f:
    for moe in re.finditer('[^,\n]+,([^\n]+)\n([^\n]+)', f.read()):
        streams += moe[2],
        tvnames += moe[1],
class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if '/' == self.path:
            self.wfile.write(b'HTTP\n\n'+b' '.join(bytes(f'<a href={i}>{t}</a>','utf-8')for i,t in enumerate(tvnames)))
        if re.match('/\d+', self.path):
            self.wfile.write(bytes(f"HTTP\n\n<style>body,html,video{'{'}background:#000;height:100%;margin:0;width:100%{'}'}</style><video></video><script src=https://cdn.jsdelivr.net/npm/hls.js></script><script>v=document.querySelector('video');h=new Hls;h.loadSource('{streams[int(self.path[1:])]}');h.attachMedia(v);h.on(Hls.Events.MANIFEST_PARSED,_=>v.play())</script>", 'utf-8'))
http.server.test(Handler)
