from PIL import Image
import numpy as np

img = Image.open('scratch/gold_standalone_1920.png')
print('Screenshot size:', img.size)

arr = np.array(img)
# Find non-black height
non_black = (arr > 10).any(axis=2)
y_indices, x_indices = np.where(non_black)
if len(y_indices) > 0:
    min_y = y_indices.min()
    max_y = y_indices.max()
    print(f'Section y range: [{min_y}, {max_y}], height = {max_y - min_y + 1}')
    sec = img.crop((0, min_y, img.width, max_y + 1))
    sec.save('scratch/rendered_gold_section.png')
    print('Saved scratch/rendered_gold_section.png with size:', sec.size)

    # Check button position
    # Button is dark emerald: R < 20, G around 50..80, B around 40..70
    btn_mask = (arr[:, :, 0] < 25) & (arr[:, :, 1] > 45) & (arr[:, :, 1] < 90) & (arr[:, :, 2] > 35) & (arr[:, :, 2] < 80)
    by, bx = np.where(btn_mask)
    if len(by) > 0:
        print(f'Emerald button located at x=[{bx.min()}, {bx.max()}], y=[{by.min()}, {by.max()}]')

    # Check left 200px mean color (rings on left)
    left_200 = sec.crop((0, 0, 200, sec.height))
    print('Left 200px mean color:', left_200.resize((1,1)).getpixel((0,0)))

    # Check right 200px mean color
    right_200 = sec.crop((sec.width - 200, 0, sec.width, sec.height))
    print('Right 200px mean color:', right_200.resize((1,1)).getpixel((0,0)))

