# 🎨 SmartCreative Studio (Tesco Hackathon Submission)

**Developer: Prateek Gupta**

**Gen-AI powered creative automation for the retail sector.**

SmartCreative Studio is a mobile-first web application that allows Small & Medium Businesses (SMBs) to generate professional, Tesco-compliant advertising assets in seconds. It solves the bottleneck of expensive and slow ad production.

## 🚀 Key Features
* **🤖 AI Background Removal:** instantly isolates products from raw photos using `rembg` (u2net).
* **🎨 Dynamic Theming:** One-click adaptation for seasonal campaigns (e.g., Summer ☀️, Winter ❄️).
* **✅ Automated Compliance:** Built-in rule engine checks for Tesco branding, safe zones, and logo placement.
* **📱 Mobile-First Design:** Optimized for field sales and store managers to create ads on the go.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Konva (Canvas manipulation)
* **Backend:** Python FastAPI, Uvicorn
* **AI Engine:** Rembg (Background Removal), Pillow (Image Processing)
* **Infrastructure:** Google Colab (GPU Compute), Ngrok (Tunneling), Vercel (Frontend Deployment)

## 🎥 Demo
[https://drive.google.com/file/d/1pmR3b9rX5XZ9CcIU8mXpQY2FxfSaqFZU/view?usp=drivesdk]

## ⚡ How It Works
1.  **Ingest:** User uploads a raw product image.
2.  **Process:** Python backend processes the image to remove background and enhance quality.
3.  **Compose:** React frontend layers the product onto Tesco-approved seasonal templates.
4.  **Validate:** The system checks the composite against Tesco Design Guidelines.
5.  **Export:** High-resolution PNG is generated for immediate deployment.

---
*Built for the Tesco Hackathon 2026.*
