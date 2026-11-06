from PIL import Image
import numpy as np

img = Image.open('scratch/rendered_gold_section.png')
arr = np.array(img)

# White cards are #ffffff: R>245, G>245, B>245
# Let's search in x from 1000 to 1800
cards_area = arr[:, 1000:1800]
white_pixels = (cards_area[:, :, 0] > 245) & (cards_area[:, :, 1] > 245) & (cards_area[:, :, 2] > 245)
cy, cx = np.where(white_pixels)
if len(cy) > 0:
    print(f'White cards span: x=[{cx.min() + 1000}, {cx.max() + 1000}], y=[{cy.min()}, {cy.max()}]')

# Let's crop the cards area and inspect it:
cards_crop = img.crop((cx.min() + 980, cy.min() - 10, cx.max() + 1020, cy.max() + 30))
cards_crop.save('scratch/rendered_cards.png')
print('Saved scratch/rendered_cards.png size:', cards_crop.size)

# Let's also crop the editorial block (title + subtitle + button):
ed_crop = img.crop((700, 150, 1020, 420))
ed_crop.save('scratch/rendered_editorial.png')
print('Saved scratch/rendered_editorial.png size:', ed_crop.size)

