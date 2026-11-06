from PIL import Image

ref = Image.open(r'C:\Users\SIS\.gemini\antigravity\brain\49baaa5b-11ca-4f35-864c-4aad0aa05184\.user_uploaded\media_1793983281275_4de61c06.jpg')
rendered = Image.open('scratch/rendered_gold_section.png')

# Scale both to width 1200
target_w = 1200
ref_scaled = ref.resize((target_w, int(ref.height * (target_w / ref.width))), Image.Resampling.LANCZOS)
ren_scaled = rendered.resize((target_w, int(rendered.height * (target_w / rendered.width))), Image.Resampling.LANCZOS)

# Create comparison canvas
total_h = ref_scaled.height + ren_scaled.height + 40
comp = Image.new('RGB', (target_w, total_h), (25, 25, 25))

# Paste ref
comp.paste(ref_scaled, (0, 0))
# Paste ren
comp.paste(ren_scaled, (0, ref_scaled.height + 40))

comp.save('scratch/visual_comparison.png')
print('Saved scratch/visual_comparison.png with dimensions:', comp.size)
print('Ref height:', ref_scaled.height, 'Rendered height:', ren_scaled.height)

