
const fs = require("fs");
let content = fs.readFileSync("src/app/admin/page.tsx", "utf8");
const newHandle = `  const handleAddCake = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(newCake.price);
    
    console.log("Submitting cake with image payload size:", newCake.image_url.length);

    try {
      const res = await fetch("/api/cakes", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          name: newCake.name, 
          description: newCake.description,
          basePrice: priceNum,
          image: newCake.image_url.trim(),
          in_stock: true 
        })
      });
        
      if (res.ok) {
        const data = await res.json();
        if (data.cake) {
          setCakes((prev: any) => [data.cake, ...prev]);
        } else {
          fetchCakes();
        }
        setIsAddModalOpen(false);
        setNewCake({
          name: "",
          description: "100% Pure Veg & Eggless fresh cake prepared daily.",
          price: "",
          image_url: "/cakes/WhiteForest%20400.jpeg"
        });
      } else {
        const errorData = await res.json();
        alert("Error adding cake: " + errorData.error);
      }
    } catch (err: any) {
      alert("Error adding cake: " + err.message);
    }
  };`;

content = content.replace(
  /const handleAddCake = async \(e: React\.FormEvent\) => \{[\s\S]*?fetchCakes\(\);\r?\n\s*\} else \{[\s\S]*?\} catch \(err: any\) \{[\s\S]*?\}\r?\n\s*\};/,
  newHandle
);
fs.writeFileSync("src/app/admin/page.tsx", content, "utf8");

