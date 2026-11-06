import subprocess
import os

with open('scratch/standalone_gold.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('href="style.css"', 'href="../style.css"')
c = c.replace('src="assets/', 'src="../assets/')
with open('scratch/standalone_gold.html', 'w', encoding='utf-8') as f:
    f.write(c)

output_img = os.path.abspath('scratch/gold_standalone_1920.png')
cmd = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1920,600',
    f'--screenshot={output_img}',
    'file:///' + os.path.abspath('scratch/standalone_gold.html').replace('\\', '/')
]
res = subprocess.run(cmd, capture_output=True, text=True)
print('Screenshot code:', res.returncode)

