import subprocess
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

head_end = html.find('</head>')
head = html[:head_end]

sec_start = html.find('<section class="gold-showcase-section"')
sec_end = html.find('</section>', sec_start) + len('</section>')
sec_html = html[sec_start:sec_end]

standalone = f"""<!DOCTYPE html>
<html lang="en">
{head}
<style>
  body {{ margin: 0; padding: 0; background: #000; }}
  .reveal-on-scroll {{ opacity: 1 !important; transform: none !important; }}
</style>
</head>
<body>
{sec_html}
</body>
</html>"""

# Fix paths for standalone test
standalone = standalone.replace('href="style.css"', 'href="../style.css"')
standalone = standalone.replace('src="assets/', 'src="../assets/')

with open('scratch/standalone_gold.html', 'w', encoding='utf-8') as f:
    f.write(standalone)

output_img = os.path.abspath('scratch/gold_new_layout_1920.png')
cmd = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1920,700',
    f'--screenshot={output_img}',
    'file:///' + os.path.abspath('scratch/standalone_gold.html').replace('\\', '/')
]
res = subprocess.run(cmd, capture_output=True, text=True)
print('Screenshot code:', res.returncode)

