import subprocess
import os

for w, h, name in [(1024, 800, 'tablet'), (390, 844, 'mobile')]:
    output_img = os.path.abspath(f'scratch/gold_{name}.png')
    cmd = [
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--disable-gpu',
        f'--window-size={w},{h}',
        f'--screenshot={output_img}',
        'file:///' + os.path.abspath('scratch/standalone_gold.html').replace('\\', '/')
    ]
    subprocess.run(cmd, capture_output=True, text=True)
    print(f'Screenshot for {name} saved:', os.path.exists(output_img))

