from PIL import Image
import numpy as np

img = Image.open('scratch/full_page_1920.png')
print('Screenshot size:', img.size)

# Let's search down the image to find where the gold section is
# In the gold section, the background has cream/gold tones, and the emerald button is #083c34
arr = np.array(img)
# Search for emerald button color: R < 20, G between 50 and 80, B between 40 and 70
emerald_mask = (arr[:, :, 0] < 20) & (arr[:, :, 1] > 50) & (arr[:, :, 1] < 80) & (arr[:, :, 2] > 40) & (arr[:, :, 2] < 70)
y_indices, x_indices = np.where(emerald_mask)

if len(y_indices) > 0:
    min_y = y_indices.min()
    max_y = y_indices.max()
    print(f'Found emerald button at y=[{min_y}, {max_y}], x=[{x_indices.min()}, {x_indices.max()}]')
    # Crop the section around the button (say 300px above and 300px below)
    sec_top = max(0, min_y - 250)
    sec_bottom = min(img.height, max_y + 250)
    cropped_sec = img.crop((0, sec_top, img.width, sec_bottom))
    cropped_sec.save('scratch/gold_section_rendered.png')
    print('Saved scratch/gold_section_rendered.png with size:', cropped_sec.size)
else:
    print('Emerald button not found, let us inspect vertical slices.')
    # Save slices
    for y in range(0, img.height, 600):
        img.crop((0, y, img.width, min(img.height, y+600))).resize((400, 125)).save(f'scratch/slice_{y}.png')

