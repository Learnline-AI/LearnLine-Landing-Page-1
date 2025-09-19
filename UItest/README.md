# Fractions UI Test Page - Image Requirements

## Required Images for UItest/assets/images/

### Pizza Images (4 total):
1. **pizza-whole.jpg** (120x120px)
   - Complete circular pizza image
   - Used in: First pizza demonstration box
   - Should show a whole, uncut pizza

2. **pizza-halves.jpg** (120x120px)
   - Pizza cut into 2 equal halves
   - Used in: Second pizza demonstration box
   - Should clearly show the division line

3. **pizza-quarters.jpg** (120x120px)
   - Pizza cut into 4 equal quarters
   - Used in: Third pizza demonstration box
   - Should show clear quarter divisions

4. **pizza-eighths.jpg** (120x120px)
   - Pizza cut into 8 equal pieces
   - Used in: Fourth pizza demonstration box
   - Should show 8 distinct slices

### Clock Images (3 total):
1. **clock-quarter.jpg** (100x100px)
   - Clock face showing 15 minutes (quarter past)
   - Used in: First time example
   - Minute hand pointing to 3, hour hand between 12-1

2. **clock-half.jpg** (100x100px)
   - Clock face showing 30 minutes (half past)
   - Used in: Second time example
   - Minute hand pointing to 6, hour hand between 12-1

3. **clock-three-quarters.jpg** (100x100px)
   - Clock face showing 45 minutes (three-quarters past)
   - Used in: Third time example
   - Minute hand pointing to 9, hour hand between 12-1

## Current Implementation:
- Currently using placeholder circles with text
- Colors: Pizza placeholders = #ff6b35, Clock placeholders = #34495e
- Once images are added, update the CSS to replace .pizza-placeholder and .clock-placeholder with <img> tags

## How to Replace Placeholders:
Replace the placeholder divs with:
```html
<img src="assets/images/pizza-whole.png" alt="Whole pizza" class="pizza-image">
```

And update CSS:
```css
.pizza-image, .clock-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 15px;
    display: block;
}
```