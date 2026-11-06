import subprocess
import os

url = 'file:///' + os.path.abspath('index.html').replace('\\', '/')
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
output_img = os.path.abspath('scratch/full_page_1920.png')

cmd = [
    chrome_path,
    '--headless=new',
    '--disable-gpu',
    '--virtual-time-budget=2000',
    '--window-size=1920,3200',
    f'--screenshot={output_img}',
    url
]
print('Running chrome screenshot...')
res = subprocess.run(cmd, capture_output=True, text=True)
print('Return code:', res.returncode)
if os.path.exists(output_img):
    print('File size:', os.path.getsize(output_img))
else:
    print('Error:', res.stderr)

