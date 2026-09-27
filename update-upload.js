const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Remove Supabase import
content = content.replace('import { createClient } from "@supabase/supabase-js";\n', '');

// Replace handleFileUpload function
const newHandleFileUpload =   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 600;

        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64String = canvas.toDataURL('image/jpeg', 0.7);
          setNewCake({ ...newCake, image_url: base64String });
        } else {
          alert('Error compressing image');
        }
        setIsUploading(false);
      };
      
      img.onerror = () => {
        alert('Error loading image');
        setIsUploading(false);
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      alert('Error reading file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };;

// Use regex to replace the old function block
content = content.replace(/const handleFileUpload = async \(e: React\.ChangeEvent<HTMLInputElement>\) => \{[\s\S]*?\} finally \{[\s\S]*?setIsUploading\(false\);[\s\S]*?\}[\s\S]*?\};/, newHandleFileUpload);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
