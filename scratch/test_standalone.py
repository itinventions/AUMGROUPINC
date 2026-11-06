import subprocess
import os

js_script = """
(() => {
  // Disable loader immediately
  const loader = document.getElementById('site-loader') || document.querySelector('.loader-container');
  if (loader) loader.style.display = 'none';

  // Force reveal all scroll elements
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('is-revealed');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  const sec = document.getElementById('gold-collection');
  if (sec) {
    const rect = sec.getBoundingClientRect();
    return JSON.stringify({top: rect.top + window.scrollY, height: rect.height, bottom: rect.bottom + window.scrollY});
  }
  return JSON.stringify({error: 'not found'});
})()
"""

# Let's write a small HTML test file dedicated solely to the Gold Section to verify exact rendering!
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head and the section
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

with open('scratch/standalone_gold.html', 'w', encoding='utf-8') as f:
    f.write(standalone)

print('Standalone test HTML created at scratch/standalone_gold.html')

# Screenshot standalone
cmd = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1920,800',
    f'--screenshot={os.path.abspath("scratch/gold_standalone_1920.png")}',
    'file:///' + os.path.abspath('scratch/standalone_gold.html').replace('\\', '/')
]
res = subprocess.run(cmd, capture_output=True, text=True)
print('Screenshot code:', res.returncode)

