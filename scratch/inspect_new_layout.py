from PIL import Image
import numpy as np

img = Image.open('scratch/gold_new_layout_1920.png')
print('Screenshot size:', img.size)

arr = np.array(img)
# 1. Emerald button: R < 25, G around 50..80, B around 40..70
btn_mask = (arr[:, :, 0] < 25) & (arr[:, :, 1] > 45) & (arr[:, :, 1] < 90) & (arr[:, :, 2] > 35) & (arr[:, :, 2] < 80)
by, bx = np.where(btn_mask)
if len(by) > 0:
    print(f'Emerald button located at x=[{bx.min()}, {bx.max()}], y=[{by.min()}, {by.max()}]')

# 2. White cards: R > 250, G > 250, B > 250
# In x from 50 to 800
cards_area = arr[:, 50:800]
white_pixels = (cards_area[:, :, 0] > 250) & (cards_area[:, :, 1] > 250) & (cards_area[:, :, 2] > 250)
cy, cx = np.where(white_pixels)
if len(cy) > 0:
    print(f'White cards span: x=[{cx.min() + 50}, {cx.max() + 50}], y=[{cy.min()}, {cy.max()}]')

# Crop the full content area (left side stack)
stack_crop = img.crop((50, 50, 750, 650))
stack_crop.save('scratch/rendered_stack.png')
print('Saved scratch/rendered_stack.png size:', stack_crop.size)

