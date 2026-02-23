import os
from PIL import Image
import sys

# Extensions to target
EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp'}
# Directory to scan (relative to script)
TARGET_DIR = 'assets'

def get_size_mb(path):
    return os.path.getsize(path) / (1024 * 1024)

def optimize_image(path):
    try:
        with Image.open(path) as img:
            original_size = get_size_mb(path)
            
            # Skip small images (< 500KB)
            if original_size < 0.5:
                print(f"Skipping small file: {path} ({original_size:.2f} MB)")
                return False

            # Resize if too large (max 1920px width)
            if img.width > 1920:
                print(f"Resizing {path} (width: {img.width} -> 1920)")
                ratio = 1920 / img.width
                new_height = int(img.height * ratio)
                img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
            
            # Save optimized
            # For PNG, use optimize=True
            # For JPG, use quality=85, optimize=True
            if path.lower().endswith('.png'):
                img.save(path, optimize=True)
            elif path.lower().endswith(('.jpg', '.jpeg')):
                img.save(path, quality=85, optimize=True)
            elif path.lower().endswith('.webp'):
                img.save(path, quality=85, method=6)
            
            new_size = get_size_mb(path)
            print(f"Optimized {path}: {original_size:.2f} MB -> {new_size:.2f} MB")
            return True
    except Exception as e:
        print(f"Error optimizing {path}: {e}")
        return False

def main():
    if not os.path.exists(TARGET_DIR):
        print(f"Directory {TARGET_DIR} not found.")
        sys.exit(1)
        
    print(f"Scanning {TARGET_DIR}...")
    count = 0
    saved_size = 0
    
    for root, dirs, files in os.walk(TARGET_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in EXTENSIONS:
                path = os.path.join(root, file)
                original_size = os.path.getsize(path)
                if optimize_image(path):
                    count += 1
                    saved_size += original_size - os.path.getsize(path)
    
    print(f"\nOptimization complete.")
    print(f"Optimized {count} images.")
    print(f"Total space saved: {saved_size / (1024*1024):.2f} MB")

if __name__ == '__main__':
    main()
